import React from "react";
import styled from "styled-components";
import Theme from "../../theme";
const S = {
  Wrapper: styled.header`
    position: relative;
    background: white;
    border-bottom: 5px solid rgba(0, 0, 0, 0.3);
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.1);
    text-align: center;
    padding: 30px 0;
    margin: 60px 0;
    ${Theme.cardFlare}
  `,
};

const PageTitle = ({ title, subTitle }) => (
  <S.Wrapper>
    <h1>{title}</h1>
    <p>{subTitle}</p>
  </S.Wrapper>
);

export default PageTitle;
