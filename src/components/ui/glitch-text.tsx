interface GlitchTextProps {
  text: string
  className?: string
}

export function GlitchText({ text, className = "" }: GlitchTextProps) {
  return (
    <div
      className={`glitch-text ${className}`}
      style={{ "--glitch-text": `"${text}"` } as React.CSSProperties}
    >
      {text}
    </div>
  )
}

