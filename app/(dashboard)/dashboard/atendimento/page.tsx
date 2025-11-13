
import { Suspense } from 'react'
import { 
  MessageSquare, 
  Clock, 
  TrendingUp,
  Users,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Activity
} from 'lucide-react'
import { MetricCard } from '@/components/ui/metric-card'
import { OverviewChart } from '@/components/charts/overview-chart'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { prisma } from '@/lib/db'

export const dynamic = "force-dynamic"

async function getAttendanceMetrics() {
  try {
    const [
      totalAttendances,
      activeAttendances,
      averageTime,
      resolutionRate,
      recentAttendances
    ] = await Promise.all([
      prisma.conversation.count(),
      prisma.conversation.count({ where: { status: 'ACTIVE' } }),
      25, // Mock average time in minutes
      87, // Mock resolution rate percentage
      prisma.conversation.findMany({
        take: 5,
        orderBy: { updatedAt: 'desc' },
        include: {
          contact: true,
          _count: { select: { messages: true } }
        }
      })
    ])

    return {
      totalAttendances,
      activeAttendances,
      averageTime,
      resolutionRate,
      recentAttendances
    }
  } catch (error) {
    console.error('Error fetching attendance metrics:', error)
    return {
      totalAttendances: 0,
      activeAttendances: 0,
      averageTime: 0,
      resolutionRate: 0,
      recentAttendances: []
    }
  }
}

export default async function DashboardAtendimento() {
  const {
    totalAttendances,
    activeAttendances,
    averageTime,
    resolutionRate,
    recentAttendances
  } = await getAttendanceMetrics()

  // Mock data for charts
  const evolutionData = [
    { name: 'Jan', total: 120, resolvidos: 98 },
    { name: 'Fev', total: 145, resolvidos: 125 },
    { name: 'Mar', total: 167, resolvidos: 142 },
    { name: 'Abr', total: 189, resolvidos: 165 },
    { name: 'Mai', total: 203, resolvidos: 178 },
    { name: 'Jun', total: 225, resolvidos: 196 }
  ]

  const peakHoursData = [
    { name: '08h', atendimentos: 12 },
    { name: '09h', atendimentos: 24 },
    { name: '10h', atendimentos: 45 },
    { name: '11h', atendimentos: 38 },
    { name: '12h', atendimentos: 28 },
    { name: '13h', atendimentos: 22 },
    { name: '14h', atendimentos: 52 },
    { name: '15h', atendimentos: 48 },
    { name: '16h', atendimentos: 41 },
    { name: '17h', atendimentos: 35 },
    { name: '18h', atendimentos: 29 }
  ]

  const attendantData = [
    { name: 'Ana Silva', atendimentos: 45 },
    { name: 'Carlos Souza', atendimentos: 38 },
    { name: 'Maria Santos', atendimentos: 42 },
    { name: 'João Lima', atendimentos: 35 },
    { name: 'Fernanda Costa', atendimentos: 28 }
  ]

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard de Atendimento</h2>
      </div>

      {/* Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total de Atendimentos"
          value={totalAttendances?.toString() || '0'}
          description="Este mês"
          icon="MessageSquare"
          trend="+12.5%"
        />
        <MetricCard
          title="Tempo Médio"
          value={`${averageTime}min`}
          description="De resposta"
          icon="Clock"
          trend="-2.1%"
        />
        <MetricCard
          title="Taxa de Resolução"
          value={`${resolutionRate}%`}
          description="Problemas resolvidos"
          icon="CheckCircle"
          trend="+5.2%"
        />
        <MetricCard
          title="Atendimentos Ativos"
          value={activeAttendances?.toString() || '0'}
          description="Em andamento"
          icon="Activity"
          badge="LIVE"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Evolution Chart */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5" />
              Evolução de Atendimentos
            </CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Suspense fallback={<div className="h-80 animate-pulse bg-muted rounded" />}>
              <OverviewChart data={evolutionData} height={320} />
            </Suspense>
          </CardContent>
        </Card>

        {/* Attendant Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5" />
              Por Atendente
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {attendantData?.map((attendant, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {attendant.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {attendant.atendimentos} atendimentos
                  </p>
                </div>
                <Progress 
                  value={(attendant.atendimentos / 50) * 100} 
                  className="w-16 h-2" 
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Attendances Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="mr-2 h-5 w-5" />
            Atendimentos Recentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAttendances?.map((attendance) => (
              <div key={attendance.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                <div className="space-y-1">
                  <p className="text-sm font-medium">
                    {attendance.contact?.name || 'Cliente sem nome'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    WhatsApp: {attendance.contact?.whatsapp || 'N/A'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {attendance._count?.messages || 0} mensagens
                  </p>
                </div>
                <div className="text-right space-y-1">
                  <Badge variant={
                    attendance.status === 'ACTIVE' ? 'default' : 
                    attendance.status === 'CLOSED' ? 'secondary' : 'outline'
                  }>
                    {attendance.status === 'ACTIVE' ? 'Ativo' : 
                     attendance.status === 'CLOSED' ? 'Fechado' : 'Aguardando'}
                  </Badge>
                  <p className="text-xs text-muted-foreground">
                    {new Date(attendance.updatedAt).toLocaleDateString('pt-BR')}
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
