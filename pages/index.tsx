import axios from "axios";
import humps from "humps";
import { GetStaticProps } from "next";
import { getTestimonial } from "../api";
import Column from "../components/components/column";
import Articles from "../components/components/home/articles";
import ServiceList from "../components/components/home/service-list";
import Layout from "../components/components/layout";

const Index = ({ services, posts, testimonial }) => {
  return (
    <Layout testimonial={testimonial}>
      <Column>
        <ServiceList services={services} />
        <Articles articles={posts} />
      </Column>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  let postData = (
    await axios.get("https://gotripod.com/wp-json/wp/v2/posts?per_page=3")
  ).data;
  let acfData = (await axios.get("https://gotripod.com/wp-json/acf/v3/pages/5"))
    .data;

  acfData = humps.camelizeKeys(acfData.acf);

  const testimonial = await getTestimonial();

  return {
    props: {
      carousel: [], //acfData.carouselSlides,
      services: acfData.serviceBuilder.map((s: any) => ({
        imageUrl: s.serviceImage,
        title: s.serviceTitle,
        body: s.serviceBody,
      })),
      posts: postData.map((post: any) => ({
        id: post.id,
        date: post.date,
        title: post.title.rendered,
        link: post.link,
      })),
      testimonial,
    },
  };
};

export default Index;
