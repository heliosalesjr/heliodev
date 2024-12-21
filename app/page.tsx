'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Portfolio from '@/components/Portfolio'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'

export default function Page() {
  const [showPortfolio, setShowPortfolio] = useState(false)
  const controls = useAnimation()
  const { theme, setTheme } = useTheme()
  const portfolioRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loopAnimation = async () => {
      await controls.start({ y: [0, -10, 0], transition: { duration: 2, repeat: Infinity } })
    }
    loopAnimation()
  }, [controls])

  const handleHelloClick = () => {
    setShowPortfolio(true)
    setTimeout(() => {
      portfolioRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-300 dark:from-slate-800 dark:to-slate-950">
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 right-4 z-50"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        {theme === 'dark' ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
      </Button>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="flex flex-col items-center gap-8 text-center"
        >
          <motion.h1
            className="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Hélio Sales Jr.
          </motion.h1>
          <motion.h2
            className="text-3xl text-green-600 dark:text-green-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Frontend Engineer
          </motion.h2>
          <motion.div animate={controls}>
            <Button
              onClick={handleHelloClick}
              className="mt-8 bg-purple-600 hover:bg-purple-700 text-white text-lg px-8 py-6 rounded-full"
            >
              Hello
            </Button>
          </motion.div>
        </motion.div>
      </div>
      {showPortfolio && (
        <motion.div
          ref={portfolioRef}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full min-h-screen flex items-center justify-center p-4"
        >
          <div className="w-full max-w-6xl">
            <Portfolio />
          </div>
        </motion.div>
      )}
    </div>
  )
}



