'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Portfolio from '@/components/Portfolio'
import Changelog from '@/components/Changelog'
import Footer from '@/components/Footer'
import Image from 'next/image'
import { Dock } from '@/components/Dock'
import { ChevronDown } from 'lucide-react'
import { useTheme } from 'next-themes'

export default function Page() {
  const controls = useAnimation()
  const portfolioRef = useRef<HTMLDivElement>(null)
  const changelogRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const [isDockVisible, setIsDockVisible] = useState(true)

  const handleScrollToPortfolio = () => {
    portfolioRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

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
  }, [])

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} transition-colors duration-300`}>
      <div className="relative z-10">
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="flex flex-col md:flex-row items-center md:items-start gap-12 text-center md:text-left"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="relative w-64 h-64 md:w-96 md:h-96 overflow-hidden rounded-3xl border-8 border-cyan-400 shadow-2xl shadow-cyan-500/50"
            >
              <Image
                src="/me.png"
                alt="Hélio Sales Jr."
                layout="fill"
                objectFit="cover"
                className="rounded-2xl"
              />
            </motion.div>
            <div className="flex flex-col items-center md:items-start gap-8">
              <motion.h1
                className="text-7xl md:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Hélio Sales Jr.
              </motion.h1>
              <motion.h2
                className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-gray-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Frontend Engineer
              </motion.h2>
              <motion.div animate={controls}>
                <Button
                  onClick={handleScrollToPortfolio}
                  className="mt-8 bg-cyan-500 hover:bg-cyan-600 dark:bg-fuchsia-500 dark:hover:bg-fuchsia-600 text-white text-2xl px-12 py-8 rounded-2xl shadow-lg transition-all hover:scale-105"
                >
                  <p>More</p>
                  <ChevronDown className="h-8 w-8" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
        <div ref={portfolioRef} className="min-h-screen flex items-center justify-center relative">
          <div className="w-full max-w-7xl mx-auto p-8 relative">
            {/* Seta para cima */}
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className={`absolute -top-8 left-1/2 transform -translate-x-1/2 bg-cyan-500 hover:bg-cyan-600 dark:bg-fuchsia-500 dark:hover:bg-fuchsia-600 text-white text-2xl px-4 py-2 rounded-full shadow-lg transition-all hover:scale-105`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Scroll to top"
            >
              <ChevronDown className="h-8 w-8 rotate-180" />
            </motion.button>

            {/* Portfolio Component */}
            <Portfolio changelogRef={changelogRef} />

            {/* Seta para baixo */}
            <motion.button
              onClick={() =>
                changelogRef?.current?.scrollIntoView({ behavior: "smooth" })
              }
              className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-cyan-500 hover:bg-cyan-600 dark:bg-fuchsia-500 dark:hover:bg-fuchsia-600 text-white text-2xl px-4 py-2 rounded-full shadow-lg transition-all hover:scale-105`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Scroll to next section"
            >
              <ChevronDown className="h-8 w-8" />
            </motion.button>
          </div>
        </div>
        <div ref={changelogRef}>
          <Changelog />
        </div>
        <div ref={footerRef}>
          <Footer />
        </div>
        <Dock isVisible={isDockVisible} />
      </div>
    </div>
  )
}
