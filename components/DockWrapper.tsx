'use client'

import { useState, useEffect, RefObject } from 'react'
import dynamic from 'next/dynamic'

// Carregamento dinâmico do Dock com fallback
const Dock = dynamic(() => import('@/components/Dock').then((mod) => mod.default), { 
  ssr: false,
  loading: () => <div>Carregando Dock...</div>
})

// Carregamento dinâmico do FooterObserver com fallback
const FooterObserver = dynamic(() => import('@/components/FooterObserver'), { 
  ssr: false,
  loading: () => null
})

// Tipagem das propriedades do DockWrapper
interface DockWrapperProps {
  footerRef: RefObject<HTMLDivElement>;
}

export default function DockWrapper({ footerRef }: DockWrapperProps) {
  // Estado para controlar a visibilidade do Dock
  const [isDockVisible, setIsDockVisible] = useState(false)

  useEffect(() => {
    setIsDockVisible(true) // Habilita a visibilidade do Dock após a renderização inicial
  }, [])

  return (
    <>
      {/* Passando setIsDockVisible para o FooterObserver */}
      <FooterObserver footerRef={footerRef} setIsDockVisible={setIsDockVisible} />
      {isDockVisible && <Dock isVisible={false} />} {/* Exibe o Dock quando isDockVisible for true */}
    </>
  )
}


