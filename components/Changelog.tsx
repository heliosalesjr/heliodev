'use client'

import { useEffect, useRef } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'

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
  const isInView = useInView(ref, { once: false, margin: "-50px 0px" })
  const controls = useAnimation()

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
        hidden: { opacity: 0.5, y: 20, scale: 0.95 },
        visible: { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          transition: { duration: 0.5, delay: index * 0.1 } 
        },
      }}
      className="flex items-center mb-12"
    >
      <div className="w-1/3 pr-4 text-right">
        <motion.h3
          variants={{
            hidden: { opacity: 0.5, scale: 0.9 },
            visible: { opacity: 1, scale: 1 },
          }}
          className="text-xl font-semibold text-purple-600 dark:text-purple-400"
        >
          {item.period}
        </motion.h3>
      </div>
      <div className="w-1/6 flex justify-center relative">
        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0.5 },
            visible: { opacity: 1, scale: 1 },
          }}
          className="w-4 h-4 rounded-full bg-green-500 z-10"
        />
        {index < changelogData.length - 1 && (
          <motion.div
            variants={{
              hidden: { height: 0 },
              visible: { height: '100%', transition: { duration: 0.5 } },
            }}
            className="absolute top-4 left-1/2 transform -translate-x-1/2 w-0.5 bg-green-500"
            style={{ height: 'calc(100% + 3rem)' }}
          />
        )}
      </div>
      <div className="w-1/2 pl-4">
        <motion.p
          variants={{
            hidden: { opacity: 0.5, scale: 0.9 },
            visible: { opacity: 1, scale: 1 },
          }}
          className="text-lg text-slate-700 dark:text-slate-300"
        >
          {item.description}
        </motion.p>
      </div>
    </motion.div>
  )
}

const Changelog = () => {
  return (
    <div className="py-16 px-4 max-w-3xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-12 text-purple-600 dark:text-purple-400">My Journey</h2>
      <div className="relative">
        {changelogData.map((item, index) => (
          <ChangelogItem key={index} item={item} index={index} />
        ))}
      </div>
    </div>
  )
}

export default Changelog



