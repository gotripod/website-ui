import React from "react";
import styled from "styled-components";
import Theme, { px2rem, breakpoints, mqLess } from "../../theme";
import Column from "../column";
import Nav from "../nav";

interface Props {
  heroHtml?: string;
}

const Header = ({ heroHtml }: Props) => (
  <StyledHeader>
    <picture>
      <source
        srcSet="https://gotripod.com/wp-content/uploads/2018/02/hero-space-800.jpg"
        media="(min-width: 1101px)"
      />
      <source
        srcSet="https://gotripod.com/wp-content/uploads/2018/02/hero-space-800-1024x427.jpg"
        media="(max-width: 1100px)"
      />
      <source
        srcSet="https://gotripod.com/wp-content/uploads/2018/02/hero-space-800-768x320.jpg"
        media="(max-width: 800)"
      />
      <img src="https://gotripod.com/wp-content/uploads/2018/02/hero-space-800-300x125.jpg" />
    </picture>
    <div className="background">
      <a href="/">
        <img
          src="https://gotripod.com/wp-content/themes/go-tripod/WPGulp/assets/img/gt-logo-colour-on-black.svg"
          alt="Go Tripod"
        />
      </a>
    </div>
    <Column>
      <div className="gradient">
        <Nav />
        {typeof window !== "undefined" && window.location.pathname == "/" && (
          <p>Your website should inspire confidence in your customers</p>
        )}
      </div>
    </Column>
  </StyledHeader>
);

const StyledHeader = styled.header`
  text-align: center;
  position: relative;
  overflow: hidden;
  padding-bottom: ${px2rem(Theme.gutter * 8)};
  z-index: 10;

  picture {
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    z-index: -10;
    object-fit: cover;

    img,
    source {
      position: absolute;
      left: 0;
      right: 0;
      width: 100%;

      object-fit: cover;
    }
  }

  .gradient {
    margin-top: ${px2rem(160)};
    background: linear-gradient(
      to right,
      rgba(98, 190, 173, 0.9),
      rgba(66, 145, 206, 0.9)
    );

    p {
      padding: ${px2rem(Theme.gutter * 4)} 0 ${px2rem(Theme.gutter * 12)} 0;
      color: #ededed;
      font-size: ${px2rem(44)};
      font-weight: bold;
      width: ${px2rem(650)};

      margin: 0 auto 0 auto;
    }
  }

  .background {
    position: absolute;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    padding: ${px2rem(Theme.gutter * 4)} 0 ${px2rem(Theme.gutter * 8)} 0;
    z-index: -1;

    img {
      height: 100%;
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

      p {
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
`;

export default Header;
