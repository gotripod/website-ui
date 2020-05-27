import axios from "axios";
import humps from "humps";
import { GetStaticPaths } from "next";
import React from "react";
import styled from "styled-components";
import Column from "../../components/column";
import Layout from "../../components/layout";
import PageTitle from "../../components/page-title";
import GalleryBlock from "../../components/work/gallery-block";
import IntroBlock from "../../components/work/intro.block";
import PrecisBlock from "../../components/work/precis-block";
import TestimonialBlock from "../../components/work/testimonial-block";
import TitleBlock from "../../components/work/title-block";
import { Project } from "../../types";

interface Props {
  project: Project;
}

const renderBlock = (block) => {
  switch (block.acfFcLayout) {
    case "intro_block":
      return <IntroBlock body={block.blockBody} />;
    case "title_block":
      return <TitleBlock title={block.blockTitle} body={block.blockBody} />;
    case "precis_block":
      return (
        <PrecisBlock
          services={block.serviceList}
          technologies={block.technologyList}
        />
      );
    case "gallery_block":
      return (
        <GalleryBlock images={block.blockGallery} caption={block.blockNote} />
      );
    case "testimonial_block":
      return <TestimonialBlock testimonial={block.testimonial} />;
    default:
      return null;
  }
};

const SinglePostPage = ({ project }: Props) => {
  console.log(project.blocks);
  return (
    <Layout>
      <Column slim>
        <PageTitle title={project.title} />
        <Content>{project.blocks.map(renderBlock)}</Content>
      </Column>
    </Layout>
  );
};

export default SinglePostPage;

const Content = styled.div`
  background-color: #fff;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.1);
  padding: 80px 104px;
`;

export const getStaticProps = async (context) => {
  const response = await axios.get(
    `https://gotripod.com/wp-json/wp/v2/project?slug=${context.params.slug}`
  );

  const post = response.data[0];

  return {
    props: {
      project: {
        id: post.id,
        title: post.title.rendered,
        blocks: humps.camelizeKeys(post.acf.project_blocks),
      },
    },
  };
};

// This function gets called at build time
export const getStaticPaths: GetStaticPaths = async () => {
  console.log("get static paths");
  // Call an external API endpoint to get posts
  const res = await fetch(
    "https://gotripod.com/wp-json/wp/v2/project?_fields=slug"
  );
  const posts = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  console.log(paths);

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};
