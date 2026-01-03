"use client"

import { useEffect, useRef } from "react"

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    let animationFrameId: number
    let time = 0
    let mouseX = canvas.width / 2
    let mouseY = canvas.height / 2

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      mouseX = canvas.width / 2
      mouseY = canvas.height / 2
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }
    window.addEventListener("mousemove", handleMouseMove)

    document.fonts.ready.then(() => {
      animate()
    })

    const text = "KingDario"

    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = []
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.2 + 0.05,
      })
    }

    const animate = () => {
      time += 0.01
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const isDark = document.documentElement.classList.contains("dark")

      // Draw particles
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.fillStyle = isDark ? `rgba(255, 255, 255, ${p.opacity})` : `rgba(0, 0, 0, ${p.opacity})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      })

      const baseSize = Math.min(window.innerWidth * 0.5, 180)

      ctx.font = `400 ${baseSize}px UnifrakturMaguntia, serif`
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      const textWidth = ctx.measureText(text).width
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      const chars = text.split("")
      let currentX = centerX - textWidth / 2

      chars.forEach((char, i) => {
        const charWidth = ctx.measureText(char).width
        const charCenterX = currentX + charWidth / 2

        // Calculate distance from mouse
        const dx = mouseX - charCenterX
        const dy = mouseY - centerY
        const dist = Math.sqrt(dx * dx + dy * dy)
        const maxDist = 150

        // Wave effect
        let offsetX = 0
        let offsetY = Math.sin(time * 2 + i * 0.5) * 8

        // Mouse interaction - push away from cursor
        if (dist < maxDist) {
          const force = (1 - dist / maxDist) * 30
          const angle = Math.atan2(dy, dx)
          offsetX = -Math.cos(angle) * force
          offsetY += -Math.sin(angle) * force
        }

        ctx.save()
        ctx.translate(charCenterX + offsetX, centerY + offsetY)

        // Subtle rotation based on position
        const rotation = Math.sin(time + i * 0.3) * 0.05
        ctx.rotate(rotation)

        // Color with subtle pulsing opacity
        const opacity = 0.85 + Math.sin(time * 1.5 + i * 0.4) * 0.15
        ctx.fillStyle = isDark ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`

        ctx.fillText(char, 0, 0)
        ctx.restore()

        currentX += charWidth
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10" style={{ width: "100%", height: "100%" }} />
}
