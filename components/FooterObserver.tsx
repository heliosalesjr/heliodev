'use client'

import { useEffect, RefObject } from 'react'

interface FooterObserverProps {
  footerRef: RefObject<HTMLDivElement>
  setIsDockVisible: (isVisible: boolean) => void
}

export default function FooterObserver({ footerRef, setIsDockVisible }: FooterObserverProps) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsDockVisible(!entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    if (footerRef.current) {
      observer.observe(footerRef.current)
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current)
      }
    }
  }, [footerRef, setIsDockVisible])

  return null
}

