'use client'

import { useTheme } from 'next-themes'
import { ReactNode } from 'react'

interface ThemeWrapperProps {
  children: (theme: string | undefined) => ReactNode
}

export default function ThemeWrapper({ children }: ThemeWrapperProps) {
  const { theme } = useTheme()
  return <>{children(theme)}</>
}

