import React from "react";
import styled from "styled-components";
import { GalleryImage } from "../../types";

interface Props {
  images: GalleryImage[];
  caption: string;
}

const GalleryBlock = ({ caption, images }: Props) => {
  return (
    <>
      <Gallery>
        {images.map((image) => {
          return <Img alt={image.alt} src={image.url} />;
        })}
      </Gallery>
      <Caption>{caption}</Caption>
    </>
  );
};

const Caption = styled.caption`
  width: 100%;
  text-align: left;
`;

const Img = styled.img``;

const Gallery = styled.section`
  display: flex;
`;

export default GalleryBlock;
