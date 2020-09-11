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
import { ReactElement } from 'react'
import PageTitle from 'components/page-title'
import Item from 'components/posts/list-item'
import Pagination from 'components/posts/pagination'
import styled from 'styled-components'
import theme, { mqLess, breakpoints } from 'theme'
import parse, { domToReact } from 'html-react-parser'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { xonokai } from 'react-syntax-highlighter/dist/cjs/styles/prism'

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
  if (node.name === 'pre') {
    const code = getCode(node)
    const language = getLanguage(node)

    return (
      node.children.length > 0 && (
        <SyntaxHighlighter style={xonokai} language={language}>
          {domToReact(code)}
        </SyntaxHighlighter>
      )
    )
  }
}

const Index = ({ testimonial, ...props }: PostBaseProps & Props): ReactElement => {
  return (
    <Layout testimonial={testimonial}>
      <Column>
        <Column slim>
          <PageTitle title="Insights" subTitle="Nuggets from the Go Tripod hive mind" />
        </Column>
        <Column>
          {'post' in props ? (
            <Content>{parse(props.post.content, { replace: replaceCode })}</Content>
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

const Content = styled.div`
  background-color: #fff;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.1);
  padding: 80px 104px;

  a {
    color: ${theme.colours.linkOrange};
    text-decoration: underline;
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

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const testimonial = await getTestimonial()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [postSlugOrIndexType, pageOrCategory] = (context.params.slug || []) as string[]

  console.debug('Insights/Posts parameters: ', postSlugOrIndexType, pageOrCategory)

  const getIndexProps = (
    posts: Post[],
    totalCount: number,
    pageCount: number,
    page: string | string[] | null
  ) => ({
    revalidate: 1,
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

  if (postSlugOrIndexType === undefined) {
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

  return { paths: paths, fallback: true }
}

export default Index
