//#region imports
import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'
import styled from 'styled-components'
import { getProjectBySlug, getProjects } from 'api'
import MediaImage from 'components/media-image'
import theme, { breakpoints, mqLess, px2rem } from 'theme'
import { Project } from 'types'
import Renderer from 'components/blocks/renderer'
import Layout from 'components/layout'
import Column from 'components/column'
//#endregion

//#region component
interface Props {
  project: Project
}

const SinglePostPage = ({ project }: Props): React.ReactElement => (
  <Layout>
    <Column>
      <StyledMediaImage media={project.heroMedia} />
      <Content>
        {project.blocks.map((block, i) => (
          <Renderer key={i} block={block} />
        ))}
      </Content>
    </Column>
  </Layout>
)

export default SinglePostPage
//#endregion

//#region styles
const StyledMediaImage = styled(MediaImage)`
  width: 100%;
  margin: -${px2rem(theme.gutter * 4)} 0 0 0;
  position: relative;
  z-index: 1;
  display: block;
`

const Content = styled.div`
  background-color: #fff;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.1);
  padding: ${px2rem(theme.gutter * 6)} ${px2rem(theme.gutter * 8)};

  ${mqLess(breakpoints.medium)} {
    padding: ${px2rem(theme.gutter)} ${px2rem(theme.gutter * 2)};
  }
`

//#endregion

//#region data

export const getStaticProps: GetStaticProps = async (context) => {
  const project = await getProjectBySlug(
    Array.isArray(context.params.slug) ? context.params.slug[0] : context.params.slug
  )
  return {
    revalidate: 30,
    props: {
      project
    }
  }
}

// This function gets called at BUILD time
export const getStaticPaths: GetStaticPaths = async () => {
  const projects = await getProjects()

  // Get the paths we want to pre-render
  const paths = projects.map((post) => ({
    params: { slug: post.link }
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

//#endregion
