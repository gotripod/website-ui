import { GetStaticProps } from 'next'
import { getTestimonial } from '../../api'
import Column from '../../components/column'
import Layout from '../../components/layout'
import List from '../../components/posts/list'
import { Testimonial } from 'types'
import { ReactElement } from 'react'

interface Props {
  posts: any
  testimonial: Testimonial
}

const Index = ({ posts, testimonial }: Props): ReactElement => {
  return (
    <Layout testimonial={testimonial}>
      <Column>
        <List posts={posts} />
      </Column>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const testimonial = await getTestimonial()

  const response = await fetch('https://gotripod.com/wp-json/wp/v2/posts?per_page=9')
  console.log(response)
  const posts = await response.json()

  return {
    revalidate: 1,
    props: {
      testimonial,
      posts,
      pagination: {
        total: response.headers.get('x-wp-total'),
        pages: response.headers.get('x-wp-totalpages')
      }
    }
  }
}

export default Index
