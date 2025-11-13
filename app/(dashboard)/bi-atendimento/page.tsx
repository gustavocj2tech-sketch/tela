
'use client'

import { useState } from 'react'
import { 
  TrendingUp, 
  Filter, 
  Download,
  Calendar,
  MessageSquare,
  Clock,
  Users,
  BarChart3,
  PieChart,
  Activity
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

// Simple Bar Chart Component
function SimpleBarChart({ data, title }: { 
  data: Array<{ name: string; value: number }>; 
  title: string 
}) {
  const maxValue = Math.max(...data.map(d => d.value))
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-sm">
          <BarChart3 className="mr-2 h-4 w-4" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm font-medium">{item.name}</span>
              <div className="flex items-center space-x-2 flex-1 max-w-32 ml-4">
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${(item.value / maxValue) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium">{item.value}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// Simple Pie Chart Component
function SimplePieChart({ data, title }: { 
  data: Array<{ name: string; value: number; color: string }>; 
  title: string 
}) {
  const total = data.reduce((sum, item) => sum + item.value, 0)
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-sm">
          <PieChart className="mr-2 h-4 w-4" />
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

export default function BIAtendimentoPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('30d')
  const [selectedAttendant, setSelectedAttendant] = useState('')
  const [selectedChannel, setSelectedChannel] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')

  // Mock data for volume chart
  const volumeData = [
    { name: '01/06', total: 145, resolvidos: 132 },
    { name: '02/06', total: 167, resolvidos: 154 },
    { name: '03/06', total: 189, resolvidos: 175 },
    { name: '04/06', total: 203, resolvidos: 186 },
    { name: '05/06', total: 225, resolvidos: 208 },
    { name: '06/06', total: 198, resolvidos: 182 },
    { name: '07/06', total: 234, resolvidos: 217 }
  ]

  // Mock data for attendant performance
  const attendantData = [
    { name: 'Carlos Souza', value: 156 },
    { name: 'Ana Lima', value: 142 },
    { name: 'Maria Santos', value: 134 },
    { name: 'Roberto Silva', value: 98 },
    { name: 'Fernanda Costa', value: 87 }
  ]

  // Mock data for channel distribution
  const channelData = [
    { name: 'WhatsApp', value: 234, color: '#25D366' },
    { name: 'Website', value: 89, color: '#3B82F6' },
    { name: 'Email', value: 67, color: '#EF4444' },
    { name: 'Telefone', value: 45, color: '#F59E0B' },
    { name: 'Instagram', value: 32, color: '#E1306C' }
  ]

  // Mock data for hourly distribution
  const hourlyData = [
    { name: '08h', value: 12 },
    { name: '09h', value: 24 },
    { name: '10h', value: 45 },
    { name: '11h', value: 38 },
    { name: '12h', value: 28 },
    { name: '13h', value: 22 },
    { name: '14h', value: 52 },
    { name: '15h', value: 48 },
    { name: '16h', value: 41 },
    { name: '17h', value: 35 }
  ]

  // Mock detailed data
  const detailedData = [
    {
      id: 1,
      customer: 'Ana Silva',
      attendant: 'Carlos',
      channel: 'WhatsApp',
      startTime: '09:15',
      endTime: '09:32',
      duration: '17min',
      status: 'Resolvido',
      satisfaction: 5,
      tags: ['Dúvida', 'Produto']
    },
    {
      id: 2,
      customer: 'João Santos',
      attendant: 'Maria',
      channel: 'Website',
      startTime: '10:20',
      endTime: '10:45',
      duration: '25min',
      status: 'Resolvido',
      satisfaction: 4,
      tags: ['Suporte', 'Técnico']
    },
    {
      id: 3,
      customer: 'Pedro Costa',
      attendant: 'Ana',
      channel: 'WhatsApp',
      startTime: '11:10',
      endTime: '11:18',
      duration: '8min',
      status: 'Resolvido',
      satisfaction: 5,
      tags: ['Informação']
    },
    {
      id: 4,
      customer: 'Lucia Ferreira',
      attendant: 'Roberto',
      channel: 'Email',
      startTime: '14:30',
      endTime: '14:55',
      duration: '25min',
      status: 'Em andamento',
      satisfaction: null,
      tags: ['Reclamação']
    }
  ]

  const attendants = ['Carlos Souza', 'Ana Lima', 'Maria Santos', 'Roberto Silva', 'Fernanda Costa']
  const channels = ['WhatsApp', 'Website', 'Email', 'Telefone', 'Instagram']

  const handleExport = () => {
    // Mock export functionality
    alert('Exportando dados para CSV...')
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">BI - Relatórios de Atendimento</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Exportar CSV
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="mr-2 h-5 w-5" />
            Filtros Avançados
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
                  <SelectItem value="custom">Personalizado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Atendente</label>
              <Select value={selectedAttendant} onValueChange={setSelectedAttendant}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos</SelectItem>
                  {attendants.map(attendant => (
                    <SelectItem key={attendant} value={attendant}>
                      {attendant}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Canal</label>
              <Select value={selectedChannel} onValueChange={setSelectedChannel}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos</SelectItem>
                  {channels.map(channel => (
                    <SelectItem key={channel} value={channel}>
                      {channel}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Status</label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos</SelectItem>
                  <SelectItem value="resolvido">Resolvido</SelectItem>
                  <SelectItem value="andamento">Em andamento</SelectItem>
                  <SelectItem value="aguardando">Aguardando</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Volume Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="mr-2 h-5 w-5" />
            Volume de Atendimentos por Período
          </CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <OverviewChart data={volumeData} height={300} />
        </CardContent>
      </Card>

      {/* Analytics Charts */}
      <div className="grid gap-4 md:grid-cols-4">
        <SimpleBarChart data={attendantData} title="Por Atendente" />
        <SimplePieChart data={channelData} title="Por Canal" />
        <SimpleBarChart data={hourlyData} title="Por Horário" />
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-sm">
              <Activity className="mr-2 h-4 w-4" />
              Métricas Gerais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm">Tempo Médio</span>
              <span className="text-sm font-medium">18min 32s</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Taxa Resolução</span>
              <span className="text-sm font-medium">87.4%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">CSAT Médio</span>
              <span className="text-sm font-medium">4.3/5</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">First Response</span>
              <span className="text-sm font-medium">2min 45s</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Data Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageSquare className="mr-2 h-5 w-5" />
            Dados Detalhados
            <Badge variant="secondary" className="ml-2">
              {detailedData.length} registros
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Atendente</TableHead>
                <TableHead>Canal</TableHead>
                <TableHead>Início</TableHead>
                <TableHead>Fim</TableHead>
                <TableHead>Duração</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Avaliação</TableHead>
                <TableHead>Tags</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {detailedData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.customer}</TableCell>
                  <TableCell>{item.attendant}</TableCell>
                  <TableCell>{item.channel}</TableCell>
                  <TableCell>{item.startTime}</TableCell>
                  <TableCell>{item.endTime}</TableCell>
                  <TableCell>{item.duration}</TableCell>
                  <TableCell>
                    <Badge variant={
                      item.status === 'Resolvido' ? 'secondary' : 
                      item.status === 'Em andamento' ? 'default' : 'outline'
                    }>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {item.satisfaction ? `${item.satisfaction}/5` : '-'}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      {item.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
