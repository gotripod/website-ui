import NextLink from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

interface Props {
  href?: string
  link: string
  prefetch?: boolean
  className?: string
  children?: React.ReactNode
}

const Link = ({ prefetch, href, link, className, children }: Props) => {
  const router = useRouter()
  const isCurrentPage = router.pathname === link

  return (
    <NextLink prefetch={false} href={href ? href : link}>
      <a onClick={() => { }} aria-current={isCurrentPage ? 'page' : undefined} className={className}>
        {children}
      </a>
    </NextLink>
  )
}

export default Link
