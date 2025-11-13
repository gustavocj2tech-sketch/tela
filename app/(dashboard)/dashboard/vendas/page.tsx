

import { 
  DollarSign, 
  TrendingUp, 
  Target, 
  Users,
  Calendar,
  BarChart3
} from 'lucide-react'
import { MetricCard } from '@/components/ui/metric-card'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { prisma } from '@/lib/db'

export const dynamic = "force-dynamic"

async function getSalesData() {
  try {
    const [
      totalRevenue,
      monthlyGoal,
      wonOpportunities,
      averageTicket,
      monthlyData
    ] = await Promise.all([
      prisma.opportunity.aggregate({
        where: { 
          status: 'WON',
          actualCloseDate: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
          }
        },
        _sum: { value: true },
        _count: true
      }),
      Promise.resolve(150000), // Meta mensal
      prisma.opportunity.findMany({
        where: { 
          status: 'WON',
          actualCloseDate: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
          }
        },
        include: { contact: true, user: true },
        orderBy: { actualCloseDate: 'desc' },
        take: 10
      }),
      prisma.opportunity.aggregate({
        where: { status: 'WON' },
        _avg: { value: true }
      }),
      // Dados mockados para os gráficos
      Promise.resolve([
        { name: 'Jan', vendas: 45000, meta: 50000 },
        { name: 'Fev', vendas: 52000, meta: 50000 },
        { name: 'Mar', vendas: 48000, meta: 50000 },
        { name: 'Abr', vendas: 61000, meta: 55000 },
        { name: 'Mai', vendas: 55000, meta: 55000 },
        { name: 'Jun', vendas: 67000, meta: 60000 },
        { name: 'Jul', vendas: 71000, meta: 65000 },
        { name: 'Ago', vendas: 58000, meta: 60000 },
        { name: 'Set', vendas: 63000, meta: 65000 },
        { name: 'Out', vendas: 69000, meta: 70000 },
        { name: 'Nov', vendas: 82000, meta: 75000 },
      ])
    ])

    const currentRevenue = totalRevenue?._sum?.value || 0
    const goalProgress = (currentRevenue / monthlyGoal) * 100

    return {
      currentRevenue,
      monthlyGoal,
      goalProgress,
      totalSales: totalRevenue?._count || 0,
      averageTicket: averageTicket?._avg?.value || 0,
      wonOpportunities: wonOpportunities || [],
      monthlyData: monthlyData || []
    }
  } catch (error) {
    console.error('Erro ao buscar dados de vendas:', error)
    return {
      currentRevenue: 0,
      monthlyGoal: 150000,
      goalProgress: 0,
      totalSales: 0,
      averageTicket: 0,
      wonOpportunities: [],
      monthlyData: []
    }
  }
}

const COLORS = ['#60B5FF', '#FF9149', '#FF9898', '#FF90BB', '#80D8C3', '#A19AD3']

