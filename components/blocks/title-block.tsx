import React from "react";
import styled from "styled-components";
import theme, { px2rem } from "../../theme";

interface Props {
  title: string;
  body: string;
}

const Wrapper = styled.div`
  display: flex;
  padding: ${px2rem(theme.gutter * 2)} 0 ${px2rem(theme.gutter * 4)} 0;

  h2 {
    color: ${theme.colours.headingBlue};
    flex-basis: 35%;
    font-size: ${px2rem(30)};
  }

  div {
    flex-basis: 65%;
  }
`;

const TitleBlock = ({ title, body }: Props) => {
  return (
    <Wrapper>
      <h2>{title}</h2>

      <div dangerouslySetInnerHTML={{ __html: body }} />
    </Wrapper>
  );
};

export default TitleBlock;
