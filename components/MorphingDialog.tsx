'use client'

import { useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const MorphingDialog = ({ isOpen, setIsOpen, example }) => {
  const overlayRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => {
            if (e.target === overlayRef.current) setIsOpen(false)
          }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto"
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden w-full max-w-2xl"
            layoutId={`card-${example.title}`}
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: 0,
              transition: { 
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1]
              }
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.8,
              y: 50,
              transition: { 
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1]
              }
            }}
          >
            <div className="relative h-64 w-full">
              <Image src={example.image} alt={example.title} layout="fill" objectFit="cover" />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-200">{example.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{example.description}</p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-gray-600 dark:text-gray-400"
              >
                {example.extraInfo}
              </motion.p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-white bg-gray-800 dark:bg-white dark:text-gray-800 rounded-full p-2"
              aria-label="Close dialog"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default MorphingDialog

