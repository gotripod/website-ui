import { GetServerSideProps } from 'next'
import React, { ReactElement } from 'react'
import styled from 'styled-components'
import Column from '../../components/column'
import Layout from '../../components/layout'
import PageTitle from '../../components/page-title'
import { Post } from '../../types'
import { getPostBySlug } from 'api'

interface Props {
  post: Post
}

const SinglePostPage = ({ post }: Props): ReactElement => {
  return (
    <Layout>
      <Column slim>
        <PageTitle title={post.title} subTitle={post.date} />
        <Content dangerouslySetInnerHTML={{ __html: post.content }}></Content>
      </Column>
    </Layout>
  )
}

export default SinglePostPage

const Content = styled.div`
  background-color: #fff;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.1);
  padding: 80px 104px;
`

export const getServerSideProps: GetServerSideProps = async (context) => {
  const post = await getPostBySlug(`${context.params.slug}`)

  return {
    props: {
      post
    }
  }
}
