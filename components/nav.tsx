import React from "react";
import styled from "styled-components";
import menu from "../menu";
import Link from "./link";
import { mqLess, breakpoints } from "../theme";

/**
 * Navigation Component
 *
 * It renders the navigation links
 */
const Nav = () => (
  <NavContainer>
    <input type="checkbox" />
    <span></span>
    <span></span>
    <span></span>
    <ul>
      {menu.map(({ text, link }) => {
        // Check if the link matched the current page url
        const isCurrentPage = false;
        return (
          <NavItem key={link}>
            {/* If link url is the current page, add `aria-current` for a11y */}
            <Link link={link} aria-current={isCurrentPage ? "page" : undefined}>
              {text}
            </Link>
          </NavItem>
        );
      })}
    </ul>
  </NavContainer>
);

export default Nav;

const NavContainer = styled.nav`
  ul {
    list-style: none;
    display: flex;
    max-width: 100%;
    box-sizing: border-box;
    padding: 0 24px;
    margin: 0;
    overflow-x: auto;
    justify-content: center;
    ${mqLess(breakpoints.medium)} {
      display: none;
    }
  }

  ${mqLess(breakpoints.medium)} {
    user-select: none;
    display: block;
    position: fixed;
    top: 16px;
    left: 13px;
    z-index: 1;

    input {
      display: block;
      width: 40px;
      height: 32px;
      position: absolute;
      top: -7px;
      left: -5px;

      cursor: pointer;

      opacity: 0; /* hide this */
      z-index: 2; /* and place it over the hamburger */
    }

    /*
  * Just a quick hamburger
  */
    span {
      display: block;
      width: 26px;
      height: 3px;
      margin-bottom: 4px;
      position: relative;
      background: white;

      z-index: 1;

      transform-origin: 4px 0px;

      transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
        background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), opacity 0.55s ease;
    }

    span:first-child {
      transform-origin: 0% 0%;
    }

    span:nth-last-child(2) {
      transform-origin: 0% 50%;
    }

    /* 
 * Transform all the slices of hamburger
 * into a crossmark.
 */
    input:checked ~ span:nth-last-child(4) {
      transform: rotate(-45deg) translate(-5px, 2px) scale(0.7, 1);
    }

    /*
 * But let's hide the middle one.
 */
    input:checked ~ span:nth-last-child(3) {
      /* opacity: 1;
      transform: rotate(0deg) scale(0.2, 0.2); */
    }

    /*
 * Ohyeah and the last one should go the other direction
 */
    input:checked ~ span:nth-last-child(2) {
      transform: rotate(45deg) translate(-3px, -5px) scale(0.7, 1);
    }

    input:checked ~ ul {
      display: block;
    }
  }
`;

const NavItem = styled.li`
  padding: 0;
  margin: 52px;
  color: #f7f7f7;
  font-size: 1em;

  & > a {
    display: inline-block;
    line-height: 2em;
    border-bottom: 2px solid;
    border-bottom-color: transparent;
    /* Use for semantic approach to style the current link */
    &[aria-current="page"] {
      border-bottom-color: #fff;
    }
  }

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
`;
