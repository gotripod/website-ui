import { Testimonial, ProjectListItem, Project, MediaItem, Post, Category, WPPage } from '../types'
import { keysToCamelDeep } from 'helpers/keys-to-camel'
import he from 'he'
const getCategoryBySlug = async (slug: string): Promise<Category> => {
  const response = await fetch('https://content.gotripod.com/wp-json/wp/v2/categories?slug=' + slug)
  const categories = await response.json()

  const category = categories[0]

  return {
    id: category.id
  }
}

const getTagBySlug = async (slug: string): Promise<Category> => {
  const response = await fetch('https://content.gotripod.com/wp-json/wp/v2/tags?slug=' + slug)
  const tags = await response.json()

  const tag = tags[0]

  return {
    id: tag.id
  }
}

const getTestimonial = async (): Promise<Testimonial> => {
  const response = await fetch('https://content.gotripod.com/wp-json/wp/v2/testimonial?per_page=1&orderby=rand')

  const testimonials = await response.json()

  const testimonial = testimonials[0]

  return {
    projectUrl: testimonial.project_url || '',
    quote: testimonial.acf.testimonial_body,
    quoteAuthor: testimonial.title.rendered
  }
}

const getTestimonialById = async (testimonialId: number): Promise<Testimonial> => {
  const response = await fetch(`https://content.gotripod.com/wp-json/wp/v2/testimonial/${testimonialId}`)

  const testimonial = await response.json()

  return {
    projectUrl: testimonial.project_url || '',
    quote: testimonial.acf.testimonial_body,
    quoteAuthor: testimonial.title.rendered
  }
}

const getMediaById = async (mediaId: number): Promise<MediaItem> => {
  const response = await fetch(`https://content.gotripod.com/wp-json/wp/v2/media/${mediaId}`)
  const media = await response.json()

  return media
}

const getProjects = async (): Promise<ProjectListItem[]> => {
  const response = await fetch(
    'https://content.gotripod.com/wp-json/wp/v2/project?_fields=acf.project_logo,id,slug&orderby=menu_order&order=asc'
  )

  const projects = await response.json()

  return projects.map((p) => ({
    id: p.id,
    logoUrl: p.acf.project_logo,
    link: p.slug
  }))
}

const getProjectBySlug = async (slug: string): Promise<Project> => {
  const response = await fetch(`https://content.gotripod.com/wp-json/wp/v2/project?slug=${slug}`)
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

const getPageBySlug = async (slug: string): Promise<WPPage> => {
  console.debug('Getting page with slug', slug)
  const response = await fetch(`https://content.gotripod.com/wp-json/wp/v2/pages?slug=${slug}`)
  const json = await response.json()
  const page = json[0]

  return {
    title: he.decode(page.title.rendered),
    date: page.date,
    body: he.decode(page.acf.section_body),
    link: page.link
  }
}

const getPostBySlug = async (slug: string): Promise<Post> => {
  console.debug('Getting post with slug', slug)
  const response = await fetch(`https://content.gotripod.com/wp-json/wp/v2/posts?slug=${slug}`)
  const json = await response.json()
  const post = json[0]

  const tmUrl = `https://content.gotripod.com/wp-json/wp/v2/team_member/${post.acf.article_author.ID}`
  console.log(tmUrl)
  const teamMemberResponse = await fetch(tmUrl)
  const teamMemberJson = await teamMemberResponse.json()

  return {
    id: post.id,
    title: he.decode(post.title.rendered),
    content: post.content.rendered,
    date: post.date,
    slug: post.slug,
    teamMember: {
      name: teamMemberJson.title.rendered,
      position: teamMemberJson.acf.team_member_position,
      imageUrl: teamMemberJson.team_member_image[teamMemberJson.acf.team_member_image].guid
    }
  }
}

interface Params {
  categoryId?: number
  tagId?: number
  page?: number
}

const getPostsPage = async (
  params: Params = {}
): Promise<{
  posts: Post[]
  totalCount: number
  pageCount: number
}> => {
  const { categoryId, tagId, page } = params

  const url = `https://content.gotripod.com/wp-json/wp/v2/posts?per_page=18${page ? `&page=${page}` : ''}${
    categoryId ? `&categories=${categoryId}` : ''
  }${tagId ? `&tags=${tagId}` : ''}`

  console.debug('Fetching page of posts from ', url)

  const response = await fetch(url)
  const posts = await response.json()

  return {
    posts: posts.map((post) => ({
      id: post.id,
      title: he.decode(post.title.rendered),
      content: post.content.rendered,
      date: post.date,
      slug: post.slug
    })),
    totalCount: Number(response.headers.get('x-wp-total')),
    pageCount: Number(response.headers.get('x-wp-totalpages'))
  }
}

export {
  getCategoryBySlug,
  getTagBySlug,
  getTestimonial,
  getTestimonialById,
  getMediaById,
  getProjects,
  getProjectBySlug,
  getPostBySlug,
  getPostsPage,
  getPageBySlug
}
