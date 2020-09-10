import { GetStaticProps } from 'next'
import { getTestimonial, getPostsPage } from '../../api'
import Column from '../../components/column'
import Layout from '../../components/layout'
import { Testimonial, Post } from 'types'
import { ReactElement } from 'react'
import PageTitle from 'components/page-title'
import Item from 'components/posts/list-item'
import Pagination from 'components/posts/pagination'
import styled from 'styled-components'
import { mqLess, breakpoints } from 'theme'

interface Props {
  posts: Post[]
  testimonial: Testimonial
}

const Index = ({ posts, testimonial }: Props): ReactElement => {
  return (
    <Layout testimonial={testimonial}>
      <Column>
        <Column slim>
          <PageTitle title="Insights" subTitle="Nuggets from the Go Tripod hive mind" />
        </Column>
        <Column>
          <Container>
            {posts.map((post) => {
              return <Item key={post.id} post={post} />
            })}
          </Container>
          <Pagination />
        </Column>
      </Column>
    </Layout>
  )
}

const Container = styled.ul`
  display: flex;

  flex-flow: row wrap;
  padding: 0;
  margin: -13px;

  ${mqLess(breakpoints.medium)} {
    display: block;
  }
`

export const getStaticProps: GetStaticProps = async () => {
  const testimonial = await getTestimonial()
  const { posts, totalCount, pageCount } = await getPostsPage()

  return {
    revalidate: 1,
    props: {
      testimonial,
      posts,
      pagination: {
        total: totalCount,
        pages: pageCount
      }
    }
  }
}

export default Index
