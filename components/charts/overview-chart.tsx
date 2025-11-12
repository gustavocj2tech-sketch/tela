
'use client'

import { ChartWrapper } from './chart-wrapper'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, Legend } from 'recharts'

interface OverviewChartProps {
  data: Array<{
    name: string
    total: number
    vendas?: number
    leads?: number
  }>
  height?: number
}

export function OverviewChart({ data, height = 350 }: OverviewChartProps) {
  if (typeof window === 'undefined') {
    return <div style={{ height }} className="animate-pulse bg-muted rounded" />
  }

  return (
    <ChartWrapper height={height}>
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <defs>
            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
            </linearGradient>
            <linearGradient id="colorVendas" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="name" 
            tickLine={false}
            tick={{ fontSize: 10 }}
            axisLine={false}
          />
          <YAxis 
            tickLine={false}
            tick={{ fontSize: 10 }}
            axisLine={false}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--background))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              fontSize: '12px'
            }}
          />
          <Legend 
            wrapperStyle={{ fontSize: 11 }}
            verticalAlign="top"
          />
          <Area
            type="monotone"
            dataKey="total"
            stroke="#3B82F6"
            fillOpacity={1}
            fill="url(#colorTotal)"
            name="Total"
          />
          {data[0]?.vendas !== undefined && (
            <Area
              type="monotone"
              dataKey="vendas"
              stroke="#10B981"
              fillOpacity={1}
              fill="url(#colorVendas)"
              name="Vendas"
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </ChartWrapper>
  )
}
