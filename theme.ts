export default {
  colours: {
    linkBlue: "#62bead",
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
      width: 13px;
      height: 100%;
      display: block;
      position: absolute;
      top: 0;
      left: 0;
    }
  `,
};
