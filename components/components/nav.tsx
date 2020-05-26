import React from "react";
import styled from "styled-components";

/**
 * Navigation Component
 *
 * It renders the navigation links
 */
const Nav = () => <NavContainer></NavContainer>;

// {state.theme.menu.map(([name, link]) => {
//   // Check if the link matched the current page url
//   const isCurrentPage = state.router.link === link;
//   return (
//     <NavItem key={name}>
//       {/* If link url is the current page, add `aria-current` for a11y */}
//       <Link link={link} aria-current={isCurrentPage ? "page" : undefined}>
//         {name}
//       </Link>
//     </NavItem>
//   );
// })}

export default Nav;

const NavContainer = styled.nav`
  list-style: none;
  display: flex;
  max-width: 100%;
  box-sizing: border-box;
  padding: 0 24px;
  margin: 0;
  overflow-x: auto;
  justify-content: center;

  @media screen and (max-width: 560px) {
    display: none;
  }
`;

const NavItem = styled.div`
  padding: 0;
  margin: 52px;
  color: #f7f7f7;
  font-size: 0.9em;

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
