import React from "react";
import styled from "styled-components";
import Theme, { px2rem } from "../../theme";
import Column from "../column";
import Nav from "../nav";

const S = {
  LogoLink: styled.a`
    height: ${px2rem(52)};
    display: inline-block;
  `,
  LogoImage: styled.img`
    height: 100%;
  `,
  Header: styled.header`
    text-align: center;
    position: relative;
    overflow: hidden;
    padding-bottom: ${px2rem(Theme.gutter * 8)};
    z-index: 10;
  `,
  LogoBackground: styled.div`
    position: absolute;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    padding: ${px2rem(Theme.gutter * 4)} 0 ${px2rem(Theme.gutter * 8)} 0;
    z-index: -1;

    clip-path: polygon(
      0 100%,
      25.44% 100%,
      25.44% 75.7%,
      74.42% 76.17%,
      74.64% 97.64%,
      100% 99%,
      100% 0%,
      0% 0%
    );
  `,
  Hero: styled.picture`
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
  `,
  Gradient: styled.div`
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
  `,
};

const Logo = () => (
  <S.LogoBackground>
    <S.LogoLink href="/">
      <S.LogoImage
        src="https://gotripod.com/wp-content/themes/go-tripod/WPGulp/assets/img/gt-logo-colour-on-black.svg"
        alt="Go Tripod"
      />
    </S.LogoLink>
  </S.LogoBackground>
);

interface Props {
  heroHtml?: string;
}

const Header = ({ heroHtml }: Props) => {
  return (
    <S.Header>
      <S.Hero>
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
          media="(max-width: 800px)"
        />
        <img src="https://gotripod.com/wp-content/uploads/2018/02/hero-space-800-300x125.jpg" />
      </S.Hero>
      <Logo />
      <Column>
        <S.Gradient>
          <Nav />
          {typeof window !== "undefined" && window.location.pathname == "/" && (
            <p>Your website should inspire confidence in your customers</p>
          )}
        </S.Gradient>
      </Column>
    </S.Header>
  );
};

export default Header;
