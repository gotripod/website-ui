import Column from 'components/column'
import PageTitle from 'components/page-title'
import Head from 'next/head'
import { PostListProps } from 'pages/insights/[[...slug]]'
import React from 'react'
import styled from 'styled-components'
import { mqLess, breakpoints } from 'theme'
import Item from './list-item'
import Pagination from './pagination'
import parse from 'html-react-parser'

const List = ({ insightsPage, posts, pagination }: PostListProps) => (
  <>
    <Head>
      <title>Development insights, client advice and news - Go Tripod</title>
     
    </Head>
    <Column slim>
      <PageTitle title="Insights" subTitle="Nuggets from the Go Tripod hive mind" />
    </Column>
    <Column>
      <>
        <Container>
          {posts && posts.map((post) => (
            <Item key={post.id} post={post} />
          ))}
        </Container>
        <Pagination {...pagination} />
      </>
    </Column>
  </>
)

const Container = styled.ul`
  display: flex;

  flex-flow: row wrap;
  padding: 0;

  ${mqLess(breakpoints.medium)} {
    display: block;
  }
`

export default List
