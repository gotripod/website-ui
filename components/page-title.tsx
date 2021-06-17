import React from 'react'
import styled from 'styled-components'
import Theme, { mqLess, breakpoints, px2rem } from '../theme'
import theme from '../theme'
const S = {
  Wrapper: styled.header<{ slim: boolean }>`
    position: relative;
    background: white;
    border-bottom: 5px solid rgba(0, 0, 0, 0.3);
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.1);
    text-align: center;
    padding: ${px2rem(theme.gutter * 2)} 0;
    z-index: 1;
    margin: -${Theme.gutter * 4}px ${(props) => (props.slim ? Theme.gutter * 6 : 0)}px ${Theme.gutter *
      4}px ${(props) => (props.slim ? Theme.gutter * 6 : 0)}px;
    ${Theme.cardFlare}

    ${mqLess(breakpoints.medium)} {
      margin-left: ${px2rem(theme.gutter)};
      margin-right: ${px2rem(theme.gutter)};
    }
  `
}

interface Props {
  title: string
  subTitle?: string
  slim?: boolean
}

const PageTitle = ({ slim, title, subTitle }: Props) => (
  <S.Wrapper slim={slim}>
    <h1>{title}</h1>
    {subTitle && <p>{subTitle}</p>}
  </S.Wrapper>
)

export default PageTitle
