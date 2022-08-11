import React, { useState } from 'react'
import styled from 'styled-components'
import Theme, { breakpoints, mqLess, px2rem } from '../../theme'
import Column from '../column'
import LargeNav from '../nav/large'
import { useRouter } from 'next/router'
import Image from 'next/image'
import heroImage from './hero-min.jpg'

const Header = React.memo(() => {
  const router = useRouter()
  const [loaded, setLoaded] = useState(router.pathname !== '/')
  return (
    <StyledHeader>
      <StyledImage
        $loaded={loaded ? true : undefined}
        onLoadingComplete={() => setLoaded(true)}
        alt=""
        priority
        objectFit="cover"
        layout="fill"
        src={heroImage}
      />

      <Column style={{ zIndex: 10 }}>
        <div className="gradient">
          <LargeNav />
          {router.pathname == '/' && (
            <>
              <h1>Let&apos;s talk about software...</h1>
              <h2>And then, let&apos;s build it.</h2>
            </>
          )}
        </div>
      </Column>
    </StyledHeader>
  )
})

Header.displayName = 'Header'

const StyledImage = styled(Image)<{ $loaded: boolean }>`
  opacity: ${(props) => (props.$loaded ? 1 : 0.01)};
  transition: opacity 0.2s;
`

const StyledHeader = styled.header`
  background-color: black;
  text-align: center;
  position: relative;
  overflow: hidden;
  padding-bottom: ${px2rem(Theme.gutter * 8)};
  z-index: ${Theme.zIndex.middle};

  .gradient {
    margin-top: ${px2rem(160)};
    background: linear-gradient(to right, rgba(98, 190, 173, 0.9), rgba(66, 145, 206, 0.9));

    h1,
    h2 {
      padding: ${px2rem(Theme.gutter * 2)} 0 ${px2rem(Theme.gutter * 12)} 0;
      color: #ededed;
      font-size: ${px2rem(44)};
      font-weight: bold;
      width: ${px2rem(900)};

      margin: 0 auto 0 auto;
    }

    h1 {
      padding-bottom: ${px2rem(Theme.gutter)};
    }

    h2 {
      padding-top: 0;
    }
  }

  ${mqLess(breakpoints.medium)} {
    padding-bottom: ${px2rem(Theme.gutter * 5)};
    .gradient {
      margin-top: ${px2rem(Theme.gutter * 3 + 52)};
      margin-left: ${px2rem(Theme.gutter * 2)};
      margin-right: ${px2rem(Theme.gutter * 2)};

      h1,
      h2 {
        width: auto;
        font-size: ${px2rem(33)};
        padding: ${px2rem(Theme.gutter * 3)} ${px2rem(Theme.gutter * 2)} ${px2rem(Theme.gutter * 4)}
          ${px2rem(Theme.gutter * 2)};
      }

      h2 {
        display: none;
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
