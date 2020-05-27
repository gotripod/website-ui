import React from "react";
import styled from "styled-components";
import { LinkButton } from "../button";

/**
 * Pagination Component
 *
 * It's used to allow the user to paginate between a list of posts.
 *
 * The `state`, `actions`, `libraries` props are provided by the global context,
 * when we wrap this component in `connect(...)`
 */
const Pagination = () => {
  return (
    <Container>
      {/* If there's a next page, render this link */}
      {/* {next && <SLinkButton link={next}>← Older posts</SLinkButton>} */}

      {/* If there's a previous page, render this link */}
      {/* {previous && <SLinkButton link={previous}>Newer posts →</SLinkButton>} */}
    </Container>
  );
};

/**
 * Connect Pagination to global context to give it access to
 * `state`, `actions`, `libraries` via props
 */
export default Pagination;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SLinkButton = styled(LinkButton)`
  color: white !important;
  display: inline-block;
  margin: 13px 0;
  padding: 13px;
`;
