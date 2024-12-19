'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const workExamples = [
  { title: "E-commerce Platform", description: "Developed a responsive e-commerce platform using Next.js and Stripe integration." },
  { title: "Social Media Dashboard", description: "Created a real-time dashboard for social media analytics using React and D3.js." },
  { title: "Mobile Banking App", description: "Led the frontend development of a mobile banking application using React Native." },
  { title: "AI-powered Chatbot", description: "Implemented an AI-powered chatbot interface using React and integrating with OpenAI's API." },
]

export default function WorkExamples({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="bg-white dark:bg-slate-800 rounded-lg p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto"
      >
        <h2 className="text-2xl font-bold mb-4 text-purple-600 dark:text-purple-400">Work Examples</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {workExamples.map((example, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{example.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{example.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
        <Button onClick={onClose} className="mt-6">Close</Button>
      </motion.div>
    </motion.div>
  )
}

