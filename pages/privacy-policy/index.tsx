import { getPageBySlug } from 'api'
import BaseCard from 'components/home/base-card'
import { GetStaticProps } from 'next'
import React, { ReactNode } from 'react'
import styled from 'styled-components'
import theme from 'theme'
import { WPPage } from 'types'
import Column from '../../components/column'
import Layout from '../../components/layout'
import PageTitle from '../../components/page-title'

interface Props {
  page: WPPage
}

const Privacy = ({ page }: Props): ReactNode => {
  return (
    <Layout>
      <Column slim>
        <PageTitle title={page.title} subTitle={page.date} />
      </Column>
      <Column>
        <Card>
          <Main dangerouslySetInnerHTML={{ __html: page.body }}></Main>
        </Card>
      </Column>
    </Layout>
  )
}

const Card = styled(BaseCard)`
  padding: ${theme.gutter * 8}px;
  margin-bottom: ${theme.gutter * 6}px;
`

const Main = styled.div``

export const getStaticProps: GetStaticProps = async (context) => {
  console.log(context)
  const page = await getPageBySlug('privacy-policy')
  return {
    props: {
      page
    }
  }
}

export default Privacy
