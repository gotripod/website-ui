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
import Single from 'components/posts/single'
import List from 'components/posts/list'

const Index = ({ testimonial, ...props }: PostBaseProps & Props): ReactElement => {
  return (
    <Layout testimonial={testimonial}>
      <Column>{'post' in props ? <Single {...props} /> : <List {...props} />}</Column>
    </Layout>
  )
}

export interface PostBaseProps {
  testimonial: Testimonial
}

export interface PostListProps {
  posts: Post[]
  pagination?: PaginationType
}

export interface SinglePostProps {
  post: Post
}

type Props = PostListProps | SinglePostProps

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

  return { paths: paths, fallback: true }
}

export default Index
