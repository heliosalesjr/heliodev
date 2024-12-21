'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaUser, FaBriefcase, FaGraduationCap, FaEnvelope } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import WorkExamples from './WorkExamples'
import ContactForm from './ContactForm'
import Changelog from './Changelog'

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
    <div className="flex flex-col bg-white dark:bg-slate-800 rounded-lg shadow-xl overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <motion.nav
          className="w-full md:w-64 bg-slate-100 dark:bg-slate-700 p-6"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ul className="flex md:flex-col space-x-4 md:space-x-0 md:space-y-4 overflow-x-auto md:overflow-x-visible">
            {menuItems.map((item) => (
              <motion.li
                key={item.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  onClick={() => handleSetActiveItem(item.id)}
                  className={`w-full text-left py-2 px-4 rounded transition-colors flex items-center ${
                    activeItem === item.id
                      ? 'bg-purple-600 text-white'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600'
                  }`}
                >
                  <item.icon className="mr-2" />
                  {item.title}
                </button>
              </motion.li>
            ))}
          </ul>
        </motion.nav>
        <motion.div
          className="flex-1 p-8 bg-white dark:bg-slate-800 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.h2
            className="text-3xl font-bold mb-6 text-purple-600 dark:text-purple-400"
            key={activeItem}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {menuItems.find((item) => item.id === activeItem)?.title}
          </motion.h2>
          <motion.div
            className="grid gap-6 md:grid-cols-2"
            key={`${activeItem}-content`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {content[activeItem].map((item, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{item.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </motion.div>
          {activeItem === 'work' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8"
            >
              <Button onClick={() => setShowWorkExamples(true)}>More</Button>
            </motion.div>
          )}
          {activeItem === 'contact' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8"
            >
              <Button onClick={() => setShowContactForm(true)}>Message Me</Button>
            </motion.div>
          )}
        </motion.div>
      </div>
      <Changelog />
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


