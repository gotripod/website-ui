import React from "react";
import { Testimonial } from "../../types";

interface Props {
  testimonial: Testimonial;
}

const TestimonialBlock = ({ testimonial }: Props) => {
  console.log("testimonial", testimonial);
  return <div>TESTIMONIAL PLACEHOLDER{testimonial.body}</div>;
};

export default TestimonialBlock;
