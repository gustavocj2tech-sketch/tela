
import { Suspense } from 'react'
import { 
  Users, 
  MessageSquare, 
  Target, 
  DollarSign, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import { MetricCard } from '@/components/ui/metric-card'
import { OverviewChart } from '@/components/charts/overview-chart'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { prisma } from '@/lib/db'

export const dynamic = "force-dynamic"

async function getMetrics() {
  try {
    const [
      totalContacts,
      activeConversations,
      totalOpportunities,
      openOpportunities,
      totalRevenue,
      todayMessages,
      monthlyStats
    ] = await Promise.all([
      prisma.contact.count({ where: { status: 'ACTIVE' } }),
      prisma.conversation.count({ where: { status: { in: ['WAITING', 'ACTIVE'] } } }),
      prisma.opportunity.count(),
      prisma.opportunity.count({ where: { status: 'OPEN' } }),
      prisma.opportunity.aggregate({
        where: { status: 'WON' },
        _sum: { value: true }
      }),
      prisma.message.count({
        where: {
          createdAt: {
            gte: new Date(new Date().setHours(0, 0, 0, 0))
          }
        }
      }),
      prisma.dashboardMetric.findMany({
        where: {
          date: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
          }
        },
        orderBy: { date: 'asc' }
      })
    ])

    // Dados para o gráfico
    const chartData = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const dayName = date.toLocaleDateString('pt-BR', { weekday: 'short' })
      
      chartData.push({
        name: dayName,
        total: Math.floor(Math.random() * 100) + 50,
        vendas: Math.floor(Math.random() * 30) + 10,
        leads: Math.floor(Math.random() * 20) + 5,
      })
    }

    return {
      totalContacts: totalContacts || 0,
      activeConversations: activeConversations || 0,
      totalOpportunidades: totalOpportunities || 0,
      openOpportunities: openOpportunities || 0,
      totalRevenue: totalRevenue?._sum?.value || 0,
      todayMessages: todayMessages || 0,
      chartData
    }
  } catch (error) {
    console.error('Erro ao buscar métricas:', error)
    return {
      totalContacts: 0,
      activeConversations: 0,
      totalOpportunidades: 0,
      openOpportunities: 0,
      totalRevenue: 0,
      todayMessages: 0,
      chartData: []
    }
  }
}

async function getRecentActivity() {
  try {
    const recentConversations = await prisma.conversation.findMany({
      take: 5,
      orderBy: { updatedAt: 'desc' },
      include: {
        contact: true,
        user: true,
        _count: { select: { messages: true } }
      }
    })

    const recentOpportunities = await prisma.opportunity.findMany({
      take: 5,
      orderBy: { updatedAt: 'desc' },
      include: {
        contact: true,
        stage: true
      }
    })

    return {
      recentConversations: recentConversations || [],
      recentOpportunities: recentOpportunities || []
    }
  } catch (error) {
    console.error('Erro ao buscar atividade recente:', error)
    return {
      recentConversations: [],
      recentOpportunities: []
    }
  }
}

export default async function DashboardGeralPage() {
  const metrics = await getMetrics()
  const activity = await getRecentActivity()

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard Geral</h2>
        <div className="flex items-center space-x-2">
          <Badge variant="outline">Atualizado agora</Badge>
        </div>
      </div>

      {/* Métricas principais */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Contatos Ativos"
          value={metrics.totalContacts}
          description="Total de contatos no sistema"
          icon="Users"
          trend={{ value: 12, isPositive: true }}
        />
        <MetricCard
          title="Conversas Ativas"
          value={metrics.activeConversations}
          description="Aguardando atendimento"
          icon="MessageSquare"
          trend={{ value: 8, isPositive: true }}
          badge="Ativo"
        />
        <MetricCard
          title="Oportunidades"
          value={`${metrics.openOpportunities}/${metrics.totalOpportunidades}`}
          description="Oportunidades em aberto"
          icon="Target"
          trend={{ value: -2, isPositive: false }}
        />
        <MetricCard
          title="Receita Total"
          value={`R$ ${metrics.totalRevenue.toLocaleString('pt-BR')}`}
          description="Vendas fechadas"
          icon="DollarSign"
          trend={{ value: 15, isPositive: true }}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Gráfico principal */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Visão Geral - Últimos 7 dias
            </CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Suspense fallback={<div className="h-[350px] animate-pulse bg-muted rounded" />}>
              <OverviewChart data={metrics.chartData} />
            </Suspense>
          </CardContent>
        </Card>

        {/* Atividade recente */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Atividade Recente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">Conversas Recentes</p>
                <div className="space-y-2">
                  {activity.recentConversations.slice(0, 3).map((conversation) => (
                    <div key={conversation.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                      <div className="flex items-center space-x-2">
                        <div className="flex h-2 w-2 rounded-full bg-primary" />
                        <span className="text-sm font-medium">
                          {conversation.contact?.name}
                        </span>
                      </div>
                      <Badge variant={
                        conversation.status === 'ACTIVE' ? 'default' : 
                        conversation.status === 'WAITING' ? 'secondary' : 'outline'
                      }>
                        {conversation.status === 'ACTIVE' ? 'Ativo' : 
                         conversation.status === 'WAITING' ? 'Aguardando' : 'Fechado'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Oportunidades</p>
                <div className="space-y-2">
                  {activity.recentOpportunities.slice(0, 3).map((opportunity) => (
                    <div key={opportunity.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">
                          {opportunity.title}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          R$ {opportunity.value.toLocaleString('pt-BR')}
                        </span>
                      </div>
                      <Badge 
                        variant="outline" 
                        style={{ backgroundColor: `${opportunity.stage?.color}20`, color: opportunity.stage?.color }}
                      >
                        {opportunity.stage?.name}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cards de status rápido */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mensagens Hoje</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.todayMessages}</div>
            <p className="text-xs text-muted-foreground">
              Volume de mensagens nas últimas 24h
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.5%</div>
            <p className="text-xs text-muted-foreground">
              Leads convertidos em vendas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tempo Resp. Médio</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2min</div>
            <p className="text-xs text-muted-foreground">
              Tempo médio de primeira resposta
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
