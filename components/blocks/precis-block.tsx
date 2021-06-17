import Link from 'components/link'
import React from 'react'
import styled from 'styled-components'
import Column from '../column'

interface Props {
  technologies: any[]
  services: any[]
}

const PrecisBlock = ({ technologies, services }: Props) => {
  return (
    <SColumn>
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
    </SColumn>
  )
}

const SColumn = styled(Column)`
  display: flex;

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

  div {
    flex: 1;
  }

  ul {
    padding: 0;
    list-style: none;
  }

  .next ul {
    padding: 0;
    list-style: none;
  }
`
export default PrecisBlock
