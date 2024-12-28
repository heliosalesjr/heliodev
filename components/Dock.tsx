'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useTheme } from 'next-themes'
import { Moon, Sun, Github, Linkedin } from 'lucide-react'

function useDockHoverAnimation(mouseX: MotionValue) {
  const ref = useRef<HTMLDivElement>(null)

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - (bounds.x + bounds.width / 2)
  })

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 50, 40])
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 })

  return { ref, width }
}

export function Dock({ isVisible }: { isVisible: boolean }) {
  const mouseX = useMotionValue(0)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="fixed inset-x-0 bottom-8 flex justify-center pointer-events-none">
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 100 }}
        transition={{ duration: 0.3 }}
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(0)}
        className="flex items-center gap-4 px-4 py-3 rounded-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg pointer-events-auto"
      >
        <DockIcon href="https://github.com/heliosalesjr" icon={Github} mouseX={mouseX} />
        <DockIcon href="https://www.linkedin.com/in/helio-sales/" icon={Linkedin} mouseX={mouseX} />
        <motion.div
          style={{ width: useDockHoverAnimation(mouseX).width }}
          className="aspect-square"
        >
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="w-full h-full rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center text-gray-900 dark:text-gray-100 hover:scale-110 transition-transform"
          >
            {mounted && (theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            ))}
          </button>
        </motion.div>
      </motion.div>
    </div>
  )
}

function DockIcon({ 
  href, 
  icon: Icon, 
  mouseX 
}: { 
  href: string
  icon: LucideIcon
  mouseX: MotionValue
}) {
  const { ref, width } = useDockHoverAnimation(mouseX)

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className="aspect-square"
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full h-full rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center text-gray-900 dark:text-gray-100 hover:scale-110 transition-transform"
      >
        <Icon className="h-5 w-5" />
      </a>
    </motion.div>
  )
}

