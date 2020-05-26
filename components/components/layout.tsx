import React from "react";
import styled from "styled-components";
import Theme from "../../theme";
import Column from "./column";
import Contact from "./contact";
import Footer from "./footer";
import Header from "./header";
import Testimonials from "./home/testimonials";

interface Props {
  testimonial: Testimonial;
  children: React.ReactNode;
}

const Layout = ({ children, testimonial }: Props) => (
  <>
    <Header isHome />
    <MainContainer>
      {children}

      <Contact />
      <Column>
        <STestimonials testimonial={testimonial} />
      </Column>
      <Footer />
    </MainContainer>
  </>
);

export default Layout;

const STestimonials = styled(Testimonials)`
  margin-bottom: ${Theme.gutter * 4}px;
`;

const MainContainer = styled.main`
  background-image: url(https://gotripod.com/wp-content/themes/go-tripod/WPGulp/assets/img/bg-stripes.svg);
  background-repeat: no-repeat;
  background-position: -3px 16px;
  margin-top: -${Theme.gutter * 4}px;
`;
