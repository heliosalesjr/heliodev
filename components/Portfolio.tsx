'use client'

import { useState, useEffect, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, RefObject } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaUser, FaBriefcase, FaGraduationCap, FaEnvelope } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import ContactForm from './ContactForm'
import Image from 'next/image'
import MorphingDialog from './MorphingDialog'

const menuItems = [
  { id: 'about', title: 'About Me', icon: FaUser },
  { id: 'work', title: 'Work', icon: FaBriefcase },
  { id: 'education', title: 'Education', icon: FaGraduationCap },
  { id: 'contact', title: 'Get in Touch', icon: FaEnvelope },
]


type PortfolioContent = {
  about: { title: string; description: string }[];
  work: { title: string; description: string }[];
  education: { title: string; description: string }[];
  contact: { title: string; description: string }[];
};


const content = {
  about: [
    { title: "Who I Am", description: "I am a React.js specialist with over 15 years of experience in tech, focusing on building scalable applications with React, Next.js, Node.js, and TailwindCSS. I’m passionate about creating seamless frontend experiences and enjoy working on design systems, optimizing workflows, and developing full-stack solutions with clean and effective code." },
    { title: "My Skills", description: "In addition to the frontend development stacks I've mentioned, I have experience with SQL for database management, AWS for cloud services, and implementing agile practices like Scrum to ensure smooth project delivery. Over the years, I’ve also gained familiarity with authentication systems, CI/CD pipelines, and other backend technologies." },
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
    { title: "LinkedIn", description: "https://www.linkedin.com/in/helio-sales/" },
  ],
}

const workExamples = [
  { 
    title: "E-commerce Platform", 
    description: "A fully responsive online store with advanced filtering and search capabilities.", 
    image: "/placeholder.jpg",
    extraInfo: "This project involved integrating multiple payment gateways, implementing a robust inventory management system, and optimizing for mobile devices."
  },
  { 
    title: "Social Media Dashboard", 
    description: "Real-time analytics dashboard for social media performance tracking.", 
    image: "/placeholder.jpg",
    extraInfo: "The dashboard uses WebSocket connections to provide live updates and includes customizable widgets for different social media platforms."
  },
  
]

interface WorkExample {
  title: string;
  description: string;
  image: string;
  extraInfo: string;
}

interface PortfolioProps {
  changelogRef?: RefObject<HTMLDivElement | null>;
}

interface ContentItem {
  title: string;
  description: string;
}

interface Content {
  about: ContentItem[];
  work: ContentItem[];
  education: ContentItem[];
  contact: ContentItem[];
}



const WorkCard = ({ example, onClick }: { example: WorkExample; onClick: () => void }) => (
  <Card 
    className="bg-white/80 dark:bg-gray-700/80 border-cyan-200 dark:border-fuchsia-200 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer overflow-hidden"
    onClick={onClick}
  >
    <div className="relative h-48 w-full">
      <Image src={example.image} alt={example.title} layout="fill" objectFit="cover" />
    </div>
    <CardHeader>
      <CardTitle className="text-2xl text-gray-800 dark:text-gray-200">{example.title}</CardTitle>
    </CardHeader>
    <CardContent>
      <CardDescription className="text-lg text-gray-600 dark:text-gray-300">{example.description}</CardDescription>
    </CardContent>
  </Card>
)

const Portfolio = ({ changelogRef }: PortfolioProps) => {
  const [activeItem, setActiveItem] = useState<keyof PortfolioContent>("about");
  const [showWorkExamples, setShowWorkExamples] = useState(false)
  const [showContactForm, setShowContactForm] = useState(false)
  const [openDialog, setOpenDialog] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSetActiveItem = (item: string) => {
    if (['about', 'work', 'education', 'contact'].includes(item)) {
      setActiveItem(item as keyof PortfolioContent);
    }
    if (item !== 'contact') {
      setShowContactForm(false);
    }
  };

  if (!mounted) {
    return null
  }

  return (
    <div ref={changelogRef}>
    <AnimatePresence mode="wait">
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
                transition={{ duration: 0.5 }}
                className="mt-12"
              >
                {!showWorkExamples ? (
                  <Button
                    onClick={() => setShowWorkExamples(true)}
                    className="bg-cyan-500 hover:bg-cyan-600 dark:bg-fuchsia-500 dark:hover:bg-fuchsia-600 text-white text-xl px-8 py-6 rounded-xl shadow-lg"
                  >
                    More
                  </Button>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 1.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                  >
                    <motion.div
                      className="grid gap-8 md:grid-cols-2"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1.5, delay: 0.2, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                      {workExamples.map((example, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 1, delay: index * 0.2 }}
                        >
                          <WorkCard
                            example={example}
                            onClick={() => setOpenDialog(example.title)}
                          />
                        </motion.div>
                      ))}
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1, delay: 1 }}
                      className="mt-12 flex justify-center md:justify-start"
                    >
                      <Button
                        onClick={() => setShowWorkExamples(false)}
                        className="bg-cyan-500 hover:bg-cyan-600 dark:bg-fuchsia-500 dark:hover:bg-fuchsia-600 text-white text-xl px-8 py-6 rounded-xl shadow-lg"
                      >
                        Less
                      </Button>
                    </motion.div>
                  </motion.div>
                )}
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
          {showContactForm && (
            <ContactForm onClose={() => setShowContactForm(false)} />
          )}
        </AnimatePresence>
        {openDialog && (
          <MorphingDialog
            isOpen={!!openDialog}
            setIsOpen={(isOpen) => setOpenDialog(isOpen ? openDialog : null)}
            example={workExamples.find(ex => ex.title === openDialog) || { image: '', title: '', description: '', extraInfo: '' }}
          />
        )}
      </div>
    </AnimatePresence>
    </div>
  )
}

export default Portfolio