'use client'

import { useEffect, useRef } from 'react'
import { motion, useAnimation, useInView, useScroll } from 'framer-motion'

type ChangelogItem = {
  period: string
  description: string
}

const changelogData: ChangelogItem[] = [
  { period: "Currently", description: "Working as a full stack developer at an educational company" },
  { period: "2020 - 2024", description: "Led frontend development for a major e-commerce platform" },
  { period: "2018 - 2020", description: "Freelance web developer, specializing in React applications" },
  { period: "2015 - 2018", description: "Junior developer at a tech startup, focusing on mobile apps" },
  { period: "2012 - 2015", description: "Completed Computer Science degree, internships in web development" },
  { period: "2010", description: "Started learning programming, built first website" },
]

const ChangelogItem = ({ item, index }: { item: ChangelogItem; index: number }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: "-100px" })
  const controls = useAnimation()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"]
  })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [isInView, controls])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0.3 },
        visible: { 
          opacity: 1,
          transition: { duration: 0.6, ease: "easeOut" } 
        },
      }}
      className="mb-32"
    >
      <div className="flex items-start gap-8">
        <motion.div
          variants={{
            hidden: { scale: 0.8, opacity: 0 },
            visible: { scale: 1, opacity: 1 }
          }}
          className="relative"
        >
          <div className="w-8 h-8 rounded-full bg-fuchsia-500 z-10 relative" />
          {index < changelogData.length - 1 && (
            <motion.div
              style={{ height: scrollYProgress }}
              className="absolute top-8 left-1/2 -translate-x-1/2 w-1 bg-fuchsia-500 origin-top"
            />
          )}
        </motion.div>
        
        <div className="flex-1">
          <motion.h3
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            className="text-7xl font-bold text-cyan-400 mb-4"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            {item.period}
          </motion.h3>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            className="text-3xl font-light text-white"
          >
            {item.description}
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

const Changelog = () => {
  return (
    <div className="py-32 px-4 bg-gradient-to-b from-violet-900 to-indigo-950">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-8xl font-bold text-center mb-24 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
          My Journey
        </h2>
        {changelogData.map((item, index) => (
          <ChangelogItem key={index} item={item} index={index} />
        ))}
      </div>
    </div>
  )
}

export default Changelog

