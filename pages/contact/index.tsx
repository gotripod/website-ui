import BaseCard from 'components/home/base-card'
import React, { ReactNode } from 'react'
import styled from 'styled-components'
import theme, { px2rem } from 'theme'
import Column from '../../components/column'
import Map from '../../components/contact/map'
import Layout from '../../components/layout'
import PageTitle from '../../components/page-title'
import Image from 'next/image'

const Contact = (): ReactNode => {
  return (
    <Layout>
      <Column slim>
        <PageTitle title="Want the internet to work for you?" subTitle="Let's talk" />
      </Column>
      <Column>
        <Card>
          <Intro>
            Give us a call, or fill in the form or drop us an email. Heck, come visit us! Or we can
            come visit you? Let&apos;s have a coffee, let&apos;s do lunch. It&apos;s up to you.
          </Intro>
          <Main>
            <Col>
              <Map />
            </Col>
            <Col>
              <StyledImage
                height={40}
                width={193}
                src="https://gotripod.com/wp-content/themes/go-tripod/WPGulp/assets/img/gt-logo-colour-on-white.svg"
                alt="Go Tripod"
              />
              <AddressList>
                <li>
                  <PostalAddress>
                    Go Tripod Ltd.
                    <br />
                    Tremough Innovation Centre,
                    <br />
                    Penryn, Cornwall, TR10 9TA,
                    <br />
                    England, UK
                  </PostalAddress>
                </li>
                <li className="highlight">
                  {' '}
                  <a href="mailto:hello@gotripod.com">hello@gotripod.com</a>
                </li>
                <li className="highlight">
                  {' '}
                  <a href="tel:+448454752487">0845 475 2487</a>
                </li>
              </AddressList>
            </Col>
          </Main>
        </Card>
      </Column>
    </Layout>
  )
}

const StyledImage = styled(Image)`
  margin-left: ${theme.gutter * 4}px;
`

const AddressList = styled.ul`
  list-style: none;
  margin-left: ${theme.gutter * 4}px;
  padding: 0;

  .highlight {
    color: ${theme.colours.highlightBlue};
    font-size: ${px2rem(theme.fontSize.base * 1.5)};
  }
`

const PostalAddress = styled.address`
  font-style: normal;
  margin-bottom: ${px2rem(theme.gutter * 2)};
`

const Card = styled(BaseCard)`
  padding: ${theme.gutter * 8}px;
  margin-bottom: ${theme.gutter * 6}px;
`

const Col = styled.div``

const Main = styled.div`
  display: flex;
`

const Intro = styled.p`
  margin: 0 0 ${theme.gutter * 6}px;
`

export default Contact
