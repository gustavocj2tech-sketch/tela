
import { Suspense } from 'react'
import { 
  DollarSign, 
  TrendingUp, 
  Calendar,
  PieChart,
  BarChart3,
  AlertCircle,
  Zap
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { OverviewChart } from '@/components/charts/overview-chart'
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { prisma } from '@/lib/db'

export const dynamic = "force-dynamic"

// Simple Cost Distribution Chart
function CostDistributionChart({ data }: { data: Array<{ name: string; value: number; color: string }> }) {
  const total = data.reduce((sum, item) => sum + item.value, 0)
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-sm">
          <PieChart className="mr-2 h-4 w-4" />
          Distribuição de Custos
        </CardTitle>
      </CardHeader>
      <CardContent>
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
                <div className="text-sm font-bold text-red-600">
                  R$ {item.value.toLocaleString('pt-BR')}
                </div>
                <div className="text-xs text-muted-foreground">
                  {((item.value / total) * 100).toFixed(1)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

async function getCostMetrics() {
  try {
    const costs = await prisma.cost.findMany({
      orderBy: { date: 'desc' },
      take: 30
    })

    const totalCost = costs.reduce((sum, cost) => sum + cost.amount, 0)
    const averageCost = costs.length > 0 ? totalCost / costs.length : 0
    
    // Mock calculations for other metrics
    const costPerAttendance = 12.45
    const savings = 2340.50

    return {
      totalCost,
      averageCost,
      costPerAttendance,
      savings,
      costs
    }
  } catch (error) {
    console.error('Error fetching cost metrics:', error)
    return {
      totalCost: 0,
      averageCost: 0,
      costPerAttendance: 0,
      savings: 0,
      costs: []
    }
  }
}

export default async function CustosPage() {
  const {
    totalCost,
    averageCost,
    costPerAttendance,
    savings,
    costs
  } = await getCostMetrics()

  // Mock evolution data for chart
  const evolutionData = [
    { name: 'Jan', total: 4580, whatsapp: 2340, sms: 890, ia: 1350 },
    { name: 'Fev', total: 4920, whatsapp: 2560, sms: 920, ia: 1440 },
    { name: 'Mar', total: 5240, whatsapp: 2780, sms: 980, ia: 1480 },
    { name: 'Abr', total: 5680, whatsapp: 2950, sms: 1050, ia: 1680 },
    { name: 'Mai', total: 5890, whatsapp: 3140, sms: 1080, ia: 1670 },
    { name: 'Jun', total: 6120, whatsapp: 3280, sms: 1120, ia: 1720 }
  ]

  // Mock cost distribution
  const costDistribution = [
    { name: 'WhatsApp Business API', value: 3280, color: '#25D366' },
    { name: 'IA e Automação', value: 1720, color: '#3B82F6' },
    { name: 'SMS', value: 1120, color: '#F59E0B' },
    { name: 'Armazenamento', value: 680, color: '#8B5CF6' },
    { name: 'Infraestrutura', value: 520, color: '#EF4444' },
    { name: 'Outros', value: 340, color: '#6B7280' }
  ]

  // Mock detailed costs
  const detailedCosts = [
    {
      service: 'WhatsApp Business API',
      type: 'Mensagem',
      unitCost: 0.045,
      quantity: 72890,
      total: 3280.05,
      trend: '+8.2%',
      description: 'Mensagens enviadas via WhatsApp'
    },
    {
      service: 'Chatbot IA',
      type: 'Processamento',
      unitCost: 0.12,
      quantity: 14330,
      total: 1719.60,
      trend: '+12.5%',
      description: 'Processamento de linguagem natural'
    },
    {
      service: 'SMS Brasil',
      type: 'Mensagem',
      unitCost: 0.08,
      quantity: 14000,
      total: 1120.00,
      trend: '+3.1%',
      description: 'SMS para validação e campanhas'
    },
    {
      service: 'Cloud Storage',
      type: 'Armazenamento',
      unitCost: 0.023,
      quantity: 29565,
      total: 679.99,
      trend: '+15.3%',
      description: 'Armazenamento de mídia e dados'
    },
    {
      service: 'Servidor/Hosting',
      type: 'Infraestrutura',
      unitCost: 520.00,
      quantity: 1,
      total: 520.00,
      trend: '0%',
      description: 'Hospedagem e servidores'
    }
  ]

  // Cost per attendance calculation
  const totalAttendances = 4567 // Mock total attendances
  const actualCostPerAttendance = totalCost / totalAttendances

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Gestão de Custos</h2>
        <div className="flex items-center space-x-2">
          <Select defaultValue="30d">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">7 dias</SelectItem>
              <SelectItem value="30d">30 dias</SelectItem>
              <SelectItem value="90d">90 dias</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Personalizar
          </Button>
        </div>
      </div>

      {/* Cost Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Custo Total</p>
                <p className="text-2xl font-bold text-red-600">
                  R$ {(totalCost || 6120).toLocaleString('pt-BR')}
                </p>
                <p className="text-xs text-muted-foreground">Este mês</p>
              </div>
              <div className="p-2 bg-red-100 rounded-full">
                <DollarSign className="h-4 w-4 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Custo/Atendimento</p>
                <p className="text-2xl font-bold">
                  R$ {(actualCostPerAttendance || 12.45).toFixed(2)}
                </p>
                <p className="text-xs text-green-600">-2.1% vs mês anterior</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <BarChart3 className="h-4 w-4 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Maior Custo</p>
                <p className="text-2xl font-bold text-red-600">
                  R$ 3.280
                </p>
                <p className="text-xs text-muted-foreground">WhatsApp API</p>
              </div>
              <div className="p-2 bg-yellow-100 rounded-full">
                <AlertCircle className="h-4 w-4 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Economia</p>
                <p className="text-2xl font-bold text-green-600">
                  R$ {(savings || 2340).toLocaleString('pt-BR')}
                </p>
                <p className="text-xs text-muted-foreground">Com automação</p>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <Zap className="h-4 w-4 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {/* Evolution Chart */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              Evolução Mensal de Custos
            </CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Suspense fallback={<div className="h-80 animate-pulse bg-muted rounded" />}>
              <OverviewChart 
                data={evolutionData.map(item => ({
                  name: item.name,
                  total: item.total / 1000, // Convert to thousands for better visualization
                  vendas: item.whatsapp / 1000
                }))} 
                height={320} 
              />
            </Suspense>
          </CardContent>
        </Card>

        {/* Cost Distribution */}
        <CostDistributionChart data={costDistribution} />
      </div>

      {/* Detailed Costs Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <DollarSign className="mr-2 h-5 w-5" />
            Detalhamento de Custos por Serviço
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Serviço</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Custo Unitário</TableHead>
                <TableHead>Quantidade</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Tendência</TableHead>
                <TableHead>Descrição</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {detailedCosts.map((cost, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{cost.service}</TableCell>
                  <TableCell>{cost.type}</TableCell>
                  <TableCell>R$ {cost.unitCost.toFixed(3)}</TableCell>
                  <TableCell>{cost.quantity.toLocaleString('pt-BR')}</TableCell>
                  <TableCell className="font-bold text-red-600">
                    R$ {cost.total.toLocaleString('pt-BR')}
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      cost.trend.startsWith('+') ? 'destructive' : 
                      cost.trend.startsWith('-') ? 'secondary' : 'outline'
                    }>
                      {cost.trend}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {cost.description}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Cost Optimization Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="mr-2 h-5 w-5" />
            Recomendações de Otimização
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-green-50 border border-green-200">
              <h4 className="text-sm font-medium text-green-900 mb-1">
                💰 Economia Potencial: Templates WhatsApp
              </h4>
              <p className="text-xs text-green-700">
                Usar mais templates pré-aprovados pode reduzir custos de WhatsApp em até 30%. 
                Economia estimada: R$ 984/mês.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <h4 className="text-sm font-medium text-blue-900 mb-1">
                🤖 IA Otimizada: Automatize mais processos
              </h4>
              <p className="text-xs text-blue-700">
                Aumentar automação pode reduzir custos operacionais. Invista R$ 200 em IA para economizar R$ 800 em atendimento manual.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-amber-50 border border-amber-200">
              <h4 className="text-sm font-medium text-amber-900 mb-1">
                📊 Monitoramento: Storage cresce rapidamente
              </h4>
              <p className="text-xs text-amber-700">
                Crescimento de 15.3% no armazenamento. Implemente política de limpeza de arquivos antigos para controlar custos.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
