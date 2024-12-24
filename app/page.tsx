'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Portfolio from '@/components/Portfolio'
import Changelog from '@/components/Changelog'
import Footer from '@/components/Footer'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import Image from 'next/image'

export default function Page() {
  const [showContent, setShowContent] = useState(false)
  const controls = useAnimation()
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const loopAnimation = async () => {
      await controls.start({ 
        y: [0, -20, 0], 
        scale: [1, 1.05, 1],
        transition: { 
          duration: 2, 
          repeat: Infinity,
          ease: "easeInOut"
        } 
      })
    }
    loopAnimation()
  }, [controls])

  const handleHelloClick = () => {
    setShowContent(true)
    setTimeout(() => {
      contentRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-fuchsia-900 via-violet-900 to-cyan-900">
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 right-4 z-50"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        {mounted && (theme === 'dark' ? (
          <Sun className="h-[1.2rem] w-[1.2rem]" />
        ) : (
          <Moon className="h-[1.2rem] w-[1.2rem]" />
        ))}
      </Button>
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
              className="text-4xl md:text-6xl font-bold text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Frontend Engineer
            </motion.h2>
            <motion.div animate={controls}>
              <Button
                onClick={handleHelloClick}
                className="mt-8 bg-gradient-to-r from-cyan-400 to-fuchsia-500 hover:from-cyan-500 hover:to-fuchsia-600 text-white text-2xl px-12 py-8 rounded-2xl shadow-lg shadow-fuchsia-500/50 transform transition-all hover:scale-105"
              >
                Hello
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
      {showContent && (
        <motion.div
          ref={contentRef}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full"
        >
          <div className="w-full max-w-7xl mx-auto p-4">
            <Portfolio />
          </div>
          <Changelog />
        </motion.div>
      )}
      <Footer />
    </div>
  )
}

