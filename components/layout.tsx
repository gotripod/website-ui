import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import styled from 'styled-components'
import Theme from '../theme'
import { Testimonial } from '../types'
import Column from './column'
import Contact from './contact'
import Footer from './footer'
import Header from './header'
import Testimonials from './home/testimonials'
import SmallNav from './nav/small'
import ToTop from './to-top'

interface Props {
  testimonial?: Testimonial
  children: React.ReactNode
  heroHtml?: string
}

const Layout = ({ children, testimonial, heroHtml }: Props) => {
  const route = useRouter()
  return <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
    <style jsx global>
      {`
        @font-face {
          font-family: 'Cabin';
          src: url('https://content.gotripod.com/wp-content/themes/go-tripod/WPGulp/assets/fonts/cabin-bold-webfont.woff2')
              format('woff2'),
            url('https://content.gotripod.com/wp-content/themes/go-tripod/WPGulp/assets/fonts/cabin-bold-webfont.woff')
              format('woff');
          font-weight: bold;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: 'Noto Sans';
          src: url('https://content.gotripod.com/wp-content/themes/go-tripod/WPGulp/assets/fonts/notosans-regular-webfont.woff2')
              format('woff2'),
            url('https://content.gotripod.com/wp-content/themes/go-tripod/WPGulp/assets/fonts/notosans-regular-webfont.woff')
              format('woff');
          font-display: swap;
        }

        @font-face {
          font-family: 'Noto Sans';
          src: url('https://content.gotripod.com/wp-content/themes/go-tripod/WPGulp/assets/fonts/notosans-bold-webfont.woff2')
              format('woff2'),
            url('https://content.gotripod.com/wp-content/themes/go-tripod/WPGulp/assets/fonts/notosans-bold-webfont.woff')
              format('woff');
          font-weight: bold;
          font-display: swap;
        }
      `}
    </style>
    <ToTop />
    <SmallNav />
    <Header heroHtml={heroHtml} />
    <MainContainer>
      {children}

      <Contact />
      {testimonial && route.pathname === '/'  && (
        <Column>
          <STestimonials testimonial={testimonial} />
        </Column>
      )}
      <Footer />
    </MainContainer>
  </>
}

export default Layout

const STestimonials = styled(Testimonials)`
  margin-bottom: ${Theme.gutter * 6}px;
`

const MainContainer = styled.main`
  background-color: #ededed;
  background-image: url('https://content.gotripod.com/wp-content/themes/go-tripod/WPGulp/assets/img/bg-dots-tile-v2.svg');
  background-attachment: fixed;
  position: relative;

  &:before {
    content: '';
    background-image: url(https://content.gotripod.com/wp-content/themes/go-tripod/WPGulp/assets/img/bg-stripes.svg);
    background-repeat: no-repeat;
    background-position: -3px -20px;
    height: 1500px;
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
  }

  abbr {
    text-decoration: none;
    border-bottom: 1px dotted;
  }

  [data-tooltip] {
    position: relative;
    text-shadow: none;
  }

  [data-tooltip]::before {
    content: "";
left: 6.5px;
width: 0;
height: 0;
border-width: 6.5px;
border-style: solid;
border-color: #62bead transparent transparent transparent;
z-index: 2;
margin-bottom: -6.5px;
margin-bottom: -.3611111111rem;
  }


[data-tooltip]::after {

  color: #fff;
  background: -webkit-linear-gradient(left,#62bead,#4291ce);
  background: linear-gradient(to right,#62bead,#4291ce);
  content: attr(data-tooltip);
  display: inline-table;
  border-radius: 6.5px;
  font-weight: 700;
  z-index: 1;
  font-size: 13px;
  font-size: .7222222222rem;
  padding: 3.25px 13px;
  padding: .1805555556rem .7222222222rem;
  box-shadow: 0 1.5px 4px rgba(0,0,0,.24),0 1.5px 6px rgba(0,0,0,.12);

}

  [data-tooltip]::before, [data-tooltip]::after {
    position: absolute;
    bottom: 50%;
    left: 0;
    z-index: 300;
    opacity: 0;
    visibility: hidden;
    transition: opacity .1s cubic-bezier(.4,0,.2,1),visibility .1s cubic-bezier(.4,0,.2,1),bottom .1s cubic-bezier(.4,0,.2,1);
  }

  [data-tooltip]:hover::before, [data-tooltip]:hover::after {
      visibility: visible;
      opacity: 1;
      bottom: 100%;
  }
`
