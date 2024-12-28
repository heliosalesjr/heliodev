'use client'

import { useRef } from 'react'
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
  const { theme } = useTheme()

  const handleScrollToPortfolio = () => {
    portfolioRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-mesh-dark' : 'bg-mesh-light'}`}>
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
                <ChevronDown className="h-8 w-8" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
      <motion.div
        ref={portfolioRef}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="min-h-screen flex items-center justify-center"
      >
        <div className="w-full max-w-7xl mx-auto p-4">
          <Portfolio />
        </div>
      </motion.div>
      <Changelog />
      <Footer />
      <Dock />
    </div>
  )
}

