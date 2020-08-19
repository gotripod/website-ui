import axios from 'axios'
import { Testimonial, ProjectListItem, Project, MediaItem } from '../types'
import { keysToCamelDeep } from 'helpers/keys-to-camel'

const getTestimonial = async (): Promise<Testimonial> => {
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

const getMediaById = async (mediaId: number): Promise<MediaItem> => {
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

const getProjectBySlug = async (slug: string): Promise<Project> => {
  const response = await fetch(`https://gotripod.com/wp-json/wp/v2/project?slug=${slug}`)
  const json = await response.json()
  const post = json[0]

  const heroMedia = await getMediaById(post.acf.project_hero)

  // fetch testimonial body
  const shallowTestimonialIndex = post.acf.project_blocks.findIndex(
    (b) => b.acf_fc_layout === 'testimonial_block'
  )

  if (shallowTestimonialIndex !== -1) {
    const shallowTestimonialBlockId =
      post.acf.project_blocks[shallowTestimonialIndex].testimonial.ID

    const testimonial = await getTestimonialById(shallowTestimonialBlockId)

    post.acf.project_blocks[shallowTestimonialIndex].testimonial = testimonial
  }

  return {
    id: post.id,
    title: post.title.rendered,
    blocks: keysToCamelDeep(post.acf.project_blocks),
    heroMedia
  }
}

export { getTestimonial, getTestimonialById, getMediaById, getProjects, getProjectBySlug }
