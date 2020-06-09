import React from "react";
import styled from "styled-components";
import Theme, { px2rem, breakpoints, mqLess } from "../../theme";
import { Service } from "../../types";
import BaseCard from "./base-card";
import Enquire from "./enquire";

interface Props {
  services: Service[];
}

const ServiceList = ({ services }: Props) => {
  return (
    <StyledServiceList>
      {services.map((service, idx) => (
        <li key={idx}>
          <Item>
            <div className="contentWrap">
              {idx === 0 && <h1>We are Go Tripod.</h1>}
              <h2>{service.title}</h2>
              <div
                className="body"
                dangerouslySetInnerHTML={{ __html: service.body }}
              />
              <Enquire link="/contact">Enquire</Enquire>
            </div>

            <img src={service.imageUrl} />
          </Item>
        </li>
      ))}
    </StyledServiceList>
  );
};

export default ServiceList;

const StyledServiceList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  margin-top: -${px2rem(Theme.gutter * 4)};
  z-index: 1;
  position: relative;
`;

const Item = styled(BaseCard)`
  ${Theme.cardFlare}
  overflow: hidden;
  position: relative;
  padding: ${px2rem(52)};
  margin-bottom: ${px2rem(52)};

  .contentWrap {
    width: 70%;
  }

  img {
    width: 60%;
    position: absolute;
    bottom: 0;
    right: 0;
  }

  h1 {
    color: ${Theme.colours.headingBlue};
  }

  h2 {
    position: relative;
    width: 70%;
    z-index: 10;
    font-size: ${Theme.fontSize.h2}px;
  }

  .body {
    color: #999;
    width: 60%;
    line-height: 150%;
    margin-bottom: ${Theme.gutter * 4}px;
  }

  ${mqLess(breakpoints.medium)} {
    margin: ${px2rem(Theme.gutter * 2)} 0;
    padding: ${px2rem(Theme.gutter * 2)};
    img {
      display: none;
    }

    .contentWrap,
    .body,
    h2 {
      width: 100%;
    }

    h1,
    h2 {
      text-align: center;
    }

    .body {
      margin-bottom: ${Theme.gutter * 2}px;
    }
  }
`;
