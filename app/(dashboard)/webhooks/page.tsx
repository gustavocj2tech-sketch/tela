
'use client'

import { useState } from 'react'
import { 
  Webhook as WebhookIcon, 
  Plus, 
  Play,
  Pause,
  Settings,
  Eye,
  Copy,
  Trash2,
  Activity,
  CheckCircle,
  XCircle,
  AlertCircle,
  Zap
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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'

// Mock webhooks data
const mockWebhooks = [
  {
    id: 1,
    name: 'Integração CRM',
    url: 'https://crm.empresa.com/api/webhook',
    event: 'contact.created',
    status: 'active',
    lastExecution: '2024-06-15T10:30:00',
    successRate: 98.5,
    totalExecutions: 1247,
    failures: 19,
    createdAt: '2024-05-01',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer token123'
    }
  },
  {
    id: 2,
    name: 'Notificação Slack',
    url: 'https://hooks.slack.com/services/T123/B456/xyz789',
    event: 'message.received',
    status: 'active',
    lastExecution: '2024-06-15T10:28:00',
    successRate: 100.0,
    totalExecutions: 892,
    failures: 0,
    createdAt: '2024-05-15',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  },
  {
    id: 3,
    name: 'Sistema de Tickets',
    url: 'https://helpdesk.empresa.com/webhook',
    event: 'conversation.closed',
    status: 'paused',
    lastExecution: '2024-06-10T15:45:00',
    successRate: 94.2,
    totalExecutions: 634,
    failures: 37,
    createdAt: '2024-04-20',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': 'key456'
    }
  },
  {
    id: 4,
    name: 'Analytics Tracking',
    url: 'https://analytics.empresa.com/track',
    event: 'opportunity.won',
    status: 'error',
    lastExecution: '2024-06-14T09:12:00',
    successRate: 76.3,
    totalExecutions: 445,
    failures: 105,
    createdAt: '2024-03-10',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  },
  {
    id: 5,
    name: 'Email Marketing',
    url: 'https://email.empresa.com/api/contact',
    event: 'contact.updated',
    status: 'active',
    lastExecution: '2024-06-15T09:50:00',
    successRate: 99.1,
    totalExecutions: 2134,
    failures: 19,
    createdAt: '2024-04-01',
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'API-Key abc123'
    }
  }
]

const eventTypes = [
  'contact.created',
  'contact.updated',
  'contact.deleted',
  'message.received',
  'message.sent',
  'conversation.started',
  'conversation.closed',
  'opportunity.created',
  'opportunity.won',
  'opportunity.lost',
  'campaign.started',
  'campaign.completed'
]

const statusColors = {
  active: 'secondary',
  paused: 'outline',
  error: 'destructive'
} as const

const statusIcons = {
  active: CheckCircle,
  paused: Pause,
  error: XCircle
}

// Mock webhook logs
const mockWebhookLogs = [
  {
    id: 1,
    webhookId: 1,
    timestamp: '2024-06-15T10:30:00',
    status: 'success',
    responseCode: 200,
    responseTime: 245,
    payload: { contactId: 12345, name: 'João Silva' }
  },
  {
    id: 2,
    webhookId: 1,
    timestamp: '2024-06-15T10:25:00',
    status: 'success',
    responseCode: 200,
    responseTime: 189,
    payload: { contactId: 12346, name: 'Maria Santos' }
  },
  {
    id: 3,
    webhookId: 4,
    timestamp: '2024-06-15T09:15:00',
    status: 'failed',
    responseCode: 500,
    responseTime: 5000,
    payload: { opportunityId: 789 },
    error: 'Internal Server Error'
  }
]

