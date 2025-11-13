
'use client'

import { useState } from 'react'
import { 
  Radio, 
  Plus, 
  Settings,
  Zap,
  AlertCircle,
  CheckCircle,
  XCircle,
  Activity,
  MoreVertical
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog'
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'

// Mock channels data
const mockChannels = [
  {
    id: 1,
    name: 'WhatsApp Business',
    type: 'whatsapp',
    status: 'connected',
    lastConnection: '2024-06-15T10:30:00',
    messagesTotal: 34567,
    messagesMonth: 8945,
    deliveryRate: 96.8,
    errorCount: 12,
    webhook: 'https://api.techbot.com/webhook/whatsapp',
    config: {
      phoneNumber: '+55 11 99999-0000',
      businessName: 'TechBot Solutions',
      verified: true
    }
  },
  {
    id: 2,
    name: 'Telegram Bot',
    type: 'telegram',
    status: 'connected',
    lastConnection: '2024-06-15T10:25:00',
    messagesTotal: 12340,
    messagesMonth: 2890,
    deliveryRate: 98.2,
    errorCount: 5,
    webhook: 'https://api.techbot.com/webhook/telegram',
    config: {
      botToken: '1234567890:ABC***',
      botName: '@techbot_support',
      verified: true
    }
  },
  {
    id: 3,
    name: 'Instagram Direct',
    type: 'instagram',
    status: 'warning',
    lastConnection: '2024-06-15T08:15:00',
    messagesTotal: 5670,
    messagesMonth: 1234,
    deliveryRate: 89.4,
    errorCount: 23,
    webhook: 'https://api.techbot.com/webhook/instagram',
    config: {
      accountId: '@techbot_oficial',
      accessToken: 'IGQVJXa***',
      verified: false
    }
  },
  {
    id: 4,
    name: 'Email Gateway',
    type: 'email',
    status: 'connected',
    lastConnection: '2024-06-15T10:28:00',
    messagesTotal: 8900,
    messagesMonth: 1567,
    deliveryRate: 94.1,
    errorCount: 8,
    webhook: 'https://api.techbot.com/webhook/email',
    config: {
      smtpServer: 'smtp.gmail.com',
      emailFrom: 'contato@techbot.com',
      verified: true
    }
  },
  {
    id: 5,
    name: 'Website Chat',
    type: 'website',
    status: 'error',
    lastConnection: '2024-06-14T15:22:00',
    messagesTotal: 2340,
    messagesMonth: 456,
    deliveryRate: 78.5,
    errorCount: 67,
    webhook: 'https://api.techbot.com/webhook/website',
    config: {
      domain: 'techbot.com',
      widgetId: 'widget_12345',
      verified: false
    }
  }
]

const channelIcons = {
  whatsapp: '📱',
  telegram: '✈️',
  instagram: '📷',
  email: '✉️',
  website: '🌐'
}

const statusColors = {
  connected: 'text-green-600 bg-green-100',
  warning: 'text-yellow-600 bg-yellow-100',
  error: 'text-red-600 bg-red-100',
  disconnected: 'text-gray-600 bg-gray-100'
}

function ChannelCard({ channel }: { channel: any }) {
  const [isConfigOpen, setIsConfigOpen] = useState(false)
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="h-4 w-4" />
      case 'warning': return <AlertCircle className="h-4 w-4" />
      case 'error': return <XCircle className="h-4 w-4" />
      default: return <XCircle className="h-4 w-4" />
    }
  }

  const handleConnect = () => {
    alert(`Conectando canal: ${channel.name}`)
  }

  const handleDisconnect = () => {
    alert(`Desconectando canal: ${channel.name}`)
  }

  const handleTest = () => {
    alert(`Testando conexão: ${channel.name}`)
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">
              {channelIcons[channel.type as keyof typeof channelIcons]}
            </div>
            <div>
              <CardTitle className="text-lg">{channel.name}</CardTitle>
              <div className="flex items-center space-x-2 mt-1">
                <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${statusColors[channel.status as keyof typeof statusColors]}`}>
                  {getStatusIcon(channel.status)}
                  <span className="capitalize">
                    {channel.status === 'connected' ? 'Conectado' : 
                     channel.status === 'warning' ? 'Atenção' : 
                     channel.status === 'error' ? 'Erro' : 'Desconectado'}
                  </span>
                </div>
                {channel.config?.verified && (
                  <Badge variant="secondary" className="text-xs">
                    Verificado
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setIsConfigOpen(true)}>
                <Settings className="mr-2 h-4 w-4" />
                Configurar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleTest}>
                <Zap className="mr-2 h-4 w-4" />
                Testar
              </DropdownMenuItem>
              {channel.status === 'connected' ? (
                <DropdownMenuItem onClick={handleDisconnect}>
                  <XCircle className="mr-2 h-4 w-4" />
                  Desconectar
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem onClick={handleConnect}>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Conectar
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Mensagens (mês)</p>
              <p className="font-medium">{channel.messagesMonth.toLocaleString('pt-BR')}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Taxa de entrega</p>
              <p className="font-medium">{channel.deliveryRate}%</p>
            </div>
            <div>
              <p className="text-muted-foreground">Erros</p>
              <p className="font-medium">{channel.errorCount}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Última conexão</p>
              <p className="font-medium text-xs">
                {new Date(channel.lastConnection).toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Performance</span>
              <span>{channel.deliveryRate}%</span>
            </div>
            <Progress 
              value={channel.deliveryRate} 
              className="h-2"
            />
          </div>
        </div>
      </CardContent>

      {/* Configuration Dialog */}
      <Dialog open={isConfigOpen} onOpenChange={setIsConfigOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Configuração - {channel.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground">
              Configurações do canal {channel.name}
            </div>
            
            <div className="space-y-3">
              {Object.entries(channel.config || {}).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="text-sm font-medium capitalize">
                    {key.replace(/([A-Z])/g, ' $1').toLowerCase()}:
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {typeof value === 'boolean' ? (value ? 'Sim' : 'Não') : String(value)}
                  </span>
                </div>
              ))}
              
              <Separator />
              
              <div className="flex justify-between">
                <span className="text-sm font-medium">Webhook:</span>
                <span className="text-xs text-muted-foreground font-mono">
                  {channel.webhook}
                </span>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsConfigOpen(false)}>
                Fechar
              </Button>
              <Button>
                Salvar Configurações
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

export default function CanaisPage() {
  const [isAddChannelOpen, setIsAddChannelOpen] = useState(false)

  const totalMessages = mockChannels.reduce((sum, channel) => sum + channel.messagesMonth, 0)
  const connectedChannels = mockChannels.filter(c => c.status === 'connected').length
  const channelsWithIssues = mockChannels.filter(c => c.status !== 'connected').length
  const averageDeliveryRate = mockChannels.reduce((sum, channel) => sum + channel.deliveryRate, 0) / mockChannels.length

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Gestão de Canais</h2>
        <div className="flex items-center space-x-2">
          <Dialog open={isAddChannelOpen} onOpenChange={setIsAddChannelOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Canal
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Adicionar Novo Canal</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Selecione o tipo de canal que deseja configurar:
                </p>
                <div className="grid grid-cols-1 gap-3">
                  <Button variant="outline" className="justify-start h-auto p-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">📱</span>
                      <div className="text-left">
                        <div className="font-medium">WhatsApp Business</div>
                        <div className="text-xs text-muted-foreground">Conectar conta comercial</div>
                      </div>
                    </div>
                  </Button>
                  <Button variant="outline" className="justify-start h-auto p-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">✈️</span>
                      <div className="text-left">
                        <div className="font-medium">Telegram Bot</div>
                        <div className="text-xs text-muted-foreground">Configurar bot do Telegram</div>
                      </div>
                    </div>
                  </Button>
                  <Button variant="outline" className="justify-start h-auto p-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">📷</span>
                      <div className="text-left">
                        <div className="font-medium">Instagram Direct</div>
                        <div className="text-xs text-muted-foreground">Mensagens diretas do Instagram</div>
                      </div>
                    </div>
                  </Button>
                  <Button variant="outline" className="justify-start h-auto p-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">✉️</span>
                      <div className="text-left">
                        <div className="font-medium">Email</div>
                        <div className="text-xs text-muted-foreground">Gateway de email</div>
                      </div>
                    </div>
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Canais Ativos</p>
                <p className="text-2xl font-bold">{connectedChannels}</p>
                <p className="text-xs text-muted-foreground">de {mockChannels.length} total</p>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Com Problemas</p>
                <p className="text-2xl font-bold">{channelsWithIssues}</p>
                <p className="text-xs text-red-600">Requer atenção</p>
              </div>
              <div className="p-2 bg-red-100 rounded-full">
                <AlertCircle className="h-4 w-4 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Mensagens/Mês</p>
                <p className="text-2xl font-bold">{totalMessages.toLocaleString('pt-BR')}</p>
                <p className="text-xs text-green-600">+15.3% vs mês anterior</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <Activity className="h-4 w-4 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Taxa Média</p>
                <p className="text-2xl font-bold">{averageDeliveryRate.toFixed(1)}%</p>
                <p className="text-xs text-muted-foreground">De entrega</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-full">
                <Radio className="h-4 w-4 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Channels Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockChannels.map(channel => (
          <ChannelCard key={channel.id} channel={channel} />
        ))}
      </div>

      {/* Connection Logs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="mr-2 h-5 w-5" />
            Logs de Conexão Recentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Canal</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Última Atividade</TableHead>
                <TableHead>Mensagens</TableHead>
                <TableHead>Erros</TableHead>
                <TableHead>Taxa de Sucesso</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockChannels.map((channel) => (
                <TableRow key={channel.id}>
                  <TableCell className="flex items-center space-x-2">
                    <span>{channelIcons[channel.type as keyof typeof channelIcons]}</span>
                    <span className="font-medium">{channel.name}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      channel.status === 'connected' ? 'secondary' :
                      channel.status === 'warning' ? 'outline' : 'destructive'
                    }>
                      {channel.status === 'connected' ? 'Conectado' : 
                       channel.status === 'warning' ? 'Atenção' : 'Erro'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">
                    {new Date(channel.lastConnection).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </TableCell>
                  <TableCell>{channel.messagesMonth.toLocaleString('pt-BR')}</TableCell>
                  <TableCell>{channel.errorCount}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Progress 
                        value={channel.deliveryRate} 
                        className="w-16 h-2" 
                      />
                      <span className="text-sm font-medium">{channel.deliveryRate}%</span>
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
