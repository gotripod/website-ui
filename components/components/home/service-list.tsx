import React from "react";
import styled from "styled-components";
import Theme from "../../../theme";
import { Service } from "../../../types";
import BaseCard from "./base-card";
import Enquire from "./Enquire";

interface Props {
  services: Service[];
}

const ServiceList = ({ services }: Props) => {
  console.log(services);
  return (
    <StyledService.List>
      {services.map((service) => (
        <StyledService.ItemWrapper>
          <StyledService.Item>
            <StyledService.Content>
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
  `,
  ItemWrapper: styled.li`
    margin-bottom: 52px;
  `,
  Item: styled(BaseCard)`
    ${Theme.cardFlare}
    overflow: hidden;
    position: relative;
    padding: 52px;
  `,
  Image: styled.img`
    width: 60%;
    position: absolute;
    bottom: 0;
    right: 0;
  `,
  Content: styled.div`
    width: 70%;
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
  `,
};
