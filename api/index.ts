import axios from "axios";
import { Testimonial } from "../types";

const getTestimonials = async (): Promise<Testimonial> => {
  const testimonials = (
    await axios.get("https://gotripod.com/wp-json/wp/v2/testimonial?per_page=1")
  ).data;

  const testimonial = testimonials[0];

  return {
    quote: testimonial.acf.testimonial_body,
    quoteAuthor: testimonial.title.rendered,
  };
};

const getTestimonialById = async (
  testimonialId: number
): Promise<Testimonial> => {
  const testimonial = (
    await axios.get(
      `https://gotripod.com/wp-json/wp/v2/testimonial/${testimonialId}`
    )
  ).data;

  return {
    quote: testimonial.acf.testimonial_body,
    quoteAuthor: testimonial.title.rendered,
  };
};

const getMediaById = async (mediaId: number) => {
  const mediaResponse = await axios.get(
    `https://gotripod.com/wp-json/wp/v2/media/${mediaId}`
  );

  return mediaResponse.data;
};

export { getTestimonials, getTestimonialById, getMediaById };
