
import { Suspense } from 'react'
import { 
  Zap, 
  TrendingUp, 
  DollarSign, 
  Cpu,
  MessageSquare,
  Bot,
  BarChart3,
  AlertTriangle
} from 'lucide-react'
import { MetricCard } from '@/components/ui/metric-card'
import { OverviewChart } from '@/components/charts/overview-chart'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

export const dynamic = "force-dynamic"

// Simple Pie Chart for AI Usage
function AIUsagePieChart({ data }: { data: Array<{ name: string; value: number; color: string }> }) {
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

async function getCreditsMetrics() {
  try {
    // Mock data since we don't have credits tables in schema
    return {
      availableCredits: 125000,
      monthlyConsumption: 18750,
      aiSavings: 45600,
      forecast: 23400
    }
  } catch (error) {
    console.error('Error fetching credits metrics:', error)
    return {
      availableCredits: 0,
      monthlyConsumption: 0,
      aiSavings: 0,
      forecast: 0
    }
  }
}

export default async function DashboardCreditos() {
  const {
    availableCredits,
    monthlyConsumption,
    aiSavings,
    forecast
  } = await getCreditsMetrics()

  // Mock consumption data for chart
  const consumptionData = [
    { name: 'Jan', total: 15400, ia: 8200 },
    { name: 'Fev', total: 16800, ia: 9100 },
    { name: 'Mar', total: 17200, ia: 9800 },
    { name: 'Abr', total: 18100, ia: 10500 },
    { name: 'Mai', total: 18900, ia: 11200 },
    { name: 'Jun', total: 18750, ia: 10800 }
  ]

  // Mock AI usage by functionality
  const aiUsageData = [
    { name: 'Chatbot Automático', value: 4200, color: '#3B82F6' },
    { name: 'Análise de Sentimento', value: 2800, color: '#10B981' },
    { name: 'Sugestões de Resposta', value: 1900, color: '#F59E0B' },
    { name: 'Classificação Automática', value: 1400, color: '#EF4444' },
    { name: 'Resumo de Conversas', value: 500, color: '#8B5CF6' }
  ]

  // Mock usage history by category
  const usageHistory = [
    { category: 'WhatsApp API', credits: 5400, percentage: 28.8 },
    { category: 'IA - Chatbot', credits: 4200, percentage: 22.4 },
    { category: 'IA - Análise', credits: 2800, percentage: 14.9 },
    { category: 'SMS', credits: 2100, percentage: 11.2 },
    { category: 'Email', credits: 1850, percentage: 9.9 },
    { category: 'Outros', credits: 2400, percentage: 12.8 }
  ]

  // Mock forecast data
  const forecastData = [
    { service: 'WhatsApp API', current: 5400, forecast: 6200, trend: 'up' },
    { service: 'IA Features', current: 7000, forecast: 8100, trend: 'up' },
    { service: 'SMS', current: 2100, forecast: 1950, trend: 'down' },
    { service: 'Email', current: 1850, forecast: 2000, trend: 'up' }
  ]

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard Créditos & IA</h2>
        <Badge variant="outline" className="text-sm">
          Atualizado há 15 min
        </Badge>
      </div>

      {/* Credits Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Créditos Disponíveis"
          value={availableCredits.toLocaleString('pt-BR')}
          description="Saldo atual"
          icon="Zap"
          trend={availableCredits > 100000 ? 'HIGH' : 'MEDIUM'}
        />
        <MetricCard
          title="Consumo Mensal"
          value={monthlyConsumption.toLocaleString('pt-BR')}
          description="Créditos utilizados"
          icon="TrendingUp"
          trend="+12.3%"
        />
        <MetricCard
          title="Economia com IA"
          value={`R$ ${aiSavings.toLocaleString('pt-BR')}`}
          description="Economizado este mês"
          icon="DollarSign"
          trend="+18.7%"
        />
        <MetricCard
          title="Previsão"
          value={forecast.toLocaleString('pt-BR')}
          description="Próximo mês"
          icon="BarChart3"
          trend="+24.9%"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {/* Consumption Chart */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5" />
              Consumo de Créditos (Últimos 6 Meses)
            </CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Suspense fallback={<div className="h-80 animate-pulse bg-muted rounded" />}>
              <OverviewChart data={consumptionData} height={320} />
            </Suspense>
          </CardContent>
        </Card>

        {/* AI Usage Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bot className="mr-2 h-5 w-5" />
              Uso de IA por Função
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AIUsagePieChart data={aiUsageData} />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Usage History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Cpu className="mr-2 h-5 w-5" />
              Histórico de Uso por Categoria
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {usageHistory.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{item.category}</span>
                  <div className="text-right">
                    <span className="text-sm font-medium">{item.credits.toLocaleString('pt-BR')}</span>
                    <p className="text-xs text-muted-foreground">{item.percentage.toFixed(1)}%</p>
                  </div>
                </div>
                <Progress value={item.percentage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Forecast */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              Previsão de Consumo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {forecastData.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="space-y-1">
                  <p className="text-sm font-medium">{item.service}</p>
                  <p className="text-xs text-muted-foreground">
                    Atual: {item.current.toLocaleString('pt-BR')} créditos
                  </p>
                </div>
                <div className="text-right space-y-1">
                  <p className="text-sm font-medium">
                    {item.forecast.toLocaleString('pt-BR')}
                  </p>
                  <Badge variant={item.trend === 'up' ? 'secondary' : 'outline'} className="text-xs">
                    {item.trend === 'up' ? '↗' : '↘'} 
                    {item.trend === 'up' ? 
                      `+${(((item.forecast - item.current) / item.current) * 100).toFixed(1)}%` :
                      `${(((item.forecast - item.current) / item.current) * 100).toFixed(1)}%`
                    }
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="mr-2 h-5 w-5" />
            Recomendações de Otimização
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <div className="flex items-start space-x-3">
                <div className="p-1 bg-blue-100 rounded">
                  <Bot className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-900">
                    Otimize o uso do Chatbot
                  </p>
                  <p className="text-xs text-blue-700 mt-1">
                    Configurar mais respostas automáticas pode reduzir o consumo de créditos em 15-20%.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-green-50 border border-green-200">
              <div className="flex items-start space-x-3">
                <div className="p-1 bg-green-100 rounded">
                  <MessageSquare className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-green-900">
                    Templates de WhatsApp
                  </p>
                  <p className="text-xs text-green-700 mt-1">
                    Usar mais templates aprovados pode economizar até 40% nos custos de WhatsApp.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-amber-50 border border-amber-200">
              <div className="flex items-start space-x-3">
                <div className="p-1 bg-amber-100 rounded">
                  <Zap className="h-4 w-4 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-amber-900">
                    Plano de Créditos
                  </p>
                  <p className="text-xs text-amber-700 mt-1">
                    Com o crescimento atual, considere upgrade para plano com desconto por volume.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
