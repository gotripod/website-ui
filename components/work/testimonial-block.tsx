import React from "react";
import { Testimonial } from "../../types";

interface Props {
  testimonial: Testimonial;
}

const TestimonialBlock = ({ testimonial }: Props) => {
  return <div>TEST{testimonial.body}</div>;
};

export default TestimonialBlock;
