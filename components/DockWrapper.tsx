'use client'

import { useState, useEffect, RefObject } from 'react'
import dynamic from 'next/dynamic'

const Dock = dynamic(() => import('@/components/Dock'), { 
  ssr: false,
  loading: () => <div>Carregando Dock...</div>
})
const FooterObserver = dynamic(() => import('@/components/FooterObserver'), { 
  ssr: false,
  loading: () => null
})

interface DockWrapperProps {
  footerRef: RefObject<HTMLDivElement>
}

export default function DockWrapper({ footerRef }: DockWrapperProps) {
  const [isDockVisible, setIsDockVisible] = useState(false)

  useEffect(() => {
    setIsDockVisible(true)
  }, [])

  return (
    <>
      <FooterObserver footerRef={footerRef} setIsDockVisible={setIsDockVisible} />
      {isDockVisible && <Dock />}
    </>
  )
}


