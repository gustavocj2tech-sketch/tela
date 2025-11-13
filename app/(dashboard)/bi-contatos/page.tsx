
'use client'

import { useState } from 'react'
import { 
  PieChart as PieChartIcon, 
  Filter, 
  Download,
  Users,
  MapPin,
  Tags,
  Calendar,
  BarChart3,
  TrendingUp
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
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
import { Progress } from '@/components/ui/progress'

// Simple Pie Chart Component for distribution
function SimplePieChart({ data, title }: { 
  data: Array<{ name: string; value: number; color: string }>; 
  title: string 
}) {
  const total = data.reduce((sum, item) => sum + item.value, 0)
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-sm">
          <PieChartIcon className="mr-2 h-4 w-4" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
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
      </CardContent>
    </Card>
  )
}

// Geographic Distribution Component
function GeographicCard({ data }: { data: Array<{ state: string; count: number; percentage: number }> }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-sm">
          <MapPin className="mr-2 h-4 w-4" />
          Distribuição Geográfica
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="font-medium">{item.state}</span>
              <span>{item.count} contatos</span>
            </div>
            <Progress value={item.percentage} className="h-2" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default function BIContatosPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('30d')
  const [selectedOrigin, setSelectedOrigin] = useState('')
  const [selectedState, setSelectedState] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')

  // Mock data for growth chart
  const growthData = [
    { name: 'Jan', total: 1240, novos: 187 },
    { name: 'Fev', total: 1427, novos: 201 },
    { name: 'Mar', total: 1628, novos: 234 },
    { name: 'Abr', total: 1862, novos: 267 },
    { name: 'Mai', total: 2129, novos: 298 },
    { name: 'Jun', total: 2427, novos: 334 }
  ]

  // Mock data for origin distribution
  const originData = [
    { name: 'WhatsApp', value: 845, color: '#25D366' },
    { name: 'Site/Landing', value: 523, color: '#3B82F6' },
    { name: 'Indicação', value: 367, color: '#10B981' },
    { name: 'Redes Sociais', value: 298, color: '#E1306C' },
    { name: 'Google Ads', value: 234, color: '#F59E0B' },
    { name: 'Eventos', value: 160, color: '#8B5CF6' }
  ]

  // Mock geographic data
  const geographicData = [
    { state: 'São Paulo', count: 654, percentage: 26.9 },
    { state: 'Rio de Janeiro', count: 432, percentage: 17.8 },
    { state: 'Minas Gerais', count: 378, percentage: 15.6 },
    { state: 'Paraná', count: 245, percentage: 10.1 },
    { state: 'Santa Catarina', count: 198, percentage: 8.2 },
    { state: 'Outros', count: 520, percentage: 21.4 }
  ]

  // Mock tag analysis data
  const tagData = [
    { name: 'Potencial Cliente', value: 892, color: '#10B981' },
    { name: 'Cliente Ativo', value: 654, color: '#3B82F6' },
    { name: 'Lead Qualificado', value: 423, color: '#F59E0B' },
    { name: 'Reclamação', value: 234, color: '#EF4444' },
    { name: 'Suporte', value: 178, color: '#8B5CF6' },
    { name: 'Cancelado', value: 46, color: '#6B7280' }
  ]

  // Mock segmentation analysis
  const segmentationData = [
    {
      segment: 'Novos Contatos (0-30 dias)',
      count: 334,
      percentage: 13.8,
      conversion: 8.2,
      avgValue: 2450
    },
    {
      segment: 'Contatos Ativos (31-90 dias)',
      count: 567,
      percentage: 23.4,
      conversion: 15.6,
      avgValue: 3780
    },
    {
      segment: 'Contatos Estabelecidos (91-180 dias)',
      count: 445,
      percentage: 18.3,
      conversion: 22.1,
      avgValue: 4920
    },
    {
      segment: 'Contatos Antigos (180+ dias)',
      count: 1081,
      percentage: 44.5,
      conversion: 28.7,
      avgValue: 6150
    }
  ]

  const handleExport = () => {
    // Mock export functionality
    alert('Exportando relatório de contatos para CSV...')
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">BI - Relatórios de Contatos</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Exportar Relatório
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="mr-2 h-5 w-5" />
            Filtros de Análise
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Período</label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Últimos 7 dias</SelectItem>
                  <SelectItem value="30d">Últimos 30 dias</SelectItem>
                  <SelectItem value="90d">Últimos 90 dias</SelectItem>
                  <SelectItem value="1y">Último ano</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Origem</label>
              <Select value={selectedOrigin} onValueChange={setSelectedOrigin}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas as origens" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todas as origens</SelectItem>
                  <SelectItem value="whatsapp">WhatsApp</SelectItem>
                  <SelectItem value="site">Site/Landing</SelectItem>
                  <SelectItem value="indicacao">Indicação</SelectItem>
                  <SelectItem value="social">Redes Sociais</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Estado</label>
              <Select value={selectedState} onValueChange={setSelectedState}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos os estados" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos os estados</SelectItem>
                  <SelectItem value="SP">São Paulo</SelectItem>
                  <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                  <SelectItem value="MG">Minas Gerais</SelectItem>
                  <SelectItem value="PR">Paraná</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Status</label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos os status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos os status</SelectItem>
                  <SelectItem value="active">Ativo</SelectItem>
                  <SelectItem value="inactive">Inativo</SelectItem>
                  <SelectItem value="blocked">Bloqueado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Growth Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="mr-2 h-5 w-5" />
            Crescimento da Base de Contatos
          </CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <OverviewChart data={growthData} height={300} />
        </CardContent>
      </Card>

      {/* Distribution Charts */}
      <div className="grid gap-4 md:grid-cols-4">
        <SimplePieChart data={originData} title="Origem dos Contatos" />
        <GeographicCard data={geographicData} />
        <SimplePieChart data={tagData} title="Análise por Tags" />
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-sm">
              <Users className="mr-2 h-4 w-4" />
              Métricas Gerais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm">Total de Contatos</span>
              <span className="text-sm font-medium">2.427</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Novos este mês</span>
              <span className="text-sm font-medium text-green-600">+334</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Taxa Crescimento</span>
              <span className="text-sm font-medium">+15.9%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Contatos Ativos</span>
              <span className="text-sm font-medium">2.089</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Segmentation Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="mr-2 h-5 w-5" />
            Análise de Segmentação por Tempo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Segmento</TableHead>
                <TableHead>Quantidade</TableHead>
                <TableHead>% da Base</TableHead>
                <TableHead>Taxa de Conversão</TableHead>
                <TableHead>Ticket Médio</TableHead>
                <TableHead>Performance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {segmentationData.map((segment, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{segment.segment}</TableCell>
                  <TableCell>{segment.count.toLocaleString('pt-BR')}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {segment.percentage.toFixed(1)}%
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      segment.conversion > 25 ? 'secondary' : 
                      segment.conversion > 15 ? 'outline' : 'destructive'
                    }>
                      {segment.conversion.toFixed(1)}%
                    </Badge>
                  </TableCell>
                  <TableCell className="text-green-600 font-medium">
                    R$ {segment.avgValue.toLocaleString('pt-BR')}
                  </TableCell>
                  <TableCell>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${Math.min(segment.conversion * 3, 100)}%` }}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Insights and Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="mr-2 h-5 w-5" />
            Insights e Recomendações
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-green-50 border border-green-200">
              <h4 className="text-sm font-medium text-green-900 mb-1">
                🎯 Oportunidade: WhatsApp como canal principal
              </h4>
              <p className="text-xs text-green-700">
                34.8% dos contatos vêm do WhatsApp. Considere investir mais neste canal com campanhas direcionadas.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <h4 className="text-sm font-medium text-blue-900 mb-1">
                📍 Concentração Regional: São Paulo lidera
              </h4>
              <p className="text-xs text-blue-700">
                26.9% dos contatos são de SP. Explore oportunidades nos estados com menor representação.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-amber-50 border border-amber-200">
              <h4 className="text-sm font-medium text-amber-900 mb-1">
                ⏰ Retenção: Foque nos contatos estabelecidos
              </h4>
              <p className="text-xs text-amber-700">
                Contatos com 180+ dias têm 28.7% de conversão e maior ticket médio. Crie campanhas de reativação.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
