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
        className="animated-word text-[7vw] md:text-[6vw] font-[Oxanium] text-foreground drop-shadow-[0_0_1rem_currentColor]"
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
  const spaceShiftDesktop = 5
  const spaceShiftMobile = 3

  const getStepInc = (stepCurrent: number) => {
    return Math.pow(stepCurrent, 2) / 10
  }

  const stepInc = (100 - getStepInc(steps)) / steps

  const fonts = ["UnifrakturMaguntia", "Amatic SC", "Hachi Maru Pop", "Yesteryear", "Stalemate"]
  const textTransforms = ["uppercase", "lowercase"]

  const buildKeyframes = (name: string, spaceShift: number, finalScale: number) => {
    let kf = `@keyframes ${name} {\n`

    for (let step = 1; step <= steps; step++) {
      const stepPercent = step * stepInc + getStepInc(step)
      if (stepPercent >= 0) {
        kf += `${stepPercent.toFixed(2)}% {\n`

        for (let i = 1; i <= characters; i++) {
          const randomDir1 = Math.random() > 0.5 ? 1 : -1
          const randomDir2 = Math.random() > 0.5 ? 1 : -1
          kf += `  --t${i}: translate(${spaceShift * randomDir1}px, ${spaceShift * randomDir2}px);\n`

          if (step + characters * emptyRolls - i * emptyRolls < steps - emptyRolls) {
            const randomFont = fonts[Math.floor(Math.random() * fonts.length)]
            const randomTransform = textTransforms[Math.floor(Math.random() * textTransforms.length)]
            kf += `  --ff${i}: ${randomFont};\n`
            kf += `  --tt${i}: ${randomTransform};\n`
          }
        }

        kf += "}\n"
      }
    }

    kf += `to { 
    transform: scale(${finalScale});
  }\n}\n`

    return kf
  }

  let keyframes = buildKeyframes("kingdario", spaceShiftDesktop, 1.02)
  keyframes += buildKeyframes("kingdario-mobile", spaceShiftMobile, 0.98)

  let styles = `.animated-word {
    display: flex;
    gap: 1.5vw;
    animation: kingdario 10s forwards;
  }
  @media (max-width: 640px) {
    .animated-word {
      animation: kingdario-mobile 10s forwards;
    }
  }
  @media (min-width: 640px) {
    .animated-word {
      gap: 2vw;
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
