import styled from "styled-components";
import { Testimonial } from "../../types";
import { px2rem, mqLess, breakpoints } from "../../theme";

interface Props {
  testimonial: Testimonial;
  className?: string;
}

const Testimonials = ({ testimonial, className }: Props) => (
  <Wrapper className={className}>
    <blockquote>{testimonial.body}</blockquote>
    <p>&mdash; {testimonial.title}</p>
  </Wrapper>
);

export default Testimonials;

const Wrapper = styled.section`
  background: white;
  border-bottom: 5px solid rgba(0, 0, 0, 0.3);
  text-align: center;

  quote {
    font-style: italic;
    font-size: ${px2rem(22)};
    color: #333;
    line-height: ${px2rem(32.5)};
  }

  p {
    color: #999;
  }

  ${mqLess(breakpoints.medium)} {
    padding: 0;
  }
`;
