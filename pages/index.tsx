import axios from "axios";
import humps from "humps";
import { GetStaticProps } from "next";
import { getTestimonials } from "../api";
import Column from "../components/column";
import Articles from "../components/home/articles";
import ServiceList from "../components/home/service-list";
import Layout from "../components/layout";

const Index = ({ services, posts, testimonial, heroHtml }) => {
  return (
    <Layout testimonial={testimonial} heroHtml={heroHtml}>
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

  const testimonial = await getTestimonials();

  const imageResponse = await fetch(
    "https://gotripod.com/wp-json/wp/v2/media/197?_fields=description"
  );

  const image = await imageResponse.json();

  return {
    props: {
      heroHtml: image.description.rendered,
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
        link: `/insights/${post.slug}/`,
      })),
      testimonial,
    },
  };
};

export default Index;
