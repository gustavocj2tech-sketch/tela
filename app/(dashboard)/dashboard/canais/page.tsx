
import { Suspense } from 'react'
import { 
  Radio, 
  TrendingUp, 
  MessageSquare, 
  CheckCircle,
  AlertTriangle,
  Eye,
  Send,
  Shield
} from 'lucide-react'
import { MetricCard } from '@/components/ui/metric-card'
import { OverviewChart } from '@/components/charts/overview-chart'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

export const dynamic = "force-dynamic"

// Channel Performance Component
function ChannelPerformanceCard({ channel }: { 
  channel: { 
    name: string; 
    icon: React.ReactNode; 
    messages: number; 
    deliveryRate: number; 
    readRate: number;
    status: 'connected' | 'warning' | 'error';
    quality: number;
  }
}) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-green-600 bg-green-100'
      case 'warning': return 'text-yellow-600 bg-yellow-100'
      case 'error': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-muted rounded-lg">
              {channel.icon}
            </div>
            <div>
              <h3 className="text-sm font-medium">{channel.name}</h3>
              <div className={`text-xs px-2 py-1 rounded-full mt-1 ${getStatusColor(channel.status)}`}>
                {channel.status === 'connected' ? 'Conectado' : 
                 channel.status === 'warning' ? 'Atenção' : 'Erro'}
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">{channel.messages}</p>
            <p className="text-xs text-muted-foreground">mensagens</p>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Taxa de Entrega</span>
              <span className="font-medium">{channel.deliveryRate}%</span>
            </div>
            <Progress value={channel.deliveryRate} className="h-2" />
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Taxa de Leitura</span>
              <span className="font-medium">{channel.readRate}%</span>
            </div>
            <Progress value={channel.readRate} className="h-2" />
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Qualidade</span>
              <span className="font-medium">{channel.quality}/100</span>
            </div>
            <Progress value={channel.quality} className="h-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

async function getChannelMetrics() {
  try {
    // Mock data since we have basic channel data in schema
    return {
      totalSent: 45780,
      deliveryRate: 94.2,
      readRate: 78.5,
      blocks: 3
    }
  } catch (error) {
    console.error('Error fetching channel metrics:', error)
    return {
      totalSent: 0,
      deliveryRate: 0,
      readRate: 0,
      blocks: 0
    }
  }
}

export default async function DashboardCanais() {
  const {
    totalSent,
    deliveryRate,
    readRate,
    blocks
  } = await getChannelMetrics()

  // Mock channel data
  const channels = [
    {
      name: 'WhatsApp Business',
      icon: <MessageSquare className="h-4 w-4 text-green-600" />,
      messages: 34500,
      deliveryRate: 96.8,
      readRate: 82.3,
      status: 'connected' as const,
      quality: 92
    },
    {
      name: 'Telegram',
      icon: <Send className="h-4 w-4 text-blue-600" />,
      messages: 8750,
      deliveryRate: 98.2,
      readRate: 75.6,
      status: 'connected' as const,
      quality: 88
    },
    {
      name: 'Instagram',
      icon: <Radio className="h-4 w-4 text-purple-600" />,
      messages: 2530,
      deliveryRate: 89.4,
      readRate: 68.2,
      status: 'warning' as const,
      quality: 76
    }
  ]

  // Mock performance data for chart
  const performanceData = [
    { name: 'Jan', whatsapp: 28400, telegram: 6200, instagram: 1800 },
    { name: 'Fev', whatsapp: 31200, telegram: 7100, instagram: 2100 },
    { name: 'Mar', whatsapp: 32800, telegram: 7800, instagram: 2200 },
    { name: 'Abr', whatsapp: 33900, telegram: 8200, instagram: 2400 },
    { name: 'Mai', whatsapp: 34100, telegram: 8500, instagram: 2500 },
    { name: 'Jun', whatsapp: 34500, telegram: 8750, instagram: 2530 }
  ]

  // WhatsApp Quality Metrics
  const whatsappQuality = [
    { metric: 'Quality Rating', value: 'High', score: 92, description: 'Excelente' },
    { metric: 'Phone Number Quality', value: 'Green', score: 95, description: 'Verificado' },
    { metric: 'Messaging Limit', value: '1000/dia', score: 85, description: 'Tier 2' },
    { metric: 'Template Status', value: '12 Aprovados', score: 90, description: '3 Pendentes' }
  ]

  // Mock delivery issues
  const deliveryIssues = [
    {
      channel: 'WhatsApp',
      issue: 'Templates rejeitados',
      severity: 'medium',
      count: 3,
      time: '2h atrás'
    },
    {
      channel: 'Instagram',
      issue: 'Taxa de entrega baixa',
      severity: 'high',
      count: 1,
      time: '4h atrás'
    }
  ]

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard Canais & Qualidade WA</h2>
      </div>

      {/* Channel Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Mensagens Enviadas"
          value={totalSent.toLocaleString('pt-BR')}
          description="Este mês"
          icon="Send"
          trend="+8.2%"
        />
        <MetricCard
          title="Taxa de Entrega"
          value={`${deliveryRate}%`}
          description="Geral todos os canais"
          icon="CheckCircle"
          trend="+1.8%"
        />
        <MetricCard
          title="Taxa de Leitura"
          value={`${readRate}%`}
          description="Mensagens visualizadas"
          icon="Eye"
          trend="+3.2%"
        />
        <MetricCard
          title="Bloqueios"
          value={blocks.toString()}
          description="Números bloqueados"
          icon="Shield"
          trend="0"
        />
      </div>

      {/* Channel Performance Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {channels.map((channel, index) => (
          <ChannelPerformanceCard key={index} channel={channel} />
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {/* Performance Chart */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Radio className="mr-2 h-5 w-5" />
              Performance por Canal (Últimos 6 Meses)
            </CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Suspense fallback={<div className="h-80 animate-pulse bg-muted rounded" />}>
              <OverviewChart 
                data={performanceData.map(item => ({
                  name: item.name,
                  total: item.whatsapp,
                  vendas: item.telegram,
                  leads: item.instagram
                }))} 
                height={320} 
              />
            </Suspense>
          </CardContent>
        </Card>

        {/* WhatsApp Quality */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="mr-2 h-5 w-5" />
              Qualidade WhatsApp
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {whatsappQuality.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{item.metric}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                  <Badge variant={item.score >= 90 ? 'secondary' : item.score >= 80 ? 'outline' : 'destructive'}>
                    {item.value}
                  </Badge>
                </div>
                <Progress value={item.score} className="h-1" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Recent Issues */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5" />
              Problemas Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {deliveryIssues.map((issue, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      issue.severity === 'high' ? 'bg-red-500' : 
                      issue.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`} />
                    <div>
                      <p className="text-sm font-medium">{issue.issue}</p>
                      <p className="text-xs text-muted-foreground">{issue.channel}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={issue.severity === 'high' ? 'destructive' : 'outline'}>
                      {issue.count}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{issue.time}</p>
                  </div>
                </div>
              ))}
              
              {deliveryIssues.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
                  <p className="text-sm">Nenhum problema detectado</p>
                  <p className="text-xs">Todos os canais funcionando perfeitamente</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Channel Health Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              Resumo de Saúde dos Canais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {channels.map((channel, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center space-x-3">
                  {channel.icon}
                  <div>
                    <p className="text-sm font-medium">{channel.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {channel.messages.toLocaleString('pt-BR')} msgs
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      channel.status === 'connected' ? 'bg-green-500' : 
                      channel.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                    }`} />
                    <span className="text-sm font-medium">{channel.quality}/100</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {channel.deliveryRate.toFixed(1)}% entrega
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
