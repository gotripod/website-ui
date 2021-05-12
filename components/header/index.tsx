import React from 'react'
import styled from 'styled-components'
import Theme, { breakpoints, mqLess, mqMore, px2rem } from '../../theme'
import Column from '../column'
import LargeNav from '../nav/large'
import { useRouter } from 'next/router'
import Image from 'next/image'

interface Props {
  heroHtml?: string
}

const Header = ({ heroHtml }: Props) => {
  const router = useRouter()
  return (
    <StyledHeader>
      <Image layout="fill" src="https://gotripod.com/wp-content/uploads/2018/02/hero-space-800.jpg.webp" />
      <div className="background">
        <div></div>
        <div>
          <a href="/">
            <img
              width="250"
              height="52"
              src="https://gotripod.com/wp-content/themes/go-tripod/WPGulp/assets/img/gt-logo-colour-on-black.svg"
              alt="Go Tripod"
            />
          </a>
        </div>
        <div></div>
      </div>
      <Column>
        <div className="gradient">
          <LargeNav />
          {router.pathname == '/' && (
            <h2>Your website should inspire confidence amoungst your customers</h2>
          )}
        </div>
      </Column>
    </StyledHeader>
  )
}

const StyledHeader = styled.header`
  text-align: center;
  position: relative;
  overflow: hidden;
  padding-bottom: ${px2rem(Theme.gutter * 8)};
  z-index: 1;

  .gradient {
    margin-top: ${px2rem(160)};
    background: linear-gradient(
      to right,
      rgba(98, 190, 173, 0.9),
      rgba(66, 145, 206, 0.9)
    );

    h2 {
      padding: ${px2rem(Theme.gutter * 2)} 0 ${px2rem(Theme.gutter * 12)} 0;
      color: #ededed;
      font-size: ${px2rem(44)};
      font-weight: bold;
      width: ${px2rem(750)};

      margin: 0 auto 0 auto;
    }
  }

  .background {
    width: 100%;
    img {
      height: 100%;
    }
  }

  ${mqMore(breakpoints.medium)} {

  .background {
    width: 100%;
    position: absolute;
    /* padding: ${px2rem(Theme.gutter * 4)} 0 ${px2rem(Theme.gutter * 8)} 0; */

    height: 255px;
    z-index: 2;
    display: flex;
    align-items: stretch;

    div {
      background: rgba(0, 0, 0, 0.5);
    }

    div:nth-child(1) {
      flex: 1;
    }

    div:nth-child(2) {
      width: 1140px;
      height: 160px;
      display: flex;
align-items: center;
justify-content: center;
    }

    div:nth-child(3) {
      flex: 1;
    }

    img {
      height: 100%;
    }
  }

  }

  a {
    height: ${px2rem(52)};
    display: inline-block;
  }

  ${mqLess(breakpoints.medium)} {
    .gradient {
      margin-top: ${px2rem(Theme.gutter * 3 + 52)};
      margin-left: ${px2rem(Theme.gutter * 2)};
      margin-right: ${px2rem(Theme.gutter * 2)};

      h2 {
        width: auto;
        font-size: ${px2rem(33)};
        padding: ${px2rem(Theme.gutter * 3)} ${px2rem(Theme.gutter * 2)}
          ${px2rem(Theme.gutter * 4)} ${px2rem(Theme.gutter * 2)};
      }
    }
    a {
      height: 30px;
      float: right;
      padding: ${px2rem(13)};
    }

    .background {
      height: 52px;
      background: linear-gradient(
        to right,
        rgba(98, 190, 173, 0.9),
        rgba(66, 145, 206, 0.9)
      );
      padding: 0;
      float: right;
      
    }

    picture,
    picture img {
      height: 100vh;
    }
  }
`

export default Header
