
'use client'

import { useState, useEffect } from 'react'
import { 
  Activity, 
  Clock, 
  Users, 
  MessageSquare,
  AlertCircle,
  CheckCircle,
  Zap,
  Phone
} from 'lucide-react'
import { MetricCard } from '@/components/ui/metric-card'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

// Simulate real-time data updates
function useRealTimeData() {
  const [data, setData] = useState({
    activeAttendances: 23,
    waitingQueue: 8,
    averageResponseTime: 2.4,
    onlineAttendants: 12,
    totalAttendants: 15
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => ({
        ...prev,
        activeAttendances: prev.activeAttendances + Math.floor(Math.random() * 3) - 1,
        waitingQueue: Math.max(0, prev.waitingQueue + Math.floor(Math.random() * 3) - 1),
        averageResponseTime: Math.max(0.5, prev.averageResponseTime + (Math.random() * 0.4) - 0.2),
        onlineAttendants: Math.min(15, Math.max(8, prev.onlineAttendants + Math.floor(Math.random() * 3) - 1))
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return data
}

export default function DashboardOperacaoAoVivo() {
  const { 
    activeAttendances, 
    waitingQueue, 
    averageResponseTime, 
    onlineAttendants, 
    totalAttendants 
  } = useRealTimeData()

  // Mock real-time attendances
  const liveAttendances = [
    { id: 1, customer: 'Ana Silva', attendant: 'Carlos', duration: '00:05:23', status: 'active', priority: 'high' },
    { id: 2, customer: 'João Santos', attendant: 'Maria', duration: '00:12:45', status: 'active', priority: 'medium' },
    { id: 3, customer: 'Pedro Costa', attendant: 'Ana', duration: '00:02:18', status: 'active', priority: 'low' },
    { id: 4, customer: 'Lucia Ferreira', attendant: 'Roberto', duration: '00:08:56', status: 'active', priority: 'high' },
    { id: 5, customer: 'Marco Oliveira', attendant: 'Fernanda', duration: '00:15:32', status: 'active', priority: 'medium' },
    { id: 6, customer: 'Julia Rocha', attendant: 'André', duration: '00:03:41', status: 'active', priority: 'low' }
  ]

  // Mock attendant status
  const attendantStatus = [
    { name: 'Carlos Souza', status: 'online', attendances: 3, avgTime: '00:08:45' },
    { name: 'Maria Santos', status: 'online', attendances: 2, avgTime: '00:12:30' },
    { name: 'Ana Lima', status: 'online', attendances: 4, avgTime: '00:06:15' },
    { name: 'Roberto Silva', status: 'online', attendances: 1, avgTime: '00:08:56' },
    { name: 'Fernanda Costa', status: 'online', attendances: 2, avgTime: '00:11:22' },
    { name: 'André Oliveira', status: 'online', attendances: 3, avgTime: '00:09:08' },
    { name: 'Patricia Rocha', status: 'away', attendances: 0, avgTime: '00:00:00' },
    { name: 'Lucas Santos', status: 'offline', attendances: 0, avgTime: '00:00:00' }
  ]

  // Mock waiting queue
  const waitingQueueData = [
    { id: 1, customer: 'Cliente A', waitTime: '00:02:15', priority: 'high' },
    { id: 2, customer: 'Cliente B', waitTime: '00:01:45', priority: 'medium' },
    { id: 3, customer: 'Cliente C', waitTime: '00:00:52', priority: 'low' },
    { id: 4, customer: 'Cliente D', waitTime: '00:03:28', priority: 'high' }
  ]

  // Mock activity heatmap data (hours of the day)
  const activityHeatmap = Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    activity: Math.floor(Math.random() * 100)
  }))

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard Operação ao Vivo</h2>
        <Badge variant="default" className="animate-pulse">
          <Activity className="mr-1 h-3 w-3" />
          AO VIVO
        </Badge>
      </div>

      {/* Real-time Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Atendimentos Ativos"
          value={activeAttendances.toString()}
          description="Em tempo real"
          icon="MessageSquare"
          badge="LIVE"
        />
        <MetricCard
          title="Fila de Espera"
          value={waitingQueue.toString()}
          description="Aguardando atendimento"
          icon="Clock"
          trend={waitingQueue > 5 ? 'HIGH' : 'NORMAL'}
        />
        <MetricCard
          title="Tempo Médio Atual"
          value={`${averageResponseTime.toFixed(1)}min`}
          description="De resposta"
          icon="Zap"
          trend={averageResponseTime < 3 ? 'GOOD' : 'WARNING'}
        />
        <MetricCard
          title="Atendentes Online"
          value={`${onlineAttendants}/${totalAttendants}`}
          description="Disponíveis agora"
          icon="Users"
          trend={`${((onlineAttendants/totalAttendants)*100).toFixed(0)}%`}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Live Attendances */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="mr-2 h-5 w-5" />
              Atendimentos em Andamento
              <Badge variant="secondary" className="ml-2">{activeAttendances}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {liveAttendances.slice(0, 6).map((attendance) => (
                <div key={attendance.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      attendance.priority === 'high' ? 'bg-red-500' : 
                      attendance.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`} />
                    <div>
                      <p className="text-sm font-medium">{attendance.customer}</p>
                      <p className="text-xs text-muted-foreground">
                        Atendente: {attendance.attendant}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="text-xs">
                      {attendance.duration}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1 capitalize">
                      {attendance.priority}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Waiting Queue */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5" />
              Fila de Espera
              <Badge variant={waitingQueue > 5 ? "destructive" : "secondary"} className="ml-2">
                {waitingQueue}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {waitingQueueData.slice(0, 4).map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      item.priority === 'high' ? 'bg-red-500' : 
                      item.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`} />
                    <span className="text-sm font-medium">{item.customer}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium">{item.waitTime}</p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {item.priority}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Attendant Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5" />
              Status dos Atendentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {attendantStatus.map((attendant, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      attendant.status === 'online' ? 'bg-green-500' : 
                      attendant.status === 'away' ? 'bg-yellow-500' : 'bg-gray-500'
                    }`} />
                    <div>
                      <p className="text-sm font-medium">{attendant.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {attendant.status === 'online' ? 'Online' : 
                         attendant.status === 'away' ? 'Ausente' : 'Offline'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{attendant.attendances} ativos</p>
                    <p className="text-xs text-muted-foreground">{attendant.avgTime}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Activity Heatmap */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="mr-2 h-5 w-5" />
              Mapa de Calor (24h)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-12 gap-1">
              {activityHeatmap.map((item, index) => (
                <div
                  key={index}
                  className={`aspect-square rounded-sm ${
                    item.activity > 80 ? 'bg-red-500' :
                    item.activity > 60 ? 'bg-orange-500' :
                    item.activity > 40 ? 'bg-yellow-500' :
                    item.activity > 20 ? 'bg-blue-500' :
                    'bg-gray-200'
                  }`}
                  title={`${item.hour}h: ${item.activity}% atividade`}
                />
              ))}
            </div>
            <div className="flex justify-between items-center mt-4 text-xs text-muted-foreground">
              <span>00h</span>
              <span>06h</span>
              <span>12h</span>
              <span>18h</span>
              <span>23h</span>
            </div>
            <div className="flex items-center justify-center space-x-4 mt-3 text-xs">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-gray-200 rounded-sm" />
                <span>Baixo</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-blue-500 rounded-sm" />
                <span>Médio</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-yellow-500 rounded-sm" />
                <span>Alto</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-red-500 rounded-sm" />
                <span>Crítico</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
