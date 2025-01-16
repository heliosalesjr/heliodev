import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useTheme } from 'next-themes'

// Dynamically import react-p5 with SSR disabled
const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
  ssr: false,
  loading: () => <div>Loading...</div>, // Optional loading component
})

interface P5BackgroundProps {
  className?: string
  opacity?: number
}

const P5Background: React.FC<P5BackgroundProps> = ({ className, opacity = 0.5 }) => {
  const { theme, setTheme } = useTheme()
  const [isMounted, setIsMounted] = useState(false)
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    setIsMounted(true)
    setCurrentTheme(theme as 'light' | 'dark')
  }, [theme])

  if (!isMounted) {
    return null // or a loading placeholder
  }

  let objs: any[] = []
  const colors = ['#f71735', '#067bc2', '#FFC247', '#3BD89F', '#81cfe5', '#f654a9', '#2F0A30']

  const setup = (p5: any, canvasParentRef: Element) => {
    const canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef)
    canvas.position(0, 0)
    canvas.style('z-index', '-1')
    p5.rectMode(p5.CENTER)
    
    const gridSize = p5.width * 1.0
    const cellCount = 20
    const cellSize = gridSize / cellCount
    
    for (let i = 0; i < cellCount; i++) {
      for (let j = 0; j < cellCount; j++) {
        const x = i * cellSize + (cellSize / 2) + ((p5.width - gridSize) / 2)
        const y = j * cellSize + (cellSize / 2) + ((p5.width - gridSize) / 2)
        objs.push(new SuperSquare(p5, x, y, cellSize, colors, opacity))
      }
    }
    p5.shuffle(objs, true)
  }

  const draw = (p5: any) => {
    p5.background(currentTheme === 'dark' ? 0 : 255, 255 * opacity)
    for (let i of objs) {
      i.show()
      i.move()
    }
  }

  const windowResized = (p5: any) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight)
  }

  return (
    <div className={className}>
      <Sketch setup={setup} draw={draw} windowResized={windowResized} />
    </div>
  )
}

class SuperSquare {
  constructor(p5: any, x: number, y: number, w: number, colors: string[], opacity: number) {
    this.p5 = p5
    this.x = x
    this.y = y
    this.w = w
    this.originX = x
    this.originY = y
    this.currentX = x
    this.currentY = y
    this.fromX = this.currentX
    this.fromY = this.currentY
    this.xpm = p5.random([-1, 1])
    this.ypm = p5.random([-1, 1])
    this.len = p5.int(p5.random(1, 4))
    this.toX = this.originX + this.w * this.len * this.xpm
    this.toY = this.originY + this.w * this.len * this.ypm
    this.time = -p5.int(p5.random(500))
    this.time1 = 60
    this.time2 = this.time1 + 200
    this.time3 = this.time2 + 60
    this.clr = p5.random(colors)
    this.opacity = opacity
  }

