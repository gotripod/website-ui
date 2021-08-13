/**
 * This is a catch-all route for posts, handling the index page (with + without pagination),
 * category indexes, and single post. For more on catch-all routes, see:
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 */

import { GetStaticProps, GetStaticPaths } from 'next'
import {
  getTestimonial,
  getPostsPage,
  getPostBySlug,
  getCategoryBySlug,
  getTagBySlug
} from '../../api'
import Column from '../../components/column'
import Layout from '../../components/layout'
import { Testimonial, Post, Pagination as PaginationType } from 'types'
import React, { ReactElement } from 'react'
import PageTitle from 'components/page-title'
import Item from 'components/posts/list-item'
import Pagination from 'components/posts/pagination'
import styled from 'styled-components'
import theme, { mqLess, breakpoints, px2rem } from 'theme'
import parse, { domToReact } from 'html-react-parser'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { coy } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import Image from 'next/image'
import { CaptionStyles } from 'components/common'
import Link from 'components/link'
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaGooglePlusG } from 'react-icons/fa';
import { AiOutlineMail } from 'react-icons/ai'

const Index = ({ testimonial, ...props }: PostBaseProps & Props): ReactElement => {
  return (
    <Layout testimonial={testimonial}>
      <Column>
        <Column slim>
          {/* Post/Article list */}
          {'post' in props ? (
            <PageTitle
              title={props.post.title}
              subTitle={new Date(props.post.date).toDateString()}
            />
          ) : (
            <PageTitle title="Insights" subTitle="Nuggets from the Go Tripod hive mind" />
          )}
        </Column>
        <Column>
          {/* Sign Post/Article */}
          {'post' in props ? (
            <>
              <Content>
                {parse(props.post.content, { replace: replaceCode })}

                <Social>
                  Sharing is caring:
                  <ul>
                    <li>
                      <a
                        href={`https://twitter.com/intent/tweet/?url=${encodeURIComponent(
                          props.post.link
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Share this article on Twitter (opens in new window)">
                        <FaTwitter size={18} color={'black'} />
                      </a></li>
                    <li>
                      <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(props.post.link)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Share this article on Facebook (opens in new window)">
                        <FaFacebookF size={18} color={'black'} />
                      </a>
                    </li>
                    <li>
                      <a
                        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(props.post.link)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Share this article on LinkedIn (opens in new window)">
                        <FaLinkedinIn size={18} color={'black'} />
                      </a>
                    </li>
                    <li>
                      <a
                        href={`https://plus.google.com/share?url=${encodeURIComponent(props.post.link)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Share this article on Google+ (opens in new window)">
                        <FaGooglePlusG size={18} color={'black'} />
                      </a>
                    </li>
                    <li>
                      <a
                        href={`mailto:?subject=I thought you might be interested in this article on the Go Tripod website&body=${encodeURIComponent(props.post.link)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Share this article by email (opens in new window)">
                        <AiOutlineMail size={18} color={'black'} />
                      </a>
                    </li>
                  </ul>
                </Social>

                {props.post.teamMember && (
                  <TeamMember>
                    <AuthorAvatar src={props.post.teamMember.imageUrl} width={100} height={100} />
                    <AuthorDetails>
                      By {props.post.teamMember.name}, {props.post.teamMember.position}
                      <br />
                      Filed under:{' '}
                      {props.post.taxonomies
                        .filter((t) => t.taxonomy === 'category')
                        .map((t, idx, arr) => (
                          <>
                          <Link key={t.slug} href={`/insights/category/${t.slug}/`}>
                            {t.name}
                          </Link>
                          {idx < arr.length - 1 ? ', ' : ''}
                          </>
                        ))}
                      <br />
                      Topics:{' '}
                      {props.post.taxonomies
                        .filter((t) => t.taxonomy === 'post_tag')
                        .map((t, idx, arr) => (
                          <>
                          <Link key={t.slug} href={`/insights/topic/${t.slug}/`}>
                            {t.name}
                          </Link>
                          {idx < arr.length - 1 ? ', ' : ''}

                          </>
                        ))}
                    </AuthorDetails>
                  </TeamMember>
                )}
              </Content>
            </>
          ) : (
            <>
              <Container>
                {'posts' in props &&
                  props.posts.map((post) => {
                    return <Item key={post.id} post={post} />
                  })}
              </Container>
              <Pagination {...props.pagination} />
            </>
          )}
        </Column>
      </Column>
    </Layout>
  )
}

const Social = styled.div`
  display: flex;
  font-weight: bold;
  font-size: 15px;
  color: #999;

  ul {
    list-style: none;
    display: flex;
    align-items: center;
    margin: 0 0 0 ${px2rem(theme.gutter)} !important;
  }

  li {
    padding-right: 10px;
    font-size: 0;
  }

  a {
    font-size: 0;
  }

  a:visited {
    color: #333;
  }

  a:hover {
    opacity: 0.5;
  }
`

const AuthorDetails = styled.p`
  margin-left: 20px !important;
  color: #999;
`

const TeamMember = styled.div`
  display: flex;
  justify-content: center;
  margin: ${px2rem(theme.gutter * 4)} 0 0 0;
`

const AuthorAvatar = styled(Image)`
  border-radius: 50%;
  margin-right: 20px;
  display: block;
`

const Content = styled.div`
  margin: 0 auto ${px2rem(theme.gutter * 6)} auto;
  max-width: 1000px;
  width: 100%;
  box-sizing: border-box;
  background-color: #fff;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.1);
  padding: ${px2rem(theme.gutter * 4)};

  .wp-caption {
    max-width: 100%;
    height: auto;
  }

  .wp-caption-text {
    ${CaptionStyles}
  }

  blockquote {
    color: #62bead;
    position: relative;
    font-weight: bold;
    padding: 0 ${px2rem(theme.gutter * 2)};
    ${theme.cardFlare};
  }

  img {
    height: auto;
  }

  code[class^=language-] {
    background-color: #f7f7f7 !important;
    padding: ${px2rem(theme.gutter * 2)} !important;
  }

  ${theme.contentStyles}
  ${theme.greyCardFlare}

  ${mqLess(breakpoints.medium)} {
    padding: ${px2rem(theme.gutter * 2)};
  }
`

const Container = styled.ul`
  display: flex;

  flex-flow: row wrap;
  padding: 0;
  margin: -13px;

  ${mqLess(breakpoints.medium)} {
    display: block;
  }
`

interface PostBaseProps {
  testimonial: Testimonial
}

interface PostListProps {
  posts: Post[]
  pagination?: PaginationType
}

interface SinglePostProps {
  post: Post
}

type Props = PostListProps | SinglePostProps

const getLanguage = (node) => {
  if (node.children[0].attribs.class != null) {
    return node.children[0].attribs.class.replace('language-', '')
  }
  return null
}

const getCode = (node) => {
  if (node.children.length > 0 && node.children[0].name === 'code') {
    return node.children[0].children
  } else {
    return node.children
  }
}

const replaceCode = (node) => {
  if (node.name === 'pre' && node.children[0].attribs.class.indexOf('language-') > -1) {
    const code = getCode(node)
    const language = getLanguage(node)

    return (
      node.children.length > 0 && (
          
        <SyntaxHighlighter style={coy} language={language}>
          {domToReact(code)}
        </SyntaxHighlighter>
      )
    )
  }
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const testimonial = await getTestimonial()
  const [postSlugOrIndexType, pageOrCategory] = (context.params.slug || []) as string[]

  console.debug('Insights/Posts parameters: ', postSlugOrIndexType, pageOrCategory)

  const getIndexProps = (
    posts: Post[],
    totalCount: number,
    pageCount: number,
    page: string | string[] | null
  ) => ({
    revalidate: 30,
    props: {
      testimonial,
      posts,
      pagination: {
        totalItems: totalCount,
        pageCount: pageCount,
        currentPage: page ? Number(page) : null
      }
    }
  })

  if (postSlugOrIndexType === undefined || postSlugOrIndexType === '[[...slug]]') {
    const { posts, totalCount, pageCount } = await getPostsPage()

    return getIndexProps(posts, totalCount, pageCount, context.params.page)
  } else if (pageOrCategory === undefined) {
    const post = await getPostBySlug(postSlugOrIndexType)
    return {
      props: {
        post
      }
    }
  } else if (postSlugOrIndexType === 'page') {
    const { posts, totalCount, pageCount } = await getPostsPage({ page: Number(pageOrCategory) })
    return getIndexProps(posts, totalCount, pageCount, pageOrCategory)
  } else if (postSlugOrIndexType === 'category') {
    const category = await getCategoryBySlug(pageOrCategory)
    const { posts, totalCount, pageCount } = await getPostsPage({ categoryId: category.id })
    return getIndexProps(posts, totalCount, pageCount, null)
  } else if (postSlugOrIndexType === 'topic') {
    const tag = await getTagBySlug(pageOrCategory)
    const { posts, totalCount, pageCount } = await getPostsPage({ tagId: tag.id })
    return getIndexProps(posts, totalCount, pageCount, null)
  }
}

// This function gets called at BUILD time
export const getStaticPaths: GetStaticPaths = async () => {
  const { posts } = await getPostsPage()

  // Get the paths we want to pre-render
  const paths = posts.map((post) => ({
    params: { slug: [post.slug] }
  }))

  console.log('Passing collected paths', paths)

  return { paths: paths, fallback: true }
}

export default Index
