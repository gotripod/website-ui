import React from "react";
import { Testimonial } from "../../types";

interface Props {
  testimonial: Testimonial;
}

const TestimonialBlock = ({ testimonial }: Props) => {
  return (
    <blockquote>
      <p>{testimonial.quote}</p>

      <footer>― {testimonial.quoteAuthor}</footer>
    </blockquote>
  );
};

export default TestimonialBlock;
