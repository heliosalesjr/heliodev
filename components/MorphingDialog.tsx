'use client'

import { useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X } from 'lucide-react'
import { createPortal } from 'react-dom'

const MorphingDialog = ({ isOpen, setIsOpen, example }) => {
  const dialogRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, setIsOpen])

  const handleClose = () => {
    setIsOpen(false)
  }

  if (typeof window === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            ref={dialogRef}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden w-full max-w-2xl max-h-[90vh] flex flex-col"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              transition: { 
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1]
              }
            }}
            exit={{ 
              scale: 0.9, 
              opacity: 0,
              transition: { 
                duration: 0.2,
                ease: [0.16, 1, 0.3, 1]
              }
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="overflow-y-auto flex-grow">
              <div className="relative h-48 sm:h-64 w-full">
                <Image src={example.image} alt={example.title} layout="fill" objectFit="cover" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-200">{example.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{example.description}</p>
                <p className="text-gray-600 dark:text-gray-400">{example.extraInfo}</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-white/50 dark:bg-gray-800/50 rounded-full backdrop-blur-sm transition-colors"
              aria-label="Close dialog"
            >
              <X size={24} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

export default MorphingDialog

