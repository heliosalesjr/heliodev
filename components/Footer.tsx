'use client'

import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import { useTheme } from 'next-themes'

const socialLinks = [
  { icon: FaGithub, href: 'https://github.com/heliosalesjr', color: 'hover:text-purple-600' },
  { icon: FaLinkedin, href: 'https://www.linkedin.com/in/helio-sales/', color: 'hover:text-blue-600' },
  { icon: FaEnvelope, href: 'mailto:heliodevreact@gmail.com', color: 'hover:text-green-600' },
]

const Footer = () => {
  const { theme } = useTheme()

  return (
    <footer className={`py-20 px-4 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-7xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            Let&apos;s Connect
          </h2>
          <p className={`text-3xl mb-12 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            Ready to create something awesome together?
          </p>
          <div className="flex space-x-8 mb-12">
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-4xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} ${link.color} transition-colors duration-300`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <link.icon />
              </motion.a>
            ))}
          </div>
          <motion.button
            className={`text-2xl px-8 py-3 rounded-full ${theme === 'dark' ? 'bg-fuchsia-500 hover:bg-fuchsia-600' : 'bg-cyan-500 hover:bg-cyan-600'} text-white transition-colors duration-300`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Say Hello!
          </motion.button>
        </div>
        <div className="mt-16 text-center">
          <p className={`text-xl ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            © {new Date().getFullYear()} Hélio Sales Jr. | Crafted with ❤️ (and some ☕)
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

