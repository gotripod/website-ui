import axios from "axios";
import { GetStaticProps } from "next";
import { getTestimonials } from "../../api";
import Column from "../../components/column";
import Layout from "../../components/layout";
import List from "../../components/posts/list";

const Index = ({ posts, testimonial }) => {
  return (
    <Layout testimonial={testimonial}>
      <Column>
        <List posts={posts} />
      </Column>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const testimonial = await getTestimonials();

  const response = await axios.get(
    "https://gotripod.com/wp-json/wp/v2/posts?per_page=9"
  );

  return {
    revalidate: 1,
    props: {
      testimonial,
      posts: response.data,
      pagination: {
        total: response.headers["x-wp-total"],
        pages: response.headers["x-wp-totalpages"],
      },
    },
  };
};

export default Index;
