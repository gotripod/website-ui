const px2rem = (px: number): string | number => Number(px) ? `${Number(px) / 18}rem` : 0;

export default {
  colours: {
    linkBlue: "#62bead",
    headingBlue: "#4291ce",
  },
  gutter: 13,
  fontSize: {
    h2: 36,
  },
  cardFlare: `
    &:before {
      content: "";
      background: linear-gradient(
        to bottom,
        rgba(98, 190, 173, 0.9),
        rgba(66, 145, 206, 0.9)
      );
      width: ${px2rem(13)};
      height: 100%;
      display: block;
      position: absolute;
      top: 0;
      left: 0;
    }
  `,
};

const breakpoints = {
  small: 576,
  medium: 768,
  large: 992,
  jumbo: 1200
}

export {
  breakpoints,
  px2rem
}