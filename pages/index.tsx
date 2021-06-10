import { GetStaticProps } from 'next'
import Head from 'next/head'
import { getTestimonial } from '../api'
import Column from '../components/column'
import Articles from '../components/home/articles'
import ServiceList from '../components/home/service-list'
import Layout from '../components/layout'
import { keysToCamelDeep } from 'helpers/keys-to-camel'
import { Article, Service, Testimonial } from 'types'
import he from 'he'

interface Props {
  services: Service[]
  articles: Article[]
  testimonial: Testimonial
  heroHtml: string
}

const Index = ({ services, articles, testimonial, heroHtml }: Props): React.ReactElement => {
  const title =
    'Go Tripod: Website, web app & software development, Falmouth Cornwall, South West United Kingdom'
  return (
    <Layout testimonial={testimonial} heroHtml={heroHtml}>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} key="title" />
      </Head>
      <Column>
        <ServiceList services={services} />
        <Articles articles={articles} />
      </Column>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const postResponse = await fetch('https://content.gotripod.com/wp-json/wp/v2/posts?per_page=3')
  const postData = await postResponse.json()
  const acfResponse = await fetch('https://content.gotripod.com/wp-json/acf/v3/pages/5')
  let acfData = await acfResponse.json()

  acfData = keysToCamelDeep(acfData.acf)

  const testimonial = await getTestimonial()

  return {
    revalidate: 30,
    props: {
      services: acfData.serviceBuilder.map((s: any) => ({
        imageUrl: s.serviceImage,
        title: s.serviceTitle,
        body: s.serviceBody
      })),
      articles: postData.map((post: any) => ({
        id: post.id,
        date: post.date,
        title: he.decode(post.title.rendered),
        link: `/insights/${post.slug}/`
      })),
      testimonial
    }
  }
}

export default Index
