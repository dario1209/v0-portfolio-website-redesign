"use client"

import { useEffect, useState } from "react"

export function AnimatedBackground() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return <AnimatedText />
}

function AnimatedText() {
  const text = "KingDario"
  const characters = text.length // 9 characters

  return (
    <div className="fixed inset-0 -z-10 flex items-center justify-center bg-background">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=UnifrakturMaguntia&family=Amatic+SC:wght@700&family=Hachi+Maru+Pop&family=Stalemate&family=Yesteryear&display=swap");

        @keyframes kingdario {
          ${generateKeyframes(characters)}
          to {
            transform: scale(1.05);
          }
        }

        .animated-word {
          display: flex;
          gap: 5vw;
          animation: kingdario 10s forwards;
        }

        .animated-char {
          ${generateCharacterStyles(characters)}
        }
      `}</style>
      <div className="animated-word text-[12vmax] font-[Oxanium] text-foreground drop-shadow-[0_0_1rem_currentColor]">
        {text.split("").map((char, i) => (
          <span key={i} className="animated-char" data-index={i + 1}>
            {char}
          </span>
        ))}
      </div>
    </div>
  )
}

function generateKeyframes(characters: number) {
  const steps = 25
  const emptyRolls = 2
  const spaceShift = 5
  const time = 10

  const getStepInc = (stepCurrent: number) => {
    return Math.pow(stepCurrent, 2) / 10
  }

  const stepInc = (100 - getStepInc(steps)) / steps
  let keyframes = ""

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

  return keyframes
}

function generateCharacterStyles(characters: number) {
  let styles = ""
  for (let i = 1; i <= characters; i++) {
    styles += `
      &:nth-child(${i}n) {
        font-family: var(--ff${i}, inherit);
        text-transform: var(--tt${i}, none);
        transform: var(--t${i}, none);
      }
    `
  }
  return styles
}
