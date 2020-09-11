import { GetStaticProps } from 'next'
import Head from 'next/head'
import { getTestimonial } from '../api'
import Column from '../components/column'
import Articles from '../components/home/articles'
import ServiceList from '../components/home/service-list'
import Layout from '../components/layout'
import { keysToCamelDeep } from 'helpers/keys-to-camel'
import { Testimonial } from 'types'

interface Props {
  services: any
  posts: any
  testimonial: Testimonial
  heroHtml: string
}

const Index = ({ services, posts, testimonial, heroHtml }: Props): React.ReactElement => {
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
        <Articles articles={posts} />
      </Column>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const postResponse = await fetch('https://gotripod.com/wp-json/wp/v2/posts?per_page=3')
  const postData = await postResponse.json()
  const acfResponse = await fetch('https://gotripod.com/wp-json/acf/v3/pages/5')
  let acfData = await acfResponse.json()

  acfData = keysToCamelDeep(acfData.acf)

  const testimonial = await getTestimonial()

  return {
    props: {
      services: acfData.serviceBuilder.map((s: any) => ({
        imageUrl: s.serviceImage,
        title: s.serviceTitle,
        body: s.serviceBody
      })),
      posts: postData.map((post: any) => ({
        id: post.id,
        date: post.date,
        title: post.title.rendered,
        link: `/insights/${post.slug}/`
      })),
      testimonial
    }
  }
}

export default Index
