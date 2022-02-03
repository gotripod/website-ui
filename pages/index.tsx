import { GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import { getPageBySlug, getTestimonial } from '../api'
import Column from '../components/column'
const Articles = dynamic(() => import('../components/home/articles'))
import ServiceList from '../components/home/service-list'
import Layout from '../components/layout'
import { keysToCamelDeep } from 'helpers/keys-to-camel'
import he from 'he'
import dynamic from 'next/dynamic'
import parse from 'html-react-parser'

const Index = ({
  services,
  articles,
  testimonial,
  heroHtml,
  page
}: InferGetStaticPropsType<typeof getStaticProps>): React.ReactElement => {
  return (
    <Layout testimonial={testimonial} heroHtml={heroHtml}>
      <Head>
        <title>{page.yoastTitle}</title>
        {parse(page.yoastHtml)}
      </Head>
      <Column>
        <ServiceList services={services} />
        <Articles articles={articles} />
      </Column>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async (_: GetStaticPropsContext) => {
  const page = await getPageBySlug('home')
  const postResponse = await fetch('https://content.gotripod.com/wp-json/wp/v2/posts?per_page=3')
  const postData = await postResponse.json()
  const acfResponse = await fetch('https://content.gotripod.com/wp-json/acf/v3/pages/5')
  let acfData = await acfResponse.json()

  acfData = keysToCamelDeep(acfData.acf)

  const testimonial = await getTestimonial()

  return {
    revalidate: 30,
    props: {
      page,
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
