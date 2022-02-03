/**
 * This is a catch-all route for posts, handling the index page (with + without pagination),
 * category indexes, and single post. For more on catch-all routes, see:
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 *
 * /insights/
 * /insights/post-name/
 * /insights/page/2/
 * /insights/category/cat-name/
 * /insights/category/cat-name/page/2/
 * /insights/topic/topic-name/
 * /insights/topic/topic-name/page/2
 **/
import dynamic from 'next/dynamic'
import { GetStaticProps, GetStaticPaths } from 'next'
import {
  getTestimonial,
  getPostsPage,
  getPostBySlug,
  getCategoryBySlug,
  getTagBySlug,
  getPageBySlug
} from '../../api'
import Column from '../../components/column'
import Layout from '../../components/layout'
import { Testimonial, Post, Pagination as PaginationType, WPPage } from 'types'
import React, { ReactElement } from 'react'
import sleep from 'helpers/sleep'
const Single = dynamic(() => import('components/posts/single'))
const List = dynamic(() => import('components/posts/list'))

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
  insightsPage: WPPage
  pagination?: PaginationType
}

export interface SinglePostProps {
  post: Post
}

type Props = PostListProps | SinglePostProps

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const [postSlugOrIndexType, pageOrCategory, maybePage] = (context.params.slug || []) as string[]

  console.debug('Insights/Posts parameters: ', context.params.slug)

  const testimonial = await getTestimonial()

  // The third level slug part should always be "page" otherwise we can bail
  if (maybePage && maybePage !== 'page') {
    return {
      notFound: true
    }
  }

  const getIndexProps = (
    posts: Post[],
    totalCount: number,
    pageCount: number,
    page: string | string[] | null,
    insightsPage: WPPage
  ) => ({
    revalidate: 30,
    props: {
      testimonial,
      posts,
      insightsPage,
      pagination: {
        totalItems: totalCount,
        pageCount: pageCount,
        currentPage: page ? Number(page) : null
      }
    }
  })

  if (postSlugOrIndexType === undefined || postSlugOrIndexType === '[[...slug]]') {
    const { posts, totalCount, pageCount } = await getPostsPage()
    const insightsPage = await getPageBySlug('insights')

    return getIndexProps(posts, totalCount, pageCount, context.params.page, insightsPage)
  } else if (pageOrCategory === undefined) {
    const post = await getPostBySlug(postSlugOrIndexType)
    return {
      props: {
        post
      }
    }
  } else if (postSlugOrIndexType === 'page') {
    const { posts, totalCount, pageCount } = await getPostsPage({ page: Number(pageOrCategory) })
    const insightsPage = await getPageBySlug('insights')

    return getIndexProps(posts, totalCount, pageCount, pageOrCategory, insightsPage)
  } else if (postSlugOrIndexType === 'category') {
    const category = await getCategoryBySlug(pageOrCategory)

    const { posts, totalCount, pageCount } = await getPostsPage({ categoryId: category.id })
    const insightsPage = await getPageBySlug('insights')

    return getIndexProps(posts, totalCount, pageCount, null, insightsPage)
  } else if (postSlugOrIndexType === 'topic') {
    const insightsPage = await getPageBySlug('insights')
    const tag = await getTagBySlug(pageOrCategory)
    const { posts, totalCount, pageCount } = await getPostsPage({ tagId: tag.id })
    return getIndexProps(posts, totalCount, pageCount, null, insightsPage)
  }
}

// This function gets called at BUILD time
export const getStaticPaths: GetStaticPaths = async () => {
  const { posts } = await getPostsPage({ perPage: 100 })

  // Get the paths we want to pre-render
  const paths = posts.map((post) => ({
    params: { slug: [post.slug] }
  }))

  return { paths: paths, fallback: true }
}

export default Index
