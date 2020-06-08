const px2rem = (px: number): string | number => Number(px) ? `${Number(px) / 18}rem` : 0;

export default {
  colours: {
    linkBlue: "#62bead",
    headingBlue: "#4291ce",
  },
  gutter: 13,
  fontSize: {
    base: 18,
    h2: 36,
  },
  lineHeight: 26,
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

const mqLess = (bp: Breakpoint) => `@media screen and (max-width:${bp}px)`
const mqMore = (bp: Breakpoint) => `@media screen and (min-width:${bp}px)`

enum Breakpoint {
  small = 576,
  medium = 768,
  large = 992,
  jumbo = 1200
}

export {
  Breakpoint as breakpoints,
  px2rem,
  mqLess,
  mqMore
}