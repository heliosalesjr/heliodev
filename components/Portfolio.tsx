'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaUser, FaBriefcase, FaGraduationCap, FaEnvelope } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import WorkExamples from './WorkExamples'
import ContactForm from './ContactForm'

const menuItems = [
  { id: 'about', title: 'About Me', icon: FaUser },
  { id: 'work', title: 'Work', icon: FaBriefcase },
  { id: 'education', title: 'Education', icon: FaGraduationCap },
  { id: 'contact', title: 'Get in Touch', icon: FaEnvelope },
]

const content = {
  about: [
    { title: "Who I Am", description: "I'm a passionate Frontend Engineer with a love for creating beautiful and functional web experiences." },
    { title: "My Skills", description: "Proficient in React, Next.js, TypeScript, and modern CSS frameworks." },
  ],
  work: [
    { title: "Senior Frontend Developer", description: "Led the development of a large-scale web application using React and GraphQL." },
    { title: "UI/UX Designer", description: "Designed and implemented user interfaces for various client projects." },
  ],
  education: [
    { title: "Computer Science Degree", description: "Graduated with honors from a top university." },
    { title: "Online Courses", description: "Continuously updating skills through platforms like Coursera and Udemy." },
  ],
  contact: [
    { title: "Email", description: "hello@heliosalesjr.com" },
    { title: "LinkedIn", description: "linkedin.com/in/heliosalesjr" },
  ],
}

export default function Portfolio() {
  const [activeItem, setActiveItem] = useState('about')
  const [showWorkExamples, setShowWorkExamples] = useState(false)
  const [showContactForm, setShowContactForm] = useState(false)

  const handleSetActiveItem = (item: string) => {
    setActiveItem(item)
    if (item !== 'contact') {
      setShowContactForm(false)
    }
    if (item !== 'work') {
      setShowWorkExamples(false)
    }
  }

  return (
    <div className="flex flex-col bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border-4 border-cyan-400 dark:border-fuchsia-400">
      <div className="flex flex-col md:flex-row">
        <motion.nav
          className="w-full md:w-72 bg-gray-100 dark:bg-gray-900 p-8"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ul className="flex md:flex-col space-x-4 md:space-x-0 md:space-y-6 overflow-x-auto md:overflow-x-visible">
            {menuItems.map((item) => (
              <motion.li
                key={item.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  onClick={() => handleSetActiveItem(item.id)}
                  className={`w-full text-left py-4 px-6 rounded-xl transition-all flex items-center text-xl ${
                    activeItem === item.id
                      ? 'bg-cyan-500 dark:bg-fuchsia-500 text-white shadow-lg'
                      : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  <item.icon className="mr-3 text-2xl" />
                  {item.title}
                </button>
              </motion.li>
            ))}
          </ul>
        </motion.nav>
        <motion.div
          className="flex-1 p-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.h2
            className="text-6xl font-bold mb-12 text-gray-800 dark:text-gray-200"
            key={activeItem}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            {menuItems.find((item) => item.id === activeItem)?.title}
          </motion.h2>
          <motion.div
            className="grid gap-8 md:grid-cols-2"
            key={`${activeItem}-content`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {content[activeItem].map((item, index) => (
              <Card key={index} className="bg-white/80 dark:bg-gray-700/80 border-cyan-200 dark:border-fuchsia-200 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-800 dark:text-gray-200">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-lg text-gray-600 dark:text-gray-300">{item.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </motion.div>
          {activeItem === 'work' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12"
            >
              <Button
                onClick={() => setShowWorkExamples(true)}
                className="bg-cyan-500 hover:bg-cyan-600 dark:bg-fuchsia-500 dark:hover:bg-fuchsia-600 text-white text-xl px-8 py-6 rounded-xl shadow-lg"
              >
                More
              </Button>
            </motion.div>
          )}
          {activeItem === 'contact' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12"
            >
              <Button
                onClick={() => setShowContactForm(true)}
                className="bg-cyan-500 hover:bg-cyan-600 dark:bg-fuchsia-500 dark:hover:bg-fuchsia-600 text-white text-xl px-8 py-6 rounded-xl shadow-lg"
              >
                Message Me
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
      <AnimatePresence>
        {showWorkExamples && (
          <WorkExamples onClose={() => setShowWorkExamples(false)} />
        )}
        {showContactForm && (
          <ContactForm onClose={() => setShowContactForm(false)} />
        )}
      </AnimatePresence>
    </div>
  )
}

