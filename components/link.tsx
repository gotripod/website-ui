import NextLink from 'next/link'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'
import styled from 'styled-components'
import theme from 'theme'

interface Props {
  href: string
  prefetch?: boolean
  className?: string
  children?: React.ReactNode
  target?: string
}

const Link = ({ prefetch = false, href, className, children, target }: Props): ReactElement => {
  const router = useRouter()
  const isCurrentPage = router.asPath === href

  return (
    <NextLink prefetch={prefetch} href={href}>
      <a className={className} aria-current={isCurrentPage ? 'page' : undefined} target={target}>
        {children}
      </a>
    </NextLink>
  )
}

export const BlueLink = styled(Link)`
  color: ${theme.colours.linkBlue};
  text-decoration: underline;
  &:visited {
    color: ${theme.colours.linkBlue};
  }
`

export default Link
