import styled from 'styled-components'
import theme, { mqLess, breakpoints } from '../../theme'
import Link from '../../components/link'

const Wrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  justify-content: space-between;
  margin: 0 -13px ${theme.gutter * 4}px 0;

  div {
    padding: 13px;
    box-sizing: border-box;
    flex-basis: 33.333333%;
    max-width: 33.333333%;
  }

  ${mqLess(breakpoints.medium)} {
    display: block;

    div {
      flex-basis: 100%;
      max-width: 100%;
    }
  }
`

const ProjectItemLink = styled(Link)<{ img: string }>`
  background: url(${(props) => props.img});
  height: 270px;
  display: block;
  background-size: auto 540px;

  &:hover {
    background-position: 0 270px;
  }
`

export { Wrapper, ProjectItemLink }
