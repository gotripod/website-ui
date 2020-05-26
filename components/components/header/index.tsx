import React from "react";
import styled from "styled-components";
import Theme from "../../../theme";
import Column from "../column";
import Nav from "../nav";

const S = {
  LogoLink: styled.a`
    height: 52px;
    display: inline-block;
  `,
  LogoImage: styled.img`
    height: 100%;
  `,
  Header: styled.header`
    text-align: center;
    position: relative;
    overflow: hidden;
    padding-bottom: ${Theme.gutter * 6}px;
    z-index: 10;
  `,
  LogoBackground: styled.div`
    position: absolute;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    padding: ${Theme.gutter * 4}px 0 ${Theme.gutter * 8}px 0;
    z-index: -1;
  `,
  Hero: styled.img`
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    z-index: -10;
    object-fit: cover;
  `,
  Gradient: styled.div`
    margin-top: 160px;
    background: linear-gradient(
      to right,
      rgba(98, 190, 173, 0.9),
      rgba(66, 145, 206, 0.9)
    );

    p {
      padding: ${Theme.gutter * 4}px 0 ${Theme.gutter * 12}px 0;
      color: #ededed;
      font-size: 44px;
      font-weight: bold;
      width: 650px;
      margin: 0 auto 104px auto;
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
  isHome: boolean;
}

const Header = ({ isHome }: Props) => {
  return (
    <S.Header>
      <S.Hero src="https://gotripod.com/wp-content/uploads/2018/02/hero-space-800-1920x800-c-center.jpg" />
      <Logo />
      <Column>
        <S.Gradient>
          <Nav />
          {isHome && (
            <p>Your website should inspire confidence in your customers</p>
          )}
        </S.Gradient>
      </Column>
    </S.Header>
  );
};

export default Header;
