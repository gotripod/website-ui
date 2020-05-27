import styled from "styled-components";
import { Testimonial } from "../../types";

interface Props {
  testimonial: Testimonial;
  className?: string;
}

const Testimonials = ({ testimonial, className }: Props) => (
  <Wrapper className={className}>
    <blockquote>{testimonial.body}</blockquote>
    <p>&mdash; {testimonial.title.rendered}</p>
  </Wrapper>
);

export default Testimonials;

const Wrapper = styled.section`
  background: white;
  border-bottom: 5px solid rgba(0, 0, 0, 0.3);
  text-align: center;
  padding: 50px 200px;

  quote {
    font-style: italic;
    font-size: 22px;
    color: #333;
    line-height: 32.5px;
  }

  p {
    color: #999;
  }
`;
