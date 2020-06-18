import React from "react";
import styled from "styled-components";
import Column from "../column";
import PageTitle from "../page-title";
import Item from "./list-item";
import Pagination from "./pagination";
import { mqLess, breakpoints } from "../../theme";

const List = ({ posts }) => {
  return (
    <>
      <Column slim>
        <PageTitle
          title="Insights"
          subTitle="Nuggets from the Go Tripod hive mind"
        />
      </Column>
      <Column>
        <Container>
          {/* Iterate over the items of the list. */}
          {posts.map((post) => {
            console.log(post);
            return <Item key={post.id} post={post} />;
          })}
        </Container>
        <Pagination />
      </Column>
    </>
  );
};

export default List;

const Container = styled.ul`
  display: flex;

  flex-flow: row wrap;
  padding: 0;
  margin: -13px;

  ${mqLess(breakpoints.medium)} {
    display: block;
  }
`;

const Header = styled.h3`
  font-weight: 300;
  text-transform: capitalize;
  color: rgba(12, 17, 43, 0.9);
`;
