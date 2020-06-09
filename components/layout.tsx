import Head from "next/head";
import React from "react";
import styled from "styled-components";
import Theme from "../theme";
import { Testimonial } from "../types";
import Column from "./column";
import Contact from "./contact";
import Footer from "./footer";
import Header from "./header";
import Testimonials from "./home/testimonials";
import SmallNav from "./nav/small";

interface Props {
  testimonial?: Testimonial;
  children: React.ReactNode;
  heroHtml?: string;
}

const Layout = ({ children, testimonial, heroHtml }: Props) => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link
        href="https://fonts.googleapis.com/css2?family=Cabin:wght@700&display=swap"
        rel="stylesheet"
      />
    </Head>
    <SmallNav />
    <Header heroHtml={heroHtml} />
    <MainContainer>
      {children}

      <Contact />
      {testimonial && (
        <Column>
          <STestimonials testimonial={testimonial} />
        </Column>
      )}
      <Footer />
    </MainContainer>
  </>
);

export default Layout;

const STestimonials = styled(Testimonials)`
  margin-bottom: ${Theme.gutter * 4}px;
`;

const MainContainer = styled.main`
  background-color: #ededed;
  background-image: url("https://gotripod.com/wp-content/themes/go-tripod/WPGulp/assets/img/bg-dots-tile-v2.svg");
  background-attachment: fixed;
  position: relative;

  &:before {
    content: "";
    background-image: url(https://gotripod.com/wp-content/themes/go-tripod/WPGulp/assets/img/bg-stripes.svg);
    background-repeat: no-repeat;
    background-position: -3px 16px;
    height: 1500px;
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
  }
`;
