"use client"

import * as React from "react"

export interface SliderProps {
  value: number[]
  onValueChange: (value: number[]) => void
  max?: number
  min?: number
  step?: number
  className?: string
  disabled?: boolean
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className, value, onValueChange, max = 100, min = 0, step = 1, disabled, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onValueChange([parseInt(e.target.value)])
    }

    return (
      <div className={`relative flex w-full touch-none select-none items-center ${className || ''}`}>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value[0] || min}
          onChange={handleChange}
          disabled={disabled}
          className="relative h-2 w-full cursor-pointer appearance-none rounded-full bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 slider-thumb:appearance-none slider-thumb:h-5 slider-thumb:w-5 slider-thumb:rounded-full slider-thumb:bg-primary slider-thumb:ring-offset-background slider-thumb:transition-colors slider-thumb:focus-visible:outline-none slider-thumb:focus-visible:ring-2 slider-thumb:focus-visible:ring-ring slider-thumb:focus-visible:ring-offset-2 slider-thumb:disabled:pointer-events-none slider-thumb:disabled:opacity-50"
          ref={ref}
          {...props}
        />
        <style jsx>{`
          input[type="range"]::-webkit-slider-thumb {
            appearance: none;
            height: 20px;
            width: 20px;
            border-radius: 50%;
            background: hsl(222.2 47.4% 11.2%);
            cursor: pointer;
            border: none;
          }
          input[type="range"]::-moz-range-thumb {
            height: 20px;
            width: 20px;
            border-radius: 50%;
            background: hsl(222.2 47.4% 11.2%);
            cursor: pointer;
            border: none;
          }
        `}</style>
      </div>
    )
  }
)
Slider.displayName = "Slider"

export { Slider }