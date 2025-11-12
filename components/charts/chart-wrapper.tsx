
'use client'

interface ChartWrapperProps {
  children: React.ReactNode
  height?: number
}

export function ChartWrapper({ children, height = 350 }: ChartWrapperProps) {
  return (
    <div style={{ width: '100%', height }}>
      {children}
    </div>
  )
}
