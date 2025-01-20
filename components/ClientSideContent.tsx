'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

const Dock = dynamic(() => import('@/components/Dock').then((mod) => mod.default), { ssr: false })

export default function ClientSideContent() {
  const [isDockVisible, setIsDockVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      setIsDockVisible(scrollPosition + windowHeight < documentHeight - 100)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Call once to set initial state

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return isDockVisible ? <Dock /> : null
}

