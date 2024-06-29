import { cn } from "@/lib/utils"
import React, { PropsWithChildren } from "react"

interface CardProps
  extends PropsWithChildren,
    React.HTMLAttributes<HTMLDivElement> {
  color: "white-cream"
}

const Card = (props: CardProps) => {
  const { children, color, className, ...defaultProps } = props

  const colors: Record<typeof color, string> = {
    "white-cream": "bg-[#FAF7F2]",
  }

  return (
    <div
      className={cn(
        `rounded-lg flex flex-col gap-3 py-5 px-7`,
        colors[color],
        className
      )}
      {...defaultProps}
    >
      {children}
    </div>
  )
}

export default Card
