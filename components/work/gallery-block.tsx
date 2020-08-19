import React from "react";
import styled from "styled-components";
import { GalleryImage } from "../../types";

interface Props {
  images: GalleryImage[];
  caption: string;
}

const GalleryBlock = ({ caption, images }: Props) => {
  const key = caption && caption.replace(/ /g, "");
  return (
    <>
      <Gallery>
        {images.map((image, idx) => {
          return (
            <Lightbox>
              <a className="shower" href={`#img-${key}-${idx}`}>
                <Img key={image.url} alt={image.alt} src={image.url} />
              </a>
              <a className="hider" href={`#_`}>
                <Img key={image.url} alt={image.alt} src={image.url} />
              </a>
            </Lightbox>
          );
        })}
      </Gallery>
      <Caption>{caption}</Caption>
    </>
  );
};

const Lightbox = styled.div`
  flex: 1;
  a {
    display: block;
    flex-basis: 50%;
  }

  .shower {
  }

  .hider {
    background: red;
    width: 100vh;
    height: 100vh;
    display: none;
  }

  .hider:target {
    display: block;
  }
`;

const Caption = styled.p`
  width: 100%;
  text-align: left;
`;

const Img = styled.img``;

const Gallery = styled.section`
  display: flex;
`;

export default GalleryBlock;
