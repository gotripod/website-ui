import Grid from '@react-css/grid'
import Link from 'components/link'
import React from 'react'
import styled from 'styled-components'
import theme, { px2rem } from 'theme'
import Column from '../column'

interface Props {
  technologies: any[]
  services: any[]
}

const PrecisBlock = ({ technologies, services }: Props) => {
  return (
    <SColumn>
      <Grid  gap='1em' columns="repeat(auto-fit, minmax(250px, 1fr))">
      <div>
        <p>Our involvement in this project included the following:</p>
        <ul>
          {services.map((t, i) => (
            <li key={i}>{t.itemBody}</li>
          ))}
        </ul>
      </div>

      <div>
        <p>We made use of these technologies along the way:</p>
        <ul>
          {technologies.map((t, i) => (
            <li key={i}>{t.itemBody}</li>
          ))}
        </ul>
      </div>

      <div className={'next'}>
        <p>So, what would you like to do next?</p>
        <ul className="list">
          <li>
            <Link href="/work/curious-ways/">See another example of our work</Link>
          </li>
          <li>
            <Link href="/work/">Go back to the Work overview page</Link>
          </li>
          <li>
            <Link href="/contact/">Contact us</Link>
          </li>
        </ul>
      </div>
      </Grid>
    </SColumn>
  )
}

const SColumn = styled(Column)`

  font-size: 90%;

  p {
    margin-bottom: ${px2rem(theme.gutter)};
  }

  li {
  }

  li:before {
    top: 8px;
    left: 0;
    position: relative;
    content: '⋆';
    color: orange;
    font-size: 50px;
    line-height: 0;
  }

  ul {
    padding: 0;
    list-style: none;
  }

  .next ul {
    padding: 0;
    list-style: none;
  }

  .next li:before {
    content: ''
  }

  .next a {
    color: ${theme.colours.headingBlue};
    text-decoration: underline;
  }
`
export default PrecisBlock
