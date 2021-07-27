import { GetStaticProps } from 'next'
import { getTestimonial, getProjects } from 'api'
import Column from 'components/column'
import Layout from 'components/layout'
import { ProjectListItem, Testimonial } from 'types'
import PageTitle from 'components/page-title'
import styled from 'styled-components'
import theme, { mqLess, breakpoints } from 'theme'
import Link from 'components/link'
import { ReactNode } from 'react'

interface Props {
  projects: ProjectListItem[]
  testimonial: Testimonial
}

const Index = ({ projects, testimonial }: Props): ReactNode => {
  return (
    <Layout testimonial={testimonial}>
      <Column>
        <PageTitle slim title="Work" subTitle="A selection of recent projects" />
        <Wrapper>
          {projects.map((project) => (
            <div key={project.id}>
              <ProjectItemLink href={`/work/${project.link}`} img={project.logoUrl} />
            </div>
          ))}
        </Wrapper>
      </Column>
    </Layout>
  )
}

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));

  margin: 0 0 ${theme.gutter * 4}px 0;

  div {
    padding: 13px;
    box-sizing: border-box;
  }

  ${mqLess(breakpoints.medium)} {
    display: block;

    div {
      flex-basis: 100%;
      max-width: 100%;
    }
  }
`

const ProjectItemLink = styled(Link)<{ img: string }>`
  background: url(${(props) => props.img});
  height: 260px;
  display: block;
  background-size: 355px 530px;
  background-repeat: no-repeat;
  ${theme.greyCardFlare}
  background-position: 0 top;

  &:hover {
    background-position: 0 bottom;
  }
`

export const getStaticProps: GetStaticProps = async () => {
  const testimonial = await getTestimonial()
  const projects = await getProjects()

  return {
    revalidate: 30,
    props: {
      testimonial,
      projects
    }
  }
}

export default Index
