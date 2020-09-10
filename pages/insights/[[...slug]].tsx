/**
 * This is a catch-all route for posts, handling the index page (with + without pagination),
 * category indexes, and single post. For more on catch-all routes, see:
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 */

import { GetStaticProps, GetStaticPaths } from 'next'
import { getTestimonial, getPostsPage, getPostBySlug, getCategoryBySlug } from '../../api'
import Column from '../../components/column'
import Layout from '../../components/layout'
import { Testimonial, Post, Pagination as PaginationType } from 'types'
import { ReactElement } from 'react'
import PageTitle from 'components/page-title'
import Item from 'components/posts/list-item'
import Pagination from 'components/posts/pagination'
import styled from 'styled-components'
import { mqLess, breakpoints } from 'theme'

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

const Index = ({ testimonial, ...props }: PostBaseProps & Props): ReactElement => {
  return (
    <Layout testimonial={testimonial}>
      <Column>
        <Column slim>
          <PageTitle title="Insights" subTitle="Nuggets from the Go Tripod hive mind" />
        </Column>
        <Column>
          {'post' in props ? (
            <Content dangerouslySetInnerHTML={{ __html: props.post.content }}></Content>
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

  if (postSlugOrIndexType === undefined) {
    const { posts, totalCount, pageCount } = await getPostsPage()
    return {
      revalidate: 1,
      props: {
        testimonial,
        posts,
        pagination: {
          totalItems: totalCount,
          pageCount: pageCount,
          currentPage: context.params.page ? Number(context.params.page) : null
        }
      }
    }
  } else if (pageOrCategory === undefined) {
    const post = await getPostBySlug(postSlugOrIndexType)
    return {
      props: {
        post
      }
    }
  } else if (postSlugOrIndexType === 'page') {
    const { posts, totalCount, pageCount } = await getPostsPage({ page: Number(pageOrCategory) })
    return {
      revalidate: 1,
      props: {
        testimonial,
        posts,
        pagination: {
          totalItems: totalCount,
          pageCount: pageCount,
          currentPage: Number(pageOrCategory)
        }
      }
    }
  } else if (postSlugOrIndexType === 'category') {
    const category = await getCategoryBySlug(pageOrCategory)
    const { posts, totalCount, pageCount } = await getPostsPage({ categoryId: category.id })
    return {
      revalidate: 1,
      props: {
        testimonial,
        posts,
        pagination: {
          totalItems: totalCount,
          pageCount: pageCount
        }
      }
    }
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

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const [postSlugOrIndexType, pageOrCategory] = context.params.slug as string[]

// }

export default Index