  show() {
    const p5 = this.p5
    p5.noStroke()
    p5.fill(p5.color(this.clr + hexToRgba(this.opacity)))

    p5.beginShape(p5.QUADS)
    p5.vertex(this.originX - this.w / 2, this.originY - this.w / 2)
    p5.vertex(this.originX + this.w / 2, this.originY - this.w / 2)
    p5.vertex(this.currentX + this.w / 2, this.currentY - this.w / 2)
    p5.vertex(this.currentX - this.w / 2, this.currentY - this.w / 2)

    p5.vertex(this.originX + this.w / 2, this.originY - this.w / 2)
    p5.vertex(this.originX + this.w / 2, this.originY + this.w / 2)
    p5.vertex(this.currentX + this.w / 2, this.currentY + this.w / 2)
    p5.vertex(this.currentX + this.w / 2, this.currentY - this.w / 2)

    p5.vertex(this.originX + this.w / 2, this.originY + this.w / 2)
    p5.vertex(this.originX - this.w / 2, this.originY + this.w / 2)
    p5.vertex(this.currentX - this.w / 2, this.currentY + this.w / 2)
    p5.vertex(this.currentX + this.w / 2, this.currentY + this.w / 2)

    p5.vertex(this.originX - this.w / 2, this.originY + this.w / 2)
    p5.vertex(this.originX - this.w / 2, this.originY - this.w / 2)
    p5.vertex(this.currentX - this.w / 2, this.currentY - this.w / 2)
    p5.vertex(this.currentX - this.w / 2, this.currentY + this.w / 2)

    p5.fill(0)
    p5.vertex(this.currentX - this.w / 2, this.currentY - this.w / 2)
    p5.vertex(this.currentX + this.w / 2, this.currentY - this.w / 2)
    p5.vertex(this.currentX + this.w / 2, this.currentY + this.w / 2)
    p5.vertex(this.currentX - this.w / 2, this.currentY + this.w / 2)
    p5.endShape()

    p5.beginShape(p5.QUADS)

    if (this.ypm == 1) {
      p5.fill(0, 75 * this.opacity)
      p5.vertex(this.originX - this.w / 2, this.originY - this.w / 2)
      p5.vertex(this.originX + this.w / 2, this.originY - this.w / 2)
      p5.vertex(this.currentX + this.w / 2, this.currentY - this.w / 2)
      p5.vertex(this.currentX - this.w / 2, this.currentY - this.w / 2)
    }

    if (this.xpm == -1) {
      p5.fill(0, 150 * this.opacity)
      p5.vertex(this.originX + this.w / 2, this.originY - this.w / 2)
      p5.vertex(this.originX + this.w / 2, this.originY + this.w / 2)
      p5.vertex(this.currentX + this.w / 2, this.currentY + this.w / 2)
      p5.vertex(this.currentX + this.w / 2, this.currentY - this.w / 2)
    }

    if (this.ypm == -1) {
      p5.fill(255, 150 * this.opacity)
      p5.vertex(this.originX + this.w / 2, this.originY + this.w / 2)
      p5.vertex(this.originX - this.w / 2, this.originY + this.w / 2)
      p5.vertex(this.currentX - this.w / 2, this.currentY + this.w / 2)
      p5.vertex(this.currentX + this.w / 2, this.currentY + this.w / 2)
    }

    if (this.xpm == 1) {
      p5.fill(255, 75 * this.opacity)
      p5.vertex(this.originX - this.w / 2, this.originY + this.w / 2)
      p5.vertex(this.originX - this.w / 2, this.originY - this.w / 2)
      p5.vertex(this.currentX - this.w / 2, this.currentY - this.w / 2)
      p5.vertex(this.currentX - this.w / 2, this.currentY + this.w / 2)
    }
    p5.endShape()
    p5.fill(p5.color(this.clr + hexToRgba(this.opacity)))
    p5.square(this.currentX, this.currentY, this.w)
  }

  move() {
    const p5 = this.p5
    if (0 < this.time && this.time < this.time1) {
      let n = p5.norm(this.time, 0, this.time1 - 1)
      this.currentX = p5.lerp(this.fromX, this.toX, this.easeInOutQuint(n))
      this.currentY = p5.lerp(this.fromY, this.toY, this.easeInOutQuint(n))
    }
    else if (this.time2 < this.time && this.time < this.time3) {
      let n = p5.norm(this.time, this.time2, this.time3 - 1)
      this.currentX = p5.lerp(this.toX, this.fromX, this.easeInOutQuint(n))
      this.currentY = p5.lerp(this.toY, this.fromY, this.easeInOutQuint(n))
    }
    if (this.time > this.time3) {
      this.time = -p5.int(p5.random(500))

      this.xpm = p5.random([-1, 1])
      this.ypm = p5.random([-1, 1])
      this.len = p5.int(p5.random(1, 4))
      this.toX = this.originX + this.w * this.len * this.xpm
      this.toY = this.originY + this.w * this.len * this.ypm
    }
    this.time++
  }

  easeInOutQuint(x: number) {
    return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2
  }
}

function hexToRgba(opacity: number): string {
  const alpha = Math.round(opacity * 255).toString(16).padStart(2, '0')
  return alpha
}

export default P5Background

