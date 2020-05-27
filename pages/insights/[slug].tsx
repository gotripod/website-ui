import axios from "axios";
import { GetServerSideProps } from "next";
import React from "react";
import styled from "styled-components";
import Column from "../../components/column";
import Layout from "../../components/layout";
import PageTitle from "../../components/page-title";
import { Post } from "../../types";

interface Props {
  post: Post;
}

const SinglePostPage = ({ post }: Props) => {
  console.log(post);
  return (
    <Layout>
      <Column slim>
        <PageTitle title={post.title} />
        <Content dangerouslySetInnerHTML={{ __html: post.content }}></Content>
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const response = await axios.get(
    `https://gotripod.com/wp-json/wp/v2/posts?slug=${context.params.slug}`
  );

  const post = response.data[0];
  console.log(post);
  return {
    props: {
      post: {
        id: post.id,
        title: post.title.rendered,
        content: post.content.rendered,
      },
    },
  };
};
