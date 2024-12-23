'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa'
import { Button } from '@/components/ui/button'

const socialLinks = [
  { icon: FaGithub, href: 'https://github.com/yourusername', color: 'bg-gray-800' },
  { icon: FaLinkedin, href: 'https://linkedin.com/in/yourusername', color: 'bg-blue-600' },
  { icon: FaTwitter, href: 'https://twitter.com/yourusername', color: 'bg-sky-500' },
  { icon: FaEnvelope, href: 'mailto:your@email.com', color: 'bg-red-500' },
]

const Footer = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <footer className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-6xl font-bold mb-6 text-white" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Let's Connect!
            </h2>
            <p className="text-2xl text-white mb-8">
              Ready to create something awesome together? Reach out and let's make it happen!
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${link.color} p-3 rounded-full text-white text-2xl`}
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                >
                  <link.icon />
                </motion.a>
              ))}
            </div>
          </div>
          <div>
            <motion.div
              className="bg-white p-8 rounded-3xl shadow-2xl"
              initial={{ rotateY: 0 }}
              animate={{ rotateY: hoveredIndex !== null ? 180 : 0 }}
              transition={{ duration: 0.6 }}
            >
              {hoveredIndex === null ? (
                <div className="text-center">
                  <h3 className="text-4xl font-bold mb-4 text-purple-600">Want to know more?</h3>
                  <p className="text-xl mb-6 text-gray-600">Hover over a social icon to reveal a fun fact!</p>
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xl px-8 py-4 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
                    Say Hello!
                  </Button>
                </div>
              ) : (
                <div className="text-center transform rotate-y-180">
                  <h3 className="text-4xl font-bold mb-4 text-purple-600">Did you know?</h3>
                  <p className="text-xl mb-6 text-gray-600">
                    {[
                      "I once coded for 24 hours straight... fueled only by coffee and determination!",
                      "My first computer was a hand-me-down that could barely run Minesweeper.",
                      "I dream in JavaScript... literally. I've solved coding problems in my sleep!",
                      "I have a secret talent: I can type 120 words per minute... in binary."
                    ][hoveredIndex]}
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
        <div className="mt-16 text-center">
          <p className="text-xl text-white">
            © {new Date().getFullYear()} Hélio Sales Jr. | Crafted with ❤️ and a lot of ☕
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

