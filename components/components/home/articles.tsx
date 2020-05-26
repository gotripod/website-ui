import React from "react";
import styled from "styled-components";
import { Article } from "../../../types";
import Column from "../column";

interface Props {
  articles: Article[];
}

const Articles = ({ articles }: Props) => {
  const formatDate = (stringDate: string): string => {
    const date = new Date(stringDate);
    const dtf = new Intl.DateTimeFormat("en", {
      year: "numeric",
      month: "numeric",
      day: "2-digit",
    });
    const [{ value: mo }, , { value: da }, , { value: ye }] = dtf.formatToParts(
      date
    );
    return `${da}/${mo}/${ye}`;
  };

  return (
    <Column>
      <StyledArticle.List>
        <h1>Here's what we've been up to recently...</h1>
        <StyledArticle.ListInner>
          {articles.map((article: Article) => {
            return (
              <StyledArticle.Item key={`article-${article.id}`}>
                <StyledArticle.Date>
                  {formatDate(article.date)}
                </StyledArticle.Date>
                <StyledArticle.Text>{article.title}</StyledArticle.Text>
                <StyledArticle.Link href={article.link}>
                  Read More
                </StyledArticle.Link>
              </StyledArticle.Item>
            );
          })}
        </StyledArticle.ListInner>
      </StyledArticle.List>
    </Column>
  );
};

export default Articles;

const StyledArticle = {
  List: styled.div`
    background: white;
    text-align: center;
    margin: 52px 0;
    padding: 52px;
  `,
  ListInner: styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    width: 75%;
    margin: 0 auto;
  `,
  Item: styled.article`
    flex: ${1 / 3};
    padding: 0 30px;
  `,
  Date: styled.div`
    color: #999;
  `,
  Text: styled.h2`
    font-size: 20px;
  `,
  Link: styled.a`
    color: #62bead;
    text-decoration: underline;

    &:visited {
      color: #62bead;
    }
  `,
};
