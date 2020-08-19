import axios from 'axios'
import { Testimonial, ProjectListItem } from '../types'

const getTestimonials = async (): Promise<Testimonial> => {
  const testimonials = (
    await axios.get('https://gotripod.com/wp-json/wp/v2/testimonial?per_page=1')
  ).data

  const testimonial = testimonials[0]

  return {
    quote: testimonial.acf.testimonial_body,
    quoteAuthor: testimonial.title.rendered
  }
}

const getTestimonialById = async (testimonialId: number): Promise<Testimonial> => {
  const testimonial = (
    await axios.get(`https://gotripod.com/wp-json/wp/v2/testimonial/${testimonialId}`)
  ).data

  return {
    quote: testimonial.acf.testimonial_body,
    quoteAuthor: testimonial.title.rendered
  }
}

const getMediaById = async (mediaId: number) => {
  const mediaResponse = await axios.get(`https://gotripod.com/wp-json/wp/v2/media/${mediaId}`)

  return mediaResponse.data
}

const getProjects = async (): Promise<ProjectListItem[]> => {
  const response = await fetch(
    'https://gotripod.com/wp-json/wp/v2/project?_fields=acf.project_logo,id,slug'
  )

  const projects = await response.json()

  return projects.map((p) => ({
    id: p.id,
    logoUrl: p.acf.project_logo,
    link: p.slug
  }))
}

export { getTestimonials, getTestimonialById, getMediaById, getProjects }
