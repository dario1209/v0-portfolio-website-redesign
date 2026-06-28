"use client"

import { useEffect, useRef, useState } from "react"

export function GlitchPortrait({ src }: { src: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement | null>(null)
  const animRef = useRef<number>(0)
  const [loaded, setLoaded] = useState(false)
  const isGlitching = useRef(false)
  const glitchTimeout = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    const img = new Image()
    img.src = src
    img.onload = () => {
      imgRef.current = img
      setLoaded(true)
    }
  }, [src])

  useEffect(() => {
    if (!loaded) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const img = imgRef.current!
    const W = canvas.width
    const H = canvas.height

    function drawClean() {
      ctx!.clearRect(0, 0, W, H)
      ctx!.drawImage(img, 0, 0, W, H)
    }

    function drawGlitch(intensity: number) {
      ctx!.clearRect(0, 0, W, H)

      // RGB channel split
      const offset = Math.floor(intensity * 12)
      ctx!.globalCompositeOperation = "source-over"

      // Red channel shifted left
      ctx!.globalAlpha = 0.85
      ctx!.filter = "url(#red)"
      ctx!.drawImage(img, -offset, 0, W, H)

      // Blue channel shifted right
      ctx!.globalAlpha = 0.85
      ctx!.filter = "url(#blue)"
      ctx!.drawImage(img, offset, 0, W, H)

      // Base image on top at lower alpha
      ctx!.globalAlpha = 0.9
      ctx!.filter = "none"
      ctx!.drawImage(img, 0, 0, W, H)

      ctx!.globalAlpha = 1
      ctx!.filter = "none"

      // Slice corruption
      const slices = Math.floor(intensity * 6) + 1
      for (let i = 0; i < slices; i++) {
        const sy = Math.random() * H
        const sh = Math.random() * 18 + 4
        const dx = (Math.random() - 0.5) * intensity * 30
        ctx!.drawImage(img, 0, sy, W, sh, dx, sy, W, sh)
      }

      // Scanlines
      ctx!.globalAlpha = 0.04
      ctx!.fillStyle = "#000"
      for (let y = 0; y < H; y += 3) {
        ctx!.fillRect(0, y, W, 1)
      }
      ctx!.globalAlpha = 1

      // Random horizontal noise bars
      if (Math.random() < intensity * 0.6) {
        const by = Math.random() * H
        const bh = Math.random() * 4 + 1
        ctx!.globalAlpha = Math.random() * 0.3
        ctx!.fillStyle = Math.random() > 0.5 ? "#fff" : "#000"
        ctx!.fillRect(0, by, W, bh)
        ctx!.globalAlpha = 1
      }
    }

    let frame = 0
    let glitchFrames = 0
    let maxGlitchFrames = 0
    let currentIntensity = 0
    let phase: "idle" | "glitching" | "settling" = "idle"

    function triggerGlitch() {
      phase = "glitching"
      maxGlitchFrames = Math.floor(Math.random() * 18) + 12
      glitchFrames = 0
      currentIntensity = 0.4 + Math.random() * 0.6
      isGlitching.current = true
    }

    // Trigger on load
    setTimeout(() => triggerGlitch(), 200)

    function animate() {
      frame++

      if (phase === "glitching") {
        glitchFrames++
        // Intensity curve: ramp up, hold, decay
        const t = glitchFrames / maxGlitchFrames
        const envelope = t < 0.3
          ? t / 0.3
          : t < 0.7
          ? 1
          : 1 - (t - 0.7) / 0.3
        drawGlitch(currentIntensity * envelope)
        if (glitchFrames >= maxGlitchFrames) {
          phase = "settling"
        }
      } else if (phase === "settling") {
        drawClean()
        phase = "idle"
        isGlitching.current = false
      } else {
        // Idle: draw clean, occasional micro-flicker
        if (frame % 180 === 0 && Math.random() < 0.3) {
          drawGlitch(0.08)
        } else {
          drawClean()
        }
      }

      animRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => cancelAnimationFrame(animRef.current)
  }, [loaded])

  function handleHover() {
    if (isGlitching.current) return
    clearTimeout(glitchTimeout.current)
    // Re-trigger glitch on hover by dispatching a synthetic re-run
    // We signal via a ref the animate loop reads
    isGlitching.current = true
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx || !imgRef.current) return
    const img = imgRef.current
    const W = canvas.width
    const H = canvas.height

    let f = 0
    const total = 30
    function run() {
      const t = f / total
      const envelope = t < 0.3 ? t / 0.3 : t < 0.7 ? 1 : 1 - (t - 0.7) / 0.3
      const intensity = 0.7 * envelope

      ctx.clearRect(0, 0, W, H)
      const offset = Math.floor(intensity * 14)
      ctx.globalAlpha = 0.85; ctx.drawImage(img, -offset, 0, W, H)
      ctx.globalAlpha = 0.85; ctx.drawImage(img, offset, 0, W, H)
      ctx.globalAlpha = 0.9;  ctx.drawImage(img, 0, 0, W, H)
      ctx.globalAlpha = 1

      const slices = Math.floor(intensity * 5) + 1
      for (let i = 0; i < slices; i++) {
        const sy = Math.random() * H
        const sh = Math.random() * 16 + 4
        const dx = (Math.random() - 0.5) * intensity * 28
        ctx.drawImage(img, 0, sy, W, sh, dx, sy, W, sh)
      }

      ctx.globalAlpha = 0.04
      ctx.fillStyle = "#000"
      for (let y = 0; y < H; y += 3) { ctx.fillRect(0, y, W, 1) }
      ctx.globalAlpha = 1

      f++
      if (f < total) {
        requestAnimationFrame(run)
      } else {
        ctx.clearRect(0, 0, W, H)
        ctx.drawImage(img, 0, 0, W, H)
        isGlitching.current = false
      }
    }
    run()
  }

  return (
    <div
      className="relative w-full h-full"
      onMouseEnter={handleHover}
    >
      {/* SVG filters for RGB channel split */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter id="red">
            <feColorMatrix type="matrix"
              values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" />
          </filter>
          <filter id="blue">
            <feColorMatrix type="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" />
          </filter>
        </defs>
      </svg>

      <canvas
        ref={canvasRef}
        width={480}
        height={600}
        className="w-full h-full object-cover"
        style={{ display: loaded ? "block" : "none" }}
      />
      {!loaded && (
        <div className="w-full h-full bg-muted animate-pulse" />
      )}
    </div>
  )
}
