import { css } from 'styled-components'

const px2rem = (px: number): string | number => (Number(px) ? `${Number(px) / 18}rem` : 0)

const mqLess = (bp: Breakpoint) => `@media screen and (max-width:${bp}px)`
const mqMore = (bp: Breakpoint) => `@media screen and (min-width:${bp}px)`

enum Breakpoint {
  small = 576,
  medium = 768,
  large = 992,
  jumbo = 1200
}

export default {
  colours: {
    linkBlue: '#62bead',
    headingBlue: '#4291ce',
    linkOrange: '#ef7852',
    highlightBlue: '#4eace0'
  },
  gutter: 13,
  fontSize: {
    aside: 14,
    base: 18,
    prominentText: 20,
    h2: 40
  },
  lineHeight: 26,
  cardFlare: css`
    &:before {
      content: '';
      background: linear-gradient(to bottom, rgba(98, 190, 173, 0.9), rgba(66, 145, 206, 0.9));
      ${mqLess(Breakpoint.medium)} {
        width: ${px2rem(5)};
      }

      ${mqMore(Breakpoint.medium)} {
        width: ${px2rem(13)};
      }
      height: 100%;
      display: block;
      position: absolute;
      top: 0;
      left: 0;
    }
  `
}

export { Breakpoint as breakpoints, px2rem, mqLess, mqMore }
