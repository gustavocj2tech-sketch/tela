
'use client'

import { Card, CardContent, CardHeader, CardTitle } from './card'
import { Badge } from './badge'
import { 
  Users, 
  MessageSquare, 
  Target, 
  DollarSign,
  TrendingUp,
  BarChart3,
  Clock,
  CheckCircle,
  Activity,
  Send,
  Eye,
  Shield,
  Star,
  ThumbsUp,
  ThumbsDown,
  Zap,
  Filter,
  PieChart,
  Radio
} from 'lucide-react'

const iconMap = {
  Users,
  MessageSquare,
  Target,
  DollarSign,
  TrendingUp,
  BarChart3,
  Clock,
  CheckCircle,
  Activity,
  Send,
  Eye,
  Shield,
  Star,
  ThumbsUp,
  ThumbsDown,
  Zap,
  Filter,
  PieChart,
  Radio
} as const

interface MetricCardProps {
  title: string
  value: string | number
  description?: string
  icon: keyof typeof iconMap
  trend?: string | {
    value: number
    isPositive: boolean
  }
  badge?: string
  className?: string
}

export function MetricCard({
  title,
  value,
  description,
  icon,
  trend,
  badge,
  className,
}: MetricCardProps) {
  const Icon = iconMap[icon]

  return (
    <Card className={`card-hover ${className || ''}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="flex items-center space-x-2">
          {badge && (
            <Badge variant="secondary" className="text-xs">
              {badge}
            </Badge>
          )}
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
        {trend && (
          <div className="flex items-center mt-2">
            {typeof trend === 'string' ? (
              <span className="text-xs font-medium text-muted-foreground">
                {trend}
              </span>
            ) : (
              <>
                <span
                  className={`text-xs font-medium ${
                    trend.isPositive ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {trend.isPositive ? '+' : ''}{trend.value}%
                </span>
                <span className="text-xs text-muted-foreground ml-1">
                  vs mês anterior
                </span>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
