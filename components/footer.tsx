// import { Facebook, Linkedin, Twitter } from "@icons-pack/react-simple-icons";
import React from "react";
import styled from "styled-components";
import Theme from "../theme";

const Footer = () => (
  <Foot>
    <Nav>
      <ul>
        <li>
          {" "}
          <a href="/">
            <span>Home</span>
          </a>
        </li>
        <li>
          {" "}
          <a href="/work/">
            <span>Work</span>
          </a>
        </li>
        <li>
          {" "}
          <a href="/insights/">
            <span>Insights</span>
          </a>
        </li>
        <li>
          {" "}
          <a href="/contact/">
            <span>Contact</span>
          </a>
        </li>
      </ul>
    </Nav>
    <Top>
      <div>
        <a href="/">
          <img
            src="https://gotripod.com/wp-content/themes/go-tripod/WPGulp/assets/img/gt-logo-mono-on-black.svg"
            alt="Go Tripod"
          />{" "}
        </a>

        <img
          src="https://gotripod.com/wp-content/themes/go-tripod/WPGulp/assets/img/yus-footer.svg"
          alt=""
        />
      </div>
    </Top>

    <ContactDetails>
      <address className="postal">
        Tremough Innovation Centre,
        <br />
        Penryn, Cornwall, TR10 9TA, UK
      </address>

      <address className="email">
        <a href="mailto:hello@gotripod.com">hello@gotripod.com</a>
      </address>

      <a className="phone" href="tel:+448454752487">
        0845 475 2487
      </a>
    </ContactDetails>

    <Social>
      <li>
        <a
          href="https://twitter.com/gotripod"
          target="_blank"
          rel="noopener"
          title="Follow Go Tripod on Twitter (opens in new window)"
        >
          {/* <Twitter size={18} color={"white"} /> */}
        </a>
      </li>
      <li>
        {" "}
        <a
          href="https://www.facebook.com/gotripod"
          target="_blank"
          rel="noopener"
          title="Like Go Tripod on Facebook (opens in new window)"
        >
          {/* <Facebook size={18} color={"white"} /> */}
        </a>
      </li>
      <li>
        <a
          href="https://www.linkedin.com/company/go-tripod-ltd"
          target="_blank"
          rel="noopener"
          title="Follow Go Tripod on LinkedIn (opens in new window)"
        >
          {/* <Linkedin size={18} color={"white"} /> */}
        </a>
      </li>
    </Social>

    <Rights>
      © 2020 Go Tripod. All rights reserved. Registered in the UK company number
      6912029. VAT No. 972 5228 06. Get with our{" "}
      <a href="/privacy-policy/">Privacy&nbsp;Policy</a>.
    </Rights>
  </Foot>
);

export default Footer;

const Social = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: flex-start;
  max-width: 1200px;
  margin: 0 auto;

  li {
    margin-right: ${Theme.gutter}px;
  }
`;

const ContactDetails = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  margin: 50px auto;

  address,
  a {
    flex: 1;
    font-style: normal;
  }

  .phone {
    text-align: right;
  }

  .email {
    text-align: center;
    color: #4eace0;
    font-size: 30px;
    font-weight: bold;
  }
`;

const Foot = styled.footer`
  background: #424242;
  color: #f7f7f7;
`;

const Rights = styled.p`
  padding: 20px;
  text-align: center;
  background: #2c2c2c;
  font-size: 13px;
`;

const Nav = styled.nav`
  background: linear-gradient(to left, #62bead, #86cdc0);
  font-size: 16px;
  text-transform: uppercase;
  padding: 13px;

  ul {
    list-style: none;
    display: flex;
    padding: 0;
    justify-content: center;
  }

  li {
    padding: 13px 26px;
  }
`;

const Top = styled.div`
  background-image: url("https://gotripod.com/wp-content/themes/go-tripod/WPGulp/assets/img/bg-footer-stripes.svg");

  border-bottom: 1px solid #626262;

  background-repeat: no-repeat;

  background-position: right;

  padding: 39px;

  div {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }

  img {
    height: 32px;
  }
`;
