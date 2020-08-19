import axios from "axios";
import { GetStaticProps } from "next";
import { getTestimonials } from "../../api";
import Column from "../../components/column";
import Layout from "../../components/layout";
import Work from "../../components/work";

const Index = ({ projects, testimonial }) => {
  return (
    <Layout testimonial={testimonial}>
      <Column>
        <Work projects={projects} />
      </Column>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const testimonial = await getTestimonials();

  const response = await axios.get(
    "https://gotripod.com/wp-json/wp/v2/project?_fields=acf.project_logo,id,slug"
  );

  return {
    revalidate: 1,
    props: {
      testimonial,
      projects: response.data.map((p) => ({
        id: p.id,
        logoUrl: p.acf.project_logo,
        link: p.slug,
      })),
    },
  };
};

export default Index;
