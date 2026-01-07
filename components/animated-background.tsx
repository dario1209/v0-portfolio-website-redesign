"use client"

import { useEffect, useRef, useState } from "react"

export function AnimatedBackground() {
  return <AnimatedText />
}

function AnimatedText() {
  const text = "KingDario"
  const [animationKey, setAnimationKey] = useState(0)
  const styleRef = useRef<HTMLStyleElement | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const style = document.createElement("style")
      style.textContent = generateCSS()
      document.head.appendChild(style)
      styleRef.current = style
    }

    const interval = setInterval(() => {
      setAnimationKey((prev) => prev + 1)
    }, 10000)

    return () => {
      clearInterval(interval)
      if (styleRef.current) {
        styleRef.current.remove()
      }
    }
  }, [])

  return (
    <div className="fixed inset-0 -z-10 flex items-center justify-center bg-background px-4">
      <link
        href="https://fonts.googleapis.com/css2?family=UnifrakturMaguntia&family=Amatic+SC:wght@700&family=Hachi+Maru+Pop&family=Stalemate&family=Yesteryear&display=swap"
        rel="stylesheet"
      />
      <div
        key={animationKey}
        className="animated-word text-[6vmax] sm:text-[8vmax] md:text-[12vmax] font-[Oxanium] text-foreground drop-shadow-[0_0_1rem_currentColor]"
      >
        {text.split("").map((char, i) => (
          <span key={i} className="animated-char inline-block" data-index={i + 1}>
            {char}
          </span>
        ))}
      </div>
    </div>
  )
}

function generateCSS() {
  const characters = 9
  const steps = 25
  const emptyRolls = 2
  const spaceShift = 5

  const getStepInc = (stepCurrent: number) => {
    return Math.pow(stepCurrent, 2) / 10
  }

  const stepInc = (100 - getStepInc(steps)) / steps
  let keyframes = "@keyframes kingdario {\n"

  const fonts = ["UnifrakturMaguntia", "Amatic SC", "Hachi Maru Pop", "Yesteryear", "Stalemate"]
  const textTransforms = ["uppercase", "lowercase"]

  for (let step = 1; step <= steps; step++) {
    const stepPercent = step * stepInc + getStepInc(step)
    if (stepPercent >= 0) {
      keyframes += `${stepPercent.toFixed(2)}% {\n`

      for (let i = 1; i <= characters; i++) {
        const randomDir1 = Math.random() > 0.5 ? 1 : -1
        const randomDir2 = Math.random() > 0.5 ? 1 : -1
        keyframes += `  --t${i}: translate(${spaceShift * randomDir1}px, ${spaceShift * randomDir2}px);\n`

        if (step + characters * emptyRolls - i * emptyRolls < steps - emptyRolls) {
          const randomFont = fonts[Math.floor(Math.random() * fonts.length)]
          const randomTransform = textTransforms[Math.floor(Math.random() * textTransforms.length)]
          keyframes += `  --ff${i}: ${randomFont};\n`
          keyframes += `  --tt${i}: ${randomTransform};\n`
        }
      }

      keyframes += "}\n"
    }
  }

  keyframes += `to { 
    transform: scale(1.02);
  }\n}\n`

  keyframes += `@keyframes kingdario-mobile {\n`

  for (let step = 1; step <= steps; step++) {
    const stepPercent = step * stepInc + getStepInc(step)
    if (stepPercent >= 0) {
      keyframes += `${stepPercent.toFixed(2)}% {\n`

      for (let i = 1; i <= characters; i++) {
        const randomDir1 = Math.random() > 0.5 ? 1 : -1
        const randomDir2 = Math.random() > 0.5 ? 1 : -1
        keyframes += `  --t${i}: translate(${spaceShift * randomDir1}px, ${spaceShift * randomDir2}px);\n`

        if (step + characters * emptyRolls - i * emptyRolls < steps - emptyRolls) {
          const randomFont = fonts[Math.floor(Math.random() * fonts.length)]
          const randomTransform = textTransforms[Math.floor(Math.random() * textTransforms.length)]
          keyframes += `  --ff${i}: ${randomFont};\n`
          keyframes += `  --tt${i}: ${randomTransform};\n`
        }
      }

      keyframes += "}\n"
    }
  }

  keyframes += `to { 
    transform: scale(0.95);
  }\n}\n`

  let styles = `.animated-word {
    display: flex;
    gap: 2vw;
    animation: kingdario 10s forwards;
  }
  @media (max-width: 640px) {
    .animated-word {
      animation: kingdario-mobile 10s forwards;
    }
  }
  @media (min-width: 640px) {
    .animated-word {
      gap: 5vw;
    }
  }\n`

  for (let i = 1; i <= characters; i++) {
    styles += `.animated-char:nth-child(${i}) {
      font-family: var(--ff${i}, inherit);
      text-transform: var(--tt${i}, none);
      transform: var(--t${i}, none);
    }\n`
  }

  return keyframes + styles
}