export default function WebhooksPage() {
  const [isNewWebhookOpen, setIsNewWebhookOpen] = useState(false)
  const [selectedWebhook, setSelectedWebhook] = useState<any>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isLogsOpen, setIsLogsOpen] = useState(false)

  const handleViewDetails = (webhook: any) => {
    setSelectedWebhook(webhook)
    setIsDetailsOpen(true)
  }

  const handleViewLogs = (webhook: any) => {
    setSelectedWebhook(webhook)
    setIsLogsOpen(true)
  }

  const handleTest = (webhookId: number) => {
    alert(`Testando webhook ${webhookId}...`)
  }

  const handleToggleStatus = (webhookId: number, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'paused' : 'active'
    alert(`Alterando webhook ${webhookId} para: ${newStatus}`)
  }

  const handleDelete = (webhookId: number) => {
    if (confirm('Tem certeza que deseja deletar este webhook?')) {
      alert(`Deletando webhook ${webhookId}`)
    }
  }

  const totalWebhooks = mockWebhooks.length
  const activeWebhooks = mockWebhooks.filter(w => w.status === 'active').length
  const totalExecutions = mockWebhooks.reduce((sum, w) => sum + w.totalExecutions, 0)
  const averageSuccessRate = mockWebhooks.reduce((sum, w) => sum + w.successRate, 0) / mockWebhooks.length

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Gerenciamento de Webhooks</h2>
        <div className="flex items-center space-x-2">
          <Dialog open={isNewWebhookOpen} onOpenChange={setIsNewWebhookOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Webhook
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Novo Webhook</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Nome do Webhook</Label>
                  <Input placeholder="Ex: Integração com CRM" />
                </div>
                <div>
                  <Label>URL de Destino</Label>
                  <Input placeholder="https://api.exemplo.com/webhook" />
                </div>
                <div>
                  <Label>Evento</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o evento" />
                    </SelectTrigger>
                    <SelectContent>
                      {eventTypes.map(event => (
                        <SelectItem key={event} value={event}>{event}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Método HTTP</Label>
                  <Select defaultValue="POST">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="POST">POST</SelectItem>
                      <SelectItem value="PUT">PUT</SelectItem>
                      <SelectItem value="PATCH">PATCH</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Headers Customizados</Label>
                  <Textarea placeholder='{"Authorization": "Bearer token", "Content-Type": "application/json"}' />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch defaultChecked />
                  <Label>Ativar webhook imediatamente</Label>
                </div>
                <Button className="w-full">
                  <WebhookIcon className="mr-2 h-4 w-4" />
                  Criar Webhook
                </Button>
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
                <p className="text-sm font-medium text-muted-foreground">Total de Webhooks</p>
                <p className="text-2xl font-bold">{totalWebhooks}</p>
                <p className="text-xs text-muted-foreground">Configurados</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <WebhookIcon className="h-4 w-4 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Ativos</p>
                <p className="text-2xl font-bold">{activeWebhooks}</p>
                <p className="text-xs text-green-600">Em funcionamento</p>
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
                <p className="text-sm font-medium text-muted-foreground">Execuções Totais</p>
                <p className="text-2xl font-bold">{totalExecutions.toLocaleString('pt-BR')}</p>
                <p className="text-xs text-muted-foreground">Este mês</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-full">
                <Activity className="h-4 w-4 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Taxa de Sucesso</p>
                <p className="text-2xl font-bold">{averageSuccessRate.toFixed(1)}%</p>
                <p className="text-xs text-green-600">Média geral</p>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <Zap className="h-4 w-4 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Webhooks Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <WebhookIcon className="mr-2 h-5 w-5" />
            Webhooks Configurados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>Evento</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Última Execução</TableHead>
                <TableHead>Taxa de Sucesso</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockWebhooks.map((webhook) => {
                const StatusIcon = statusIcons[webhook.status as keyof typeof statusIcons]
                return (
                  <TableRow key={webhook.id}>
                    <TableCell className="font-medium">
                      {webhook.name}
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      <div className="max-w-48 truncate" title={webhook.url}>
                        {webhook.url}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {webhook.event}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <StatusIcon className="h-4 w-4" />
                        <Badge variant={statusColors[webhook.status as keyof typeof statusColors]}>
                          {webhook.status === 'active' ? 'Ativo' : 
                           webhook.status === 'paused' ? 'Pausado' : 'Erro'}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(webhook.lastExecution).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm font-medium ${
                          webhook.successRate >= 95 ? 'text-green-600' :
                          webhook.successRate >= 80 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {webhook.successRate.toFixed(1)}%
                        </span>
                        <span className="text-xs text-muted-foreground">
                          ({webhook.totalExecutions})
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewDetails(webhook)}>
                            <Eye className="mr-2 h-4 w-4" />
                            Ver detalhes
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleViewLogs(webhook)}>
                            <Activity className="mr-2 h-4 w-4" />
                            Ver logs
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleTest(webhook.id)}>
                            <Zap className="mr-2 h-4 w-4" />
                            Testar
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleToggleStatus(webhook.id, webhook.status)}>
                            {webhook.status === 'active' ? (
                              <>
                                <Pause className="mr-2 h-4 w-4" />
                                Pausar
                              </>
                            ) : (
                              <>
                                <Play className="mr-2 h-4 w-4" />
                                Ativar
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="mr-2 h-4 w-4" />
                            Duplicar
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(webhook.id)} className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Deletar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Webhook Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalhes do Webhook: {selectedWebhook?.name}</DialogTitle>
          </DialogHeader>
          {selectedWebhook && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Nome</Label>
                  <p className="text-sm">{selectedWebhook.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <Badge variant={statusColors[selectedWebhook.status as keyof typeof statusColors]}>
                    {selectedWebhook.status === 'active' ? 'Ativo' : 
                     selectedWebhook.status === 'paused' ? 'Pausado' : 'Erro'}
                  </Badge>
                </div>
                <div className="col-span-2">
                  <Label className="text-sm font-medium">URL</Label>
                  <p className="text-sm font-mono break-all">{selectedWebhook.url}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Evento</Label>
                  <p className="text-sm">{selectedWebhook.event}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Método</Label>
                  <p className="text-sm">{selectedWebhook.method}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Execuções Totais</Label>
                  <p className="text-sm">{selectedWebhook.totalExecutions.toLocaleString('pt-BR')}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Taxa de Sucesso</Label>
                  <p className="text-sm font-medium text-green-600">
                    {selectedWebhook.successRate.toFixed(1)}%
                  </p>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Headers Configurados</Label>
                <div className="bg-muted/30 rounded-lg p-3 font-mono text-xs">
                  <pre>{JSON.stringify(selectedWebhook.headers, null, 2)}</pre>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
                  Fechar
                </Button>
                <Button onClick={() => handleTest(selectedWebhook.id)}>
                  <Zap className="mr-2 h-4 w-4" />
                  Testar Webhook
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Webhook Logs Dialog */}
      <Dialog open={isLogsOpen} onOpenChange={setIsLogsOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Logs do Webhook: {selectedWebhook?.name}</DialogTitle>
          </DialogHeader>
          {selectedWebhook && (
            <div className="space-y-4">
              <div className="max-h-96 overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Código</TableHead>
                      <TableHead>Tempo (ms)</TableHead>
                      <TableHead>Payload</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockWebhookLogs
                      .filter(log => log.webhookId === selectedWebhook.id)
                      .map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="text-sm">
                          {new Date(log.timestamp).toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit'
                          })}
                        </TableCell>
                        <TableCell>
                          <Badge variant={log.status === 'success' ? 'secondary' : 'destructive'}>
                            {log.status === 'success' ? 'Sucesso' : 'Falha'}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {log.responseCode}
                        </TableCell>
                        <TableCell className="text-sm">
                          {log.responseTime}ms
                        </TableCell>
                        <TableCell>
                          <div className="max-w-48 truncate text-xs font-mono">
                            {JSON.stringify(log.payload)}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="flex justify-end">
                <Button variant="outline" onClick={() => setIsLogsOpen(false)}>
                  Fechar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

