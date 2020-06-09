import React from "react";
import styled from "styled-components";
import menu from "../../menu";
import Link from "../link";
import { mqLess, breakpoints, mqMore } from "../../theme";

interface Props {
  className?: string;
}

const LargeNav = ({ className }: Props) => (
  <NavContainer className={className}>
    <ul>
      {menu.map(({ text, link }) => {
        const isCurrentPage = false;
        return (
          <li key={link}>
            <Link link={link} aria-current={isCurrentPage ? "page" : undefined}>
              {text}
            </Link>
          </li>
        );
      })}
    </ul>
  </NavContainer>
);

export default LargeNav;

const NavContainer = styled.nav`
  ${mqLess(breakpoints.medium)} {
    display: none;
  }
  ul {
    list-style: none;
    display: flex;
    max-width: 100%;
    box-sizing: border-box;
    padding: 0 24px;
    margin: 0;
    overflow-x: auto;
    justify-content: center;
  }

  li {
    padding: 0;
    margin: 52px;
    font-size: 1em;
    color: #f7f7f7;

    & > a {
      display: inline-block;
      line-height: 2em;
      border-bottom: 2px solid;
      border-bottom-color: transparent;
      &[aria-current="page"] {
        border-bottom-color: #fff;
      }
    }
  }

  input {
    display: none;
  }

  li {
    &:first-of-type {
      margin-left: 0;
    }

    &:last-of-type {
      margin-right: 0;

      &:after {
        content: "";
        display: inline-block;
        width: 24px;
      }
    }
  }
`;
