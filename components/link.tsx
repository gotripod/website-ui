import NextLink from 'next/link'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'

interface Props {
  href: string
  prefetch?: boolean
  className?: string
  children?: React.ReactNode
}

const Link = ({ prefetch = false, href, className, children }: Props): ReactElement => {
  const router = useRouter()
  const isCurrentPage = router.asPath === href

  return (
    <NextLink prefetch={prefetch} href={href}>
      <a className={className} aria-current={isCurrentPage ? 'page' : undefined}>
        {children}
      </a>
    </NextLink>
  )
}

export default Link
