import axios from "axios";
import { GetStaticProps } from "next";
import { getTestimonial } from "../../api";
import Column from "../../components/components/column";
import Layout from "../../components/components/layout";
import Work from "../../components/components/work";

const Index = ({ projects, testimonial }) => {
  return (
    <Layout testimonial={testimonial}>
      <Column>
        <Work projects={projects} />
      </Column>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const testimonial = await getTestimonial();

  const response = await axios.get(
    "https://gotripod.com/wp-json/wp/v2/project"
  );

  return {
    props: {
      testimonial,
      projects: response.data.map((p) => ({
        id: p.id,
        logoUrl: p.acf.project_logo,
        link: p.link,
      })),
    },
  };
};

export default Index;
