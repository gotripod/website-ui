import { GetStaticProps } from 'next'
import { getTestimonials, getProjects } from '../../api'
import Column from '../../components/column'
import Layout from '../../components/layout'
import { ProjectListItem, Testimonial } from '../../types'
import PageTitle from '../../components/page-title'
import { ProjectItemLink, Wrapper } from './index.styles'

interface Props {
  projects: ProjectListItem[]
  testimonial: Testimonial
}

const Index = ({ projects, testimonial }: Props) => {
  return (
    <Layout testimonial={testimonial}>
      <Column>
        <PageTitle slim title="Work" subTitle="A selection of recent projects" />
        <Wrapper>
          {projects.map((project) => (
            <div key={project.id}>
              <ProjectItemLink
                href="/work/[slug]"
                link={`/work/${project.link}`}
                img={project.logoUrl}
              />
            </div>
          ))}
        </Wrapper>
      </Column>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const testimonial = await getTestimonials()
  const projects = await getProjects()

  return {
    revalidate: true,
    props: {
      testimonial,
      projects
    }
  }
}

export default Index
