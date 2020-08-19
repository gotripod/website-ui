import React, { ReactElement } from 'react'
import styled from 'styled-components'
import { breakpoints, mqLess } from '../../theme'
import Column from '../column'
import PageTitle from '../page-title'
import Item from './list-item'
import Pagination from './pagination'

interface Props {
  posts: any
}

const List = ({ posts }: Props): ReactElement => {
  return (
    <>
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
    </>
  )
}

export default List

const Container = styled.ul`
  display: flex;

  flex-flow: row wrap;
  padding: 0;
  margin: -13px;

  ${mqLess(breakpoints.medium)} {
    display: block;
  }
`
