import axios from "axios";

const getTestimonials = async () => {
  const testimonials = (
    await axios.get("https://gotripod.com/wp-json/wp/v2/testimonial?per_page=1")
  ).data;

  const testimonial = testimonials[0].acf;

  return {
    body: testimonial.testimonial_body,
    title: testimonial.title.rendered,
  };
};

const getTestimonialById = async (testimonialId: number) => {
  const testimonial = (
    await axios.get(
      `https://gotripod.com/wp-json/wp/v2/testimonial/${testimonialId}`
    )
  ).data;

  return {
    body: testimonial.acf.testimonial_body,
    title: testimonial.title.rendered,
  };
};

const getMediaById = async (mediaId: number) => {
  const mediaResponse = await axios.get(
    `https://gotripod.com/wp-json/wp/v2/media/${mediaId}`
  );

  return mediaResponse.data;
};

export { getTestimonials, getTestimonialById, getMediaById };
