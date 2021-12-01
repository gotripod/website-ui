import React from 'react'
import styled from 'styled-components'
import Theme, { breakpoints, mqLess, mqMore, px2rem } from '../../theme'
import Column from '../column'
import LargeNav from '../nav/large'
import { useRouter } from 'next/router'
import Image from 'next/image'
import heroImage from './hero.jpg'
import useNextBlurhash from 'use-next-blurhash'

interface Props {
  heroHtml?: string
}

const Header = ({ heroHtml }: Props) => {
  const router = useRouter()
  const [blurhash] = useNextBlurhash('L88E[Arr00s:3sf8;ej@rVWUXTbc')
  return (
    <StyledHeader>
      <Image
        alt=""
        priority
        objectFit="cover"
        layout="fill"
        placeholder="blur"
        blurDataURL={blurhash}
        src={heroImage}
      />
      
      <Column style={{ zIndex: 10 }}>
        <div className="gradient">
          <LargeNav />
          {router.pathname == '/' && <h2>The web? We&apos;ll make it as easy as one, two, three.</h2>}
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
  z-index: ${Theme.zIndex.middle};

  .gradient {
    margin-top: ${px2rem(160)};
    background: linear-gradient(to right, rgba(98, 190, 173, 0.9), rgba(66, 145, 206, 0.9));

    h2 {
      padding: ${px2rem(Theme.gutter * 2)} 0 ${px2rem(Theme.gutter * 12)} 0;
      color: #ededed;
      font-size: ${px2rem(44)};
      font-weight: bold;
      width: ${px2rem(750)};

      margin: 0 auto 0 auto;
    }
  }

  ${mqLess(breakpoints.medium)} {
    padding-bottom: ${px2rem(Theme.gutter * 5)};
    .gradient {
      margin-top: ${px2rem(Theme.gutter * 3 + 52)};
      margin-left: ${px2rem(Theme.gutter * 2)};
      margin-right: ${px2rem(Theme.gutter * 2)};

      h2 {
        width: auto;
        font-size: ${px2rem(33)};
        padding: ${px2rem(Theme.gutter * 3)} ${px2rem(Theme.gutter * 2)} ${px2rem(Theme.gutter * 4)}
          ${px2rem(Theme.gutter * 2)};
      }
    }
    a {
      height: 30px;
      float: right;
      padding: ${px2rem(13)};
    }

    picture,
    picture img {
      height: 100vh;
    }
  }
`

export default Header
