
import { Suspense } from 'react'
import { 
  Target, 
  TrendingUp, 
  DollarSign, 
  Users,
  CheckCircle,
  AlertCircle,
  PieChart,
  Filter
} from 'lucide-react'
import { MetricCard } from '@/components/ui/metric-card'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { prisma } from '@/lib/db'

export const dynamic = "force-dynamic"

// Simplified Funnel Chart Component
function FunnelChart({ data }: { data: Array<{ name: string; value: number; color: string }> }) {
  const maxValue = Math.max(...data.map(d => d.value))
  
  return (
    <div className="space-y-3">
      {data.map((item, index) => (
        <div key={index} className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">{item.name}</span>
            <span className="text-sm text-muted-foreground">{item.value}</span>
          </div>
          <div className="w-full bg-muted rounded-full h-4">
            <div
              className="h-4 rounded-full transition-all"
              style={{
                width: `${(item.value / maxValue) * 100}%`,
                backgroundColor: item.color
              }}
            />
          </div>
          <div className="text-xs text-muted-foreground text-right">
            {index > 0 ? `${((item.value / data[index - 1].value) * 100).toFixed(1)}% conversão` : ''}
          </div>
        </div>
      ))}
    </div>
  )
}

// Simplified Pie Chart Component
function SimplePieChart({ data }: { data: Array<{ name: string; value: number; color: string }> }) {
  const total = data.reduce((sum, item) => sum + item.value, 0)
  
  return (
    <div className="space-y-3">
      {data.map((item, index) => (
        <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
          <div className="flex items-center space-x-3">
            <div 
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm font-medium">{item.name}</span>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium">{item.value}</div>
            <div className="text-xs text-muted-foreground">
              {((item.value / total) * 100).toFixed(1)}%
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

async function getOpportunityMetrics() {
  try {
    const [
      totalOpportunities,
      activeOpportunities,
      conversionRate,
      averageValue,
      topOpportunities
    ] = await Promise.all([
      prisma.opportunity.count(),
      prisma.opportunity.count({ where: { status: 'OPEN' } }),
      75, // Mock conversion rate percentage
      15750, // Mock average value
      prisma.opportunity.findMany({
        take: 5,
        orderBy: { value: 'desc' },
        include: {
          contact: true,
          stage: true
        }
      })
    ])

    return {
      totalOpportunities,
      activeOpportunities,
      conversionRate,
      averageValue,
      topOpportunities
    }
  } catch (error) {
    console.error('Error fetching opportunity metrics:', error)
    return {
      totalOpportunities: 0,
      activeOpportunities: 0,
      conversionRate: 0,
      averageValue: 0,
      topOpportunities: []
    }
  }
}

export default async function DashboardOportunidades() {
  const {
    totalOpportunities,
    activeOpportunities,
    conversionRate,
    averageValue,
    topOpportunities
  } = await getOpportunityMetrics()

  // Mock data for funnel
  const funnelData = [
    { name: 'Leads Qualificados', value: 450, color: '#3B82F6' },
    { name: 'Contato Inicial', value: 320, color: '#10B981' },
    { name: 'Proposta Enviada', value: 180, color: '#F59E0B' },
    { name: 'Em Negociação', value: 95, color: '#EF4444' },
    { name: 'Fechados', value: 42, color: '#8B5CF6' }
  ]

  // Mock data for origin pie chart
  const originData = [
    { name: 'WhatsApp', value: 145, color: '#25D366' },
    { name: 'Site', value: 89, color: '#3B82F6' },
    { name: 'Indicação', value: 67, color: '#10B981' },
    { name: 'Redes Sociais', value: 54, color: '#E1306C' },
    { name: 'Outros', value: 23, color: '#6B7280' }
  ]

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard de Oportunidades</h2>
      </div>

      {/* Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total de Oportunidades"
          value={totalOpportunities?.toString() || '0'}
          description="Este mês"
          icon="Target"
          trend="+18.2%"
        />
        <MetricCard
          title="Taxa de Conversão"
          value={`${conversionRate}%`}
          description="Lead para cliente"
          icon="TrendingUp"
          trend="+4.3%"
        />
        <MetricCard
          title="Valor Médio"
          value={`R$ ${averageValue?.toLocaleString('pt-BR') || '0'}`}
          description="Por oportunidade"
          icon="DollarSign"
          trend="+7.8%"
        />
        <MetricCard
          title="Em Negociação"
          value={activeOpportunities?.toString() || '0'}
          description="Ativas agora"
          icon="Users"
          badge="HOT"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Funnel Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="mr-2 h-5 w-5" />
              Funil de Conversão
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FunnelChart data={funnelData} />
          </CardContent>
        </Card>

        {/* Origin Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChart className="mr-2 h-5 w-5" />
              Origem das Oportunidades
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SimplePieChart data={originData} />
          </CardContent>
        </Card>

        {/* Conversion Rate by Stage */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              Taxa por Etapa
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {funnelData.slice(0, -1).map((stage, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{stage.name}</span>
                  <span className="font-medium">
                    {index === funnelData.length - 2 ? 
                      '44.2%' : 
                      `${((funnelData[index + 1].value / stage.value) * 100).toFixed(1)}%`
                    }
                  </span>
                </div>
                <Progress 
                  value={index === funnelData.length - 2 ? 
                    44.2 : 
                    (funnelData[index + 1].value / stage.value) * 100
                  } 
                  className="h-2" 
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Top Opportunities Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="mr-2 h-5 w-5" />
            Top Oportunidades
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topOpportunities?.map((opportunity) => (
              <div key={opportunity.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                <div className="space-y-1">
                  <p className="text-sm font-medium">
                    {opportunity.contact?.name || 'Cliente sem nome'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {opportunity.contact?.whatsapp || 'N/A'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Etapa: {opportunity.stage?.name || 'N/A'}
                  </p>
                </div>
                <div className="text-right space-y-1">
                  <p className="text-sm font-medium text-green-600">
                    R$ {opportunity.value?.toLocaleString('pt-BR') || '0'}
                  </p>
                  <Badge variant={
                    opportunity.status === 'OPEN' ? 'default' : 
                    opportunity.status === 'WON' ? 'secondary' : 'destructive'
                  }>
                    {opportunity.status === 'OPEN' ? 'Aberta' : 
                     opportunity.status === 'WON' ? 'Ganha' : 'Perdida'}
                  </Badge>
                  <p className="text-xs text-muted-foreground">
                    {new Date(opportunity.createdAt).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
