import React from "react";

interface Props {
  testimonial: any;
}

const TestimonialBlock = ({ testimonial }: Props) => {
  return (
    <blockquote>
      <p>{testimonial.body}</p>

      <footer>― {testimonial.postTitle}</footer>
    </blockquote>
  );
};

export default TestimonialBlock;
