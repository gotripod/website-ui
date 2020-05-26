import axios from "axios";

const getTestimonial = async () => {
  const testimonials = (
    await axios.get(
      "https://gotripod.com/wp-json/acf/v3/testimonial?per_page=1"
    )
  ).data;

  const testimonial = testimonials[0].acf;

  return {
    body: testimonial.testimonial_body,
    title: testimonial.testimonial_link.post_title,
  };
};

export { getTestimonial };
