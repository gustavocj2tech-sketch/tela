
import { Suspense } from 'react'
import { 
  FileText, 
  TrendingUp, 
  DollarSign, 
  Users,
  MessageSquare,
  Target,
  BarChart3,
  Clock
} from 'lucide-react'
import { MetricCard } from '@/components/ui/metric-card'
import { OverviewChart } from '@/components/charts/overview-chart'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { prisma } from '@/lib/db'

export const dynamic = "force-dynamic"

async function getExecutiveSummary() {
  try {
    const [
      totalContacts,
      totalConversations,
      totalOpportunities,
      totalRevenue,
      monthlyGrowth,
      activeRate
    ] = await Promise.all([
      prisma.contact.count(),
      prisma.conversation.count(),
      prisma.opportunity.count(),
      prisma.opportunity.aggregate({
        where: { status: 'WON' },
        _sum: { value: true }
      }),
      18.5, // Mock monthly growth percentage
      85.2  // Mock active rate percentage
    ])

    return {
      totalContacts,
      totalConversations,
      totalOpportunities,
      totalRevenue: totalRevenue._sum.value || 0,
      monthlyGrowth,
      activeRate
    }
  } catch (error) {
    console.error('Error fetching executive summary:', error)
    return {
      totalContacts: 0,
      totalConversations: 0,
      totalOpportunities: 0,
      totalRevenue: 0,
      monthlyGrowth: 0,
      activeRate: 0
    }
  }
}

export default async function DashboardResumo() {
  const {
    totalContacts,
    totalConversations,
    totalOpportunities,
    totalRevenue,
    monthlyGrowth,
    activeRate
  } = await getExecutiveSummary()

  // Mock comparative data (current vs previous month)
  const comparativeData = [
    { 
      metric: 'Novos Contatos',
      current: 245,
      previous: 198,
      growth: 23.7,
      icon: Users
    },
    {
      metric: 'Atendimentos',
      current: 1892,
      previous: 1654,
      growth: 14.4,
      icon: MessageSquare
    },
    {
      metric: 'Oportunidades',
      current: 78,
      previous: 65,
      growth: 20.0,
      icon: Target
    },
    {
      metric: 'Faturamento',
      current: 487500,
      previous: 415200,
      growth: 17.4,
      icon: DollarSign
    }
  ]

  // Mock trend data for the last 6 months
  const trendData = [
    { name: 'Jan', contatos: 198, atendimentos: 1654, oportunidades: 65, faturamento: 415200 },
    { name: 'Fev', contatos: 212, atendimentos: 1723, oportunidades: 71, faturamento: 445600 },
    { name: 'Mar', contatos: 228, atendimentos: 1798, oportunidades: 73, faturamento: 468900 },
    { name: 'Abr', contatos: 235, atendimentos: 1845, oportunidades: 76, faturamento: 475300 },
    { name: 'Mai', contatos: 241, atendimentos: 1867, oportunidades: 77, faturamento: 481700 },
    { name: 'Jun', contatos: 245, atendimentos: 1892, oportunidades: 78, faturamento: 487500 }
  ]

  const kpiData = [
    { 
      name: 'Taxa de Conversão', 
      value: 12.8, 
      target: 15.0, 
      unit: '%',
      trend: '+2.1%'
    },
    { 
      name: 'Tempo Médio de Resposta', 
      value: 4.2, 
      target: 5.0, 
      unit: 'min',
      trend: '-0.8 min'
    },
    { 
      name: 'Ticket Médio', 
      value: 6250, 
      target: 6000, 
      unit: 'R$',
      trend: '+4.2%'
    },
    { 
      name: 'CSAT Score', 
      value: 4.6, 
      target: 4.5, 
      unit: '/5',
      trend: '+0.1'
    }
  ]

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard Resumo Executivo</h2>
        <Badge variant="secondary" className="text-sm">
          Atualizado há 5 min
        </Badge>
      </div>

      {/* Executive Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total de Contatos"
          value={totalContacts?.toString() || '0'}
          description="Base completa"
          icon="Users"
          trend="+23.7%"
        />
        <MetricCard
          title="Atendimentos"
          value={totalConversations?.toString() || '0'}
          description="Este mês"
          icon="MessageSquare"
          trend="+14.4%"
        />
        <MetricCard
          title="Oportunidades"
          value={totalOpportunities?.toString() || '0'}
          description="Pipeline ativo"
          icon="Target"
          trend="+20.0%"
        />
        <MetricCard
          title="Faturamento"
          value={`R$ ${totalRevenue?.toLocaleString('pt-BR') || '0'}`}
          description="Vendas fechadas"
          icon="DollarSign"
          trend="+17.4%"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {/* Comparative Analysis */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5" />
              Comparativo Mensal
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {comparativeData.map((item, index) => {
              const Icon = item.icon
              return (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{item.metric}</p>
                      <p className="text-xs text-muted-foreground">
                        Atual: {item.metric === 'Faturamento' ? 
                          `R$ ${item.current.toLocaleString('pt-BR')}` : 
                          item.current.toLocaleString('pt-BR')
                        }
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={item.growth > 0 ? 'secondary' : 'destructive'}>
                      {item.growth > 0 ? '+' : ''}{item.growth.toFixed(1)}%
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      vs mês anterior
                    </p>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* KPIs Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="mr-2 h-5 w-5" />
              KPIs vs Metas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {kpiData.map((kpi, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{kpi.name}</span>
                  <div className="text-right">
                    <span className="text-sm font-medium">
                      {kpi.unit === 'R$' ? 
                        `R$ ${kpi.value.toLocaleString('pt-BR')}` : 
                        `${kpi.value}${kpi.unit}`
                      }
                    </span>
                    <p className="text-xs text-muted-foreground">
                      Meta: {kpi.unit === 'R$' ? 
                        `R$ ${kpi.target.toLocaleString('pt-BR')}` : 
                        `${kpi.target}${kpi.unit}`
                      }
                    </p>
                  </div>
                </div>
                <Progress 
                  value={(kpi.value / kpi.target) * 100} 
                  className="h-2" 
                />
                <p className="text-xs text-muted-foreground text-right">
                  Tendência: {kpi.trend}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Trend Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="mr-2 h-5 w-5" />
            Visão Geral de Tendências (Últimos 6 Meses)
          </CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <Suspense fallback={<div className="h-80 animate-pulse bg-muted rounded" />}>
            <OverviewChart 
              data={trendData.map(item => ({
                name: item.name,
                total: item.contatos,
                vendas: item.oportunidades
              }))} 
              height={350} 
            />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}