function SalesChart({ data }: { data: any[] }) {
  return (
    <div className="h-[350px] space-y-4">
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="h-4 bg-blue-500 rounded flex items-center justify-center text-xs text-white">
          Vendas
        </div>
        <div className="h-4 bg-orange-500 rounded flex items-center justify-center text-xs text-white">
          Meta
        </div>
      </div>
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={item.name} className="flex items-center space-x-3">
            <div className="w-12 text-sm font-medium">{item.name}</div>
            <div className="flex-1 flex space-x-1">
              <div 
                className="bg-blue-500 rounded h-6 flex items-center justify-center text-xs text-white"
                style={{ width: `${(item.vendas / 100000) * 100}%` }}
              >
                R$ {(item.vendas / 1000).toFixed(0)}k
              </div>
              <div 
                className="bg-orange-500/20 border border-orange-500 rounded h-6 flex items-center justify-center text-xs"
                style={{ width: `${(item.meta / 100000) * 100}%` }}
              >
                R$ {(item.meta / 1000).toFixed(0)}k
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ProductChart({ data }: { data: any[] }) {
  const total = data.reduce((acc, item) => acc + item.vendas, 0)
  
  return (
    <div className="h-[200px] space-y-3">
      {data.map((item, index) => (
        <div key={item.name} className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div 
              className="w-4 h-4 rounded-full" 
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <span className="text-sm">{item.name}</span>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium">R$ {item.vendas.toLocaleString('pt-BR')}</div>
            <div className="text-xs text-muted-foreground">{item.value}%</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default async function DashboardVendasPage() {
  const salesData = await getSalesData()

  // Dados para gráfico de pizza dos produtos
  const productData = [
    { name: 'CRM Premium', value: 35, vendas: 45000 },
    { name: 'Automação WhatsApp', value: 25, vendas: 32000 },
    { name: 'Dashboard Analytics', value: 20, vendas: 26000 },
    { name: 'Chatbot IA', value: 15, vendas: 19000 },
    { name: 'Outros', value: 5, vendas: 8000 },
  ]

  // Ranking de vendedores
  const vendedores = [
    { nome: 'João Silva', vendas: 28, valor: 156000, meta: 150000 },
    { nome: 'Maria Santos', vendas: 24, valor: 142000, meta: 140000 },
    { nome: 'Pedro Costa', vendas: 19, valor: 118000, meta: 120000 },
    { nome: 'Ana Lima', vendas: 16, valor: 95000, meta: 100000 },
    { nome: 'Carlos Pereira', vendas: 12, valor: 78000, meta: 80000 },
  ]

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard de Vendas - Novembro/2025</h2>
        <div className="flex items-center space-x-2">
          <Badge variant="outline">
            <Calendar className="mr-1 h-3 w-3" />
            Novembro 2025
          </Badge>
        </div>
      </div>

      {/* Métricas principais de vendas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Receita do Mês"
          value={`R$ ${salesData.currentRevenue.toLocaleString('pt-BR')}`}
          description="Meta: R$ 150.000"
          icon="DollarSign"
          trend={{ value: 15, isPositive: true }}
        />
        <MetricCard
          title="Total de Vendas"
          value={salesData.totalSales}
          description="Oportunidades fechadas"
          icon="Target"
          trend={{ value: 8, isPositive: true }}
        />
        <MetricCard
          title="Ticket Médio"
          value={`R$ ${salesData.averageTicket.toLocaleString('pt-BR')}`}
          description="Valor médio por venda"
          icon="TrendingUp"
          trend={{ value: -3, isPositive: false }}
        />
        <MetricCard
          title="Progress da Meta"
          value={`${salesData.goalProgress.toFixed(1)}%`}
          description={`R$ ${(salesData.monthlyGoal - salesData.currentRevenue).toLocaleString('pt-BR')} restantes`}
          icon="BarChart3"
        />
      </div>

      {/* Meta do mês */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Meta Mensal - Novembro 2025
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Progresso da Meta</span>
              <span className="font-medium">{salesData.goalProgress.toFixed(1)}%</span>
            </div>
            <Progress value={salesData.goalProgress} className="h-2" />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>R$ {salesData.currentRevenue.toLocaleString('pt-BR')}</span>
              <span>Meta: R$ {salesData.monthlyGoal.toLocaleString('pt-BR')}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Vendas por Mês */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Vendas vs Meta - Evolução Anual</CardTitle>
          </CardHeader>
          <CardContent>
            <SalesChart data={salesData.monthlyData} />
          </CardContent>
        </Card>

        {/* Vendas por Produto */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Vendas por Produto</CardTitle>
          </CardHeader>
          <CardContent>
            <ProductChart data={productData} />
            
            <div className="mt-4 space-y-2">
              {productData.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span>{item.name}</span>
                  </div>
                  <span className="font-medium">R$ {item.vendas.toLocaleString('pt-BR')}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ranking de Vendedores */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Ranking de Vendedores
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {vendedores.map((vendedor, index) => (
                <div key={vendedor.nome} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                      index === 0 ? 'bg-yellow-500' : 
                      index === 1 ? 'bg-gray-400' : 
                      index === 2 ? 'bg-orange-600' : 'bg-muted'
                    }`}>
                      <span className="text-xs font-bold text-white">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium">{vendedor.nome}</p>
                      <p className="text-sm text-muted-foreground">{vendedor.vendas} vendas</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">R$ {vendedor.valor.toLocaleString('pt-BR')}</p>
                    <Badge variant={vendedor.valor >= vendedor.meta ? "default" : "secondary"}>
                      {((vendedor.valor / vendedor.meta) * 100).toFixed(0)}% da meta
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Vendas Recentes */}
        <Card>
          <CardHeader>
            <CardTitle>Vendas Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {salesData.wonOpportunities.slice(0, 5).map((opportunity) => (
                <div key={opportunity.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{opportunity.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {opportunity.contact?.name} • {opportunity.user?.name}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">R$ {opportunity.value.toLocaleString('pt-BR')}</p>
                    <p className="text-xs text-muted-foreground">
                      {opportunity.actualCloseDate?.toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
