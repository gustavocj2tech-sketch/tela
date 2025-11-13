
import { Suspense } from 'react'
import { 
  Star, 
  TrendingUp, 
  MessageSquare, 
  ThumbsUp,
  ThumbsDown,
  AlertCircle,
  CheckCircle,
  BarChart3
} from 'lucide-react'
import { MetricCard } from '@/components/ui/metric-card'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

export const dynamic = "force-dynamic"

// CSAT Gauge Component
function CSATGauge({ score, size = 120 }: { score: number; size?: number }) {
  const circumference = 2 * Math.PI * 40
  const strokeDashoffset = circumference - (score / 5) * circumference
  
  const getColor = (score: number) => {
    if (score >= 4.5) return '#10B981' // green
    if (score >= 4.0) return '#3B82F6' // blue
    if (score >= 3.5) return '#F59E0B' // yellow
    return '#EF4444' // red
  }

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          cx={size/2}
          cy={size/2}
          r="40"
          stroke="#e5e7eb"
          strokeWidth="8"
          fill="transparent"
        />
        <circle
          cx={size/2}
          cy={size/2}
          r="40"
          stroke={getColor(score)}
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold">{score.toFixed(1)}</div>
          <div className="text-xs text-muted-foreground">/ 5.0</div>
        </div>
      </div>
    </div>
  )
}

// Rating Distribution Component
function RatingDistribution({ data }: { data: Array<{ rating: number; count: number; percentage: number }> }) {
  const maxCount = Math.max(...data.map(d => d.count))
  
  return (
    <div className="space-y-3">
      {data.map((item, index) => (
        <div key={index} className="flex items-center space-x-3">
          <div className="flex items-center space-x-1 w-16">
            <span className="text-sm font-medium">{item.rating}</span>
            <Star className="h-3 w-3 text-yellow-500 fill-current" />
          </div>
          <div className="flex-1">
            <Progress 
              value={item.percentage} 
              className="h-2"
            />
          </div>
          <div className="text-sm font-medium w-16 text-right">
            {item.count}
          </div>
        </div>
      ))}
    </div>
  )
}

async function getQualityMetrics() {
  try {
    // Mock data since we don't have quality tables in schema
    return {
      averageCSAT: 4.3,
      npsScore: 67,
      positiveRatings: 89,
      negativeRatings: 11,
      totalEvaluations: 1247
    }
  } catch (error) {
    console.error('Error fetching quality metrics:', error)
    return {
      averageCSAT: 0,
      npsScore: 0,
      positiveRatings: 0,
      negativeRatings: 0,
      totalEvaluations: 0
    }
  }
}

export default async function DashboardQualidade() {
  const {
    averageCSAT,
    npsScore,
    positiveRatings,
    negativeRatings,
    totalEvaluations
  } = await getQualityMetrics()

  // Mock rating distribution data
  const ratingDistribution = [
    { rating: 5, count: 678, percentage: 54.4 },
    { rating: 4, count: 437, percentage: 35.0 },
    { rating: 3, count: 87, percentage: 7.0 },
    { rating: 2, count: 31, percentage: 2.5 },
    { rating: 1, count: 14, percentage: 1.1 }
  ]

  // Mock CSAT evolution data
  const csatEvolution = [
    { name: 'Jan', csat: 4.1 },
    { name: 'Fev', csat: 4.2 },
    { name: 'Mar', csat: 4.0 },
    { name: 'Abr', csat: 4.3 },
    { name: 'Mai', csat: 4.4 },
    { name: 'Jun', csat: 4.3 }
  ]

  // Mock recent comments
  const recentComments = [
    {
      id: 1,
      customer: 'Ana Silva',
      rating: 5,
      comment: 'Excelente atendimento! Muito rápido e eficiente.',
      date: '2024-06-15',
      attendant: 'Carlos'
    },
    {
      id: 2,
      customer: 'João Santos',
      rating: 4,
      comment: 'Bom atendimento, mas demorou um pouco para responder.',
      date: '2024-06-15',
      attendant: 'Maria'
    },
    {
      id: 3,
      customer: 'Pedro Costa',
      rating: 5,
      comment: 'Resolveu meu problema rapidamente. Muito satisfeito!',
      date: '2024-06-14',
      attendant: 'Ana'
    },
    {
      id: 4,
      customer: 'Lucia Ferreira',
      rating: 3,
      comment: 'Atendimento ok, mas poderia ser mais personalizado.',
      date: '2024-06-14',
      attendant: 'Roberto'
    }
  ]

  // Mock attendant performance
  const attendantPerformance = [
    { name: 'Carlos Souza', avgRating: 4.8, evaluations: 156 },
    { name: 'Ana Lima', avgRating: 4.6, evaluations: 134 },
    { name: 'Maria Santos', avgRating: 4.5, evaluations: 142 },
    { name: 'Roberto Silva', avgRating: 4.2, evaluations: 98 },
    { name: 'Fernanda Costa', avgRating: 4.1, evaluations: 87 }
  ]

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard Qualidade/CSAT</h2>
      </div>

      {/* Quality Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="CSAT Médio"
          value={averageCSAT.toFixed(1)}
          description="Satisfação do cliente"
          icon="Star"
          trend="+0.2"
        />
        <MetricCard
          title="NPS Score"
          value={npsScore.toString()}
          description="Net Promoter Score"
          icon="TrendingUp"
          trend="+5"
        />
        <MetricCard
          title="Avaliações Positivas"
          value={`${positiveRatings}%`}
          description="4-5 estrelas"
          icon="ThumbsUp"
          trend="+3.2%"
        />
        <MetricCard
          title="Avaliações Negativas"
          value={`${negativeRatings}%`}
          description="1-2 estrelas"
          icon="ThumbsDown"
          trend="-1.8%"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {/* CSAT Gauge */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="mr-2 h-5 w-5" />
              CSAT Score
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <CSATGauge score={averageCSAT} />
          </CardContent>
        </Card>

        {/* Rating Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5" />
              Distribuição de Avaliações
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RatingDistribution data={ratingDistribution} />
          </CardContent>
        </Card>

        {/* Attendant Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="mr-2 h-5 w-5" />
              Performance por Atendente
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {attendantPerformance.map((attendant, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">{attendant.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {attendant.evaluations} avaliações
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">
                      {attendant.avgRating.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* CSAT Evolution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="mr-2 h-5 w-5" />
            Evolução do CSAT (Últimos 6 Meses)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-6 gap-4">
            {csatEvolution.map((month, index) => (
              <div key={index} className="text-center p-4 rounded-lg bg-muted/50">
                <p className="text-sm font-medium text-muted-foreground">{month.name}</p>
                <p className="text-2xl font-bold mt-2">{month.csat.toFixed(1)}</p>
                <div className="flex items-center justify-center mt-1">
                  <Star className="h-3 w-3 text-yellow-500 fill-current" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Comments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageSquare className="mr-2 h-5 w-5" />
            Comentários Recentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentComments.map((comment) => (
              <div key={comment.id} className="p-4 rounded-lg bg-muted/50">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-sm font-medium">{comment.customer}</p>
                    <p className="text-xs text-muted-foreground">
                      Atendido por: {comment.attendant}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1">
                      {Array.from({ length: comment.rating }).map((_, i) => (
                        <Star key={i} className="h-3 w-3 text-yellow-500 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {new Date(comment.date).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground italic">
                  "{comment.comment}"
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
