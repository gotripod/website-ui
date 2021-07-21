import React, { ReactElement } from 'react'
import styled from 'styled-components'
import theme, { breakpoints, mqLess, px2rem } from '../../theme'
import { Article } from '../../types'
import Column from '../column'
import Link from 'next/link'
import BaseCard from './base-card'
import Grid from '@react-css/grid'

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
        <>
        <h1>Here&apos;s what we&apos;ve been up to recently...</h1>
        <Grid className="articles" columns="repeat(auto-fill, minmax(25ch, 1fr))" gap="2em">
          {articles.map((article: Article) => {
            return (
              <article  key={`article-${article.id}`}>
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
        </Grid>
        </>
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

const StyledArticleList = styled(BaseCard)`
  text-align: center;
  margin: ${px2rem(theme.gutter * 6)} 0;
  padding: ${px2rem(theme.gutter * 4)};

  .articles {
    margin: ${px2rem(theme.gutter * 4)} 0;
  }

  article {

  }

  div.date {
    color: #999;
  }
  h2 {
    font-size: ${px2rem(20)};
    margin: ${px2rem(theme.gutter * 2)} 0;

  }

  h1 {
    font-size: ${px2rem(36)};
  }

  ${mqLess(breakpoints.medium)} {
    margin: ${px2rem(theme.gutter * 2)} 0;
    padding: ${px2rem(theme.gutter * 2)};

    .articles {
      display: block;
    }

    article {
      border-bottom: 1px solid #ededed;
    }

    article:last-child {
      border-bottom: 1px solid white;
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
