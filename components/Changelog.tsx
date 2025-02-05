'use client'

import { useEffect, useRef } from 'react'
import { motion, useAnimation, useInView, useScroll } from 'framer-motion'
import { useTheme } from 'next-themes'

type ChangelogItem = {
  period: string
  description: string
}

const changelogData: ChangelogItem[] = [
  { period: "2009", description: "Completed a web design course and began my professional journey as a freelance developer, creating interactive websites using Flash." },
  { period: "2010 - 2013", description: "Secured my first professional role, developing websites for the Rio de Janeiro city government and contributing to the creation of \"Pé de Vento,\" Brazil's first digital literacy course." },
  { period: "2017", description: "Worked as a freelancer for the Colombian NGO \"Fundación Capital,\" collaborating with American developers to create the EduChef app." },
  { period: "2013 - 2019", description: "Took on my biggest challenge at the startup Edufuturo, where I built an educational platform for children from the ground up. This included developing hundreds of JavaScript games and creating comprehensive dashboards for teachers and parents." },
  { period: "2019 - 2020", description: "Worked with the United Nations on the SocialProtection.org platform, contributing to a global initiative supporting social protection systems." },
  { period: "2020 - Currently", description: "2020 - Present – Currently leading the team responsible for the digital layer of content at BEĨ Educação, an edtech from São Paulo, with a strong focus on frontend development." },
  
]

const ChangelogItem = ({ item }: { item: ChangelogItem; index: number }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: "-100px" })
  const controls = useAnimation()
  const { theme } = useTheme()

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
      className="mb-32 relative"
    >
      <div className="flex items-start gap-8">
        <motion.div
          variants={{
            hidden: { scale: 0.8, opacity: 0 },
            visible: { scale: 1, opacity: 1 }
          }}
          className="relative"
        >
          <div className={`w-8 h-8 rounded-full ${theme === 'dark' ? 'bg-fuchsia-500' : 'bg-cyan-500'} z-10 relative`} />
        </motion.div>
        
        <div className="flex-1">
          <motion.h3
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            className={`text-7xl font-bold mb-4 ${theme === 'dark' ? 'text-cyan-400' : 'text-fuchsia-500'}`}
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            {item.period}
          </motion.h3>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            className={`text-3xl font-light ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}
          >
            {item.description}
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

const Changelog = () => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })
  const { theme } = useTheme()

  return (
    <div className={`py-32 px-4 ${theme === 'dark' ? 'bg-gradient-to-b from-violet-900 to-indigo-950' : 'bg-gradient-to-b from-gray-100 to-white'}`} ref={containerRef}>
      <div className="max-w-3xl mx-auto relative">
        <h2 className={`text-8xl font-bold text-center mb-24 ${theme === 'dark' ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500' : 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500'}`} style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
          My Journey
        </h2>
        <div className="relative">
          <motion.div 
            className={`absolute left-[15px] top-0 w-[2px] origin-top ${theme === 'dark' ? 'bg-fuchsia-500' : 'bg-cyan-500'}`}
            style={{ 
              scaleY: scrollYProgress,
              height: '100%'
            }}
          />
          {changelogData.map((item, index) => (
            <ChangelogItem key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Changelog

