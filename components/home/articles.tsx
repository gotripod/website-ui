import React, { ReactElement } from 'react'
import styled from 'styled-components'
import theme, { breakpoints, mqLess, px2rem } from '../../theme'
import { Article } from '../../types'
import Column from '../column'
import Link from 'next/link'

interface Props {
  articles: Article[]
}

const Articles = ({ articles }: Props): ReactElement => {
  const formatDate = (stringDate: string): string => {
    const date = new Date(stringDate)
    const dtf = new Intl.DateTimeFormat('en', {
      year: 'numeric',
      month: 'numeric',
      day: '2-digit'
    })
    const [{ value: mo }, , { value: da }, , { value: ye }] = dtf.formatToParts(date)
    return `${da}/${mo}/${ye}`
  }
  console.log(articles)
  return (
    <Column>
      <StyledArticleList>
        <h1>Here&apos;s what we&apos;ve been up to recently...</h1>
        <div className="articles">
          {articles.map((article: Article) => {
            return (
              <article key={`article-${article.id}`}>
                <div className="date">{formatDate(article.date)}</div>
                <h2>
                  <Link href={article.link}>{article.title}</Link>
                </h2>
                <Slink>
                  <Link href={article.link}>Read More</Link>
                </Slink>
              </article>
            )
          })}
        </div>
      </StyledArticleList>
    </Column>
  )
}

export default Articles

const Slink = styled.a`
  color: #62bead;
  text-decoration: underline;

  &:visited {
    color: #62bead;
  }

  ${mqLess(breakpoints.medium)} {
    display: inline-block;
    margin-bottom: ${px2rem(theme.gutter * 2)};
  }
`

const StyledArticleList = styled.section`
  background: white;
  text-align: center;
  margin: ${px2rem(52)} 0;
  padding: ${px2rem(52)};

  .articles {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
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

    .articles {
      display: block;
    }

    article {
      border-bottom: 1px solid #ededed;
      margin-bottom: ${px2rem(theme.gutter * 2)};
    }

    article:last-child {
      border-bottom: 1px solid white;
    }

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
`
