import axios from "axios";
import humps from "humps";
import { GetStaticPaths } from "next";
import React from "react";
import styled from "styled-components";
import { getMediaById, getTestimonialById } from "../../api";
import Column from "../../components/column";
import Layout from "../../components/layout";
import MediaImage from "../../components/media-image";
import GalleryBlock from "../../components/work/gallery-block";
import IntroBlock from "../../components/work/intro.block";
import PrecisBlock from "../../components/work/precis-block";
import TestimonialBlock from "../../components/work/testimonial-block";
import TitleBlock from "../../components/work/title-block";
import theme, { breakpoints, mqLess, px2rem } from "../../theme";
import { Project } from "../../types";

interface Props {
  project: Project;
}

const renderBlock = (block, i) => {
  switch (block.acfFcLayout) {
    case "intro_block":
      return <IntroBlock key={i} body={block.blockBody} />;
    case "title_block":
      return (
        <TitleBlock key={i} title={block.blockTitle} body={block.blockBody} />
      );
    case "precis_block":
      return (
        <PrecisBlock
          key={i}
          services={block.serviceList}
          technologies={block.technologyList}
        />
      );
    case "gallery_block":
      return (
        <GalleryBlock
          key={i}
          images={block.blockGallery}
          caption={block.blockNote}
        />
      );
    case "testimonial_block":
      return <TestimonialBlock key={i} testimonial={block.testimonial} />;
    default:
      return null;
  }
};

const SinglePostPage = ({ project }: Props) => {
  return (
    <Layout>
      <Column>
        <StyledMediaImage media={project.heroMedia} />
        <Content>{project.blocks.map(renderBlock)}</Content>
      </Column>
    </Layout>
  );
};

export default SinglePostPage;

const StyledMediaImage = styled(MediaImage)`
  width: 100%;
  margin: -${px2rem(theme.gutter * 4)} 0 0 0;
  position: relative;
  z-index: 1;
  display: block;
`;

const Content = styled.div`
  background-color: #fff;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.1);
  padding: ${px2rem(theme.gutter * 2)} ${px2rem(theme.gutter * 4)};

  ${mqLess(breakpoints.medium)} {
    padding: ${px2rem(theme.gutter)} ${px2rem(theme.gutter * 2)};
  }
`;

export const getStaticProps = async (context) => {
  const response = await axios.get(
    `https://gotripod.com/wp-json/wp/v2/project?slug=${context.params.slug}`
  );

  const post = response.data[0];

  const heroMedia = await getMediaById(post.acf.project_hero);

  // fetch testimonial body
  const shallowTestimonialIndex = post.acf.project_blocks.findIndex(
    (b) => b.acf_fc_layout === "testimonial_block"
  );

  const shallowTestimonialBlockId =
    post.acf.project_blocks[shallowTestimonialIndex].testimonial.ID;

  const testimonial = await getTestimonialById(shallowTestimonialBlockId);

  console.log("testimonial", testimonial);

  post.acf.project_blocks[shallowTestimonialIndex].testimonial = testimonial;

  return {
    props: {
      project: {
        id: post.id,
        title: post.title.rendered,
        blocks: humps.camelizeKeys(post.acf.project_blocks),
        heroMedia,
      },
    },
  };
};

// This function gets called at build time
export const getStaticPaths: GetStaticPaths = async () => {
  // Call an external API endpoint to get posts
  const res = await fetch(
    "https://gotripod.com/wp-json/wp/v2/project?_fields=slug"
  );
  const posts = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};
