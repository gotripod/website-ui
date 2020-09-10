import NextLink from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

interface Props {
  href?: string
  link: string
  className?: string
  children?: React.ReactNode
}

const Link = ({ href, link, className, children }: Props) => {
  const router = useRouter()
  const isCurrentPage = router.pathname === link

  return (
    <NextLink href={href ? href : link} as={href ? link : null}>
      <a onClick={() => {}} aria-current={isCurrentPage ? 'page' : undefined} className={className}>
        {children}
      </a>
    </NextLink>
  )
}

export default Link
