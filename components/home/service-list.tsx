import React from "react";
import styled from "styled-components";
import Theme, { px2rem, breakpoints } from "../../theme";
import { Service } from "../../types";
import BaseCard from "./base-card";
import Enquire from "./enquire";

interface Props {
  services: Service[];
}

const ServiceList = ({ services }: Props) => {
  return (
    <StyledService.List>
      {services.map((service, idx) => (
        <StyledService.ItemWrapper key={idx}>
          <StyledService.Item>
            <StyledService.Content>
              {idx === 0 && <h1>We are Go Tripod.</h1>}
              <StyledService.Subtitle>{service.title}</StyledService.Subtitle>
              <StyledService.Body
                dangerouslySetInnerHTML={{ __html: service.body }}
              />
              <Enquire link="/contact">Enquire</Enquire>
            </StyledService.Content>
            <StyledService.Image src={service.imageUrl} />
          </StyledService.Item>
        </StyledService.ItemWrapper>
      ))}
    </StyledService.List>
  );
};

export default ServiceList;

const StyledService = {
  List: styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    margin-top: -${px2rem(Theme.gutter * 4)};
    z-index: 100;
    position: relative;
  `,
  ItemWrapper: styled.li`
    margin-bottom: ${px2rem(52)};
  `,
  Item: styled(BaseCard)`
    ${Theme.cardFlare}
    overflow: hidden;
    position: relative;
    padding: ${px2rem(52)};
  `,
  Image: styled.img`
    @media screen and (max-width: ${breakpoints.medium}px) {
      display: none;
    }
    width: 60%;
    position: absolute;
    bottom: 0;
    right: 0;
  `,
  Content: styled.div`
    width: 70%;

    h1 {
      color: ${Theme.colours.headingBlue};
    }
  `,
  Title: styled.h1``,
  Subtitle: styled.h2`
    position: relative;
    width: 70%;
    z-index: 10;
    font-size: ${Theme.fontSize.h2}px;
  `,
  Body: styled.div`
    color: #999;
    width: 60%;
    line-height: 150%;
    margin-bottom: ${Theme.gutter * 4}px;
  `,
};
