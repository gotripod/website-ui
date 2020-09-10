import React, { ReactElement } from 'react'
import styled from 'styled-components'
import { LinkButton } from '../button'
import { Pagination as PaginationType } from 'types'

const newerLink = (pagination: PaginationType) => {
  const { currentPage, totalItems, pageCount } = pagination

  return `/insights/page/${currentPage - 1}`
}

const olderLink = (pagination: PaginationType) => {
  const { currentPage, totalItems, pageCount } = pagination

  return `/insights/page/${currentPage ? currentPage + 1 : 2}`
}

const Pagination = (props: PaginationType): ReactElement => {
  const { currentPage } = props
  return (
    <Container>
      {/* If there's a next page, render this link */}
      {<SLinkButton link={olderLink(props)}>← Older posts</SLinkButton>}

      {/* If there's a previous page, render this link */}
      {currentPage ? <SLinkButton link={newerLink(props)}>Newer posts →</SLinkButton> : null}
    </Container>
  )
}

export default Pagination

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`

const SLinkButton = styled(LinkButton)`
  color: white !important;
  display: inline-block;
  margin: 13px 0;
  padding: 13px;
`
