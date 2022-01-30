import { getPageBySlug } from 'api'
import BaseCard from 'components/home/base-card'
import parse from 'html-react-parser'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import React, { ReactNode } from 'react'
import styled from 'styled-components'
import theme, { px2rem } from 'theme'
import { WPPage } from 'types'
import Column from '../../components/column'
import Layout from '../../components/layout'
import PageTitle from '../../components/page-title'

interface Props {
  page: WPPage
}

const nth = function (d) {
  if (d > 3 && d < 21) return 'th'
  switch (d % 10) {
    case 1:
      return 'st'
    case 2:
      return 'nd'
    case 3:
      return 'rd'
    default:
      return 'th'
  }
}

const Privacy = ({ page }: Props) => {
  const date = new Date(page.date)
  return (
    <Layout>
      <Head>
        <title>{page.yoastTitle}</title>
        {parse(page.yoastHtml)}
      </Head>
      <Column slim>
        <PageTitle
          title={page.title}
          subTitle={`Last updated on ${date.getUTCDate()}${nth(
            date.getUTCDate()
          )} ${date.toLocaleDateString(undefined, { month: 'short' })} ${date.getFullYear()}`}
        />
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

const Main = styled.div`
  ${theme.contentStyles}
`

export const getStaticProps: GetStaticProps = async (context) => {
  const page = await getPageBySlug('privacy-policy')
  console.log(page)
  return {
    revalidate: 30,
    props: {
      page
    }
  }
}

export default Privacy
