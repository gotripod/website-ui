import React from "react";
import styled from "styled-components";
import { Article } from "../../types";
import Column from "../column";
import theme, { px2rem, mqLess, breakpoints } from "../../theme";
import Link from "../link";

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
      <StyledArticleList>
        <h1>Here's what we've been up to recently...</h1>
        <div>
          {articles.map((article: Article) => {
            return (
              <div className="item" key={`article-${article.id}`}>
                <div className="date">{formatDate(article.date)}</div>
                <h2>{article.title}</h2>
                <Slink href="/insights/[slug]" link={`${article.link}`}>
                  Read More
                </Slink>
              </div>
            );
          })}
        </div>
      </StyledArticleList>
    </Column>
  );
};

export default Articles;

const Slink = styled(Link)`
  color: #62bead;
  text-decoration: underline;

  &:visited {
    color: #62bead;
  }

  ${mqLess(breakpoints.medium)} {
    display: inline-block;
    margin-bottom: ${px2rem(theme.gutter * 2)};
  }
`;

const StyledArticleList = styled.section`
  background: white;
  text-align: center;
  margin: ${px2rem(52)} 0;
  padding: ${px2rem(52)};

  .item {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    width: 75%;
    margin: 0 auto;
  }

  article {
    flex: ${1 / 3};
    padding: 0 ${px2rem(30)};
  }

  div.date {
    color: #999;
  }
  h2 {
    font-size: ${px2rem(20)};
  }

  ${mqLess(breakpoints.medium)} {
    margin: ${px2rem(theme.gutter * 2)} 0;
    padding: ${px2rem(theme.gutter * 2)};

    h2 {
      margin-top: 0;
    }

    .item {
      width: 100%;
      display: block;
      padding: 0 0;
    }

    article {
      padding: 0 ${px2rem(theme.gutter * 2)};
    }
  }
`;
