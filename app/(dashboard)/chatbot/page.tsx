
'use client'

import { useState } from 'react'
import { 
  Bot, 
  Plus, 
  Play,
  Pause,
  Settings,
  Copy,
  Trash2,
  Edit,
  Activity,
  MessageSquare,
  BarChart3,
  ArrowDown,
  ArrowRight
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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { Switch } from '@/components/ui/switch'

// Mock chatbot flows
const mockChatbotFlows = [
  {
    id: 1,
    name: 'Atendimento Inicial',
    description: 'Fluxo principal de recepção de novos clientes',
    status: 'active',
    messagesCount: 1247,
    successRate: 87.3,
    lastUpdated: '2024-06-10',
    triggers: ['oi', 'olá', 'começar'],
    nodes: [
      { id: 1, type: 'message', content: 'Olá! Como posso ajudá-lo?', options: ['Suporte', 'Vendas', 'Informações'] },
      { id: 2, type: 'condition', content: 'Suporte', next: 'human' },
      { id: 3, type: 'condition', content: 'Vendas', next: 'sales_flow' },
      { id: 4, type: 'message', content: 'Informações sobre nossos serviços...' }
    ]
  },
  {
    id: 2,
    name: 'Qualificação de Leads',
    description: 'Coleta dados e qualifica potenciais clientes',
    status: 'active',
    messagesCount: 892,
    successRate: 73.8,
    lastUpdated: '2024-06-08',
    triggers: ['vendas', 'orçamento', 'preço'],
    nodes: [
      { id: 1, type: 'message', content: 'Ótimo! Vamos conversar sobre vendas.', options: [] },
      { id: 2, type: 'input', content: 'Qual seu nome?', field: 'name' },
      { id: 3, type: 'input', content: 'Qual sua empresa?', field: 'company' },
      { id: 4, type: 'message', content: 'Obrigado! Um consultor entrará em contato.' }
    ]
  },
  {
    id: 3,
    name: 'FAQ Automatizado',
    description: 'Responde perguntas frequentes automaticamente',
    status: 'inactive',
    messagesCount: 634,
    successRate: 92.1,
    lastUpdated: '2024-05-25',
    triggers: ['faq', 'dúvida', 'pergunta'],
    nodes: [
      { id: 1, type: 'message', content: 'Selecione sua dúvida:', options: ['Preços', 'Funcionalidades', 'Suporte', 'Outros'] },
      { id: 2, type: 'condition', content: 'Preços', next: 'pricing_info' },
      { id: 3, type: 'condition', content: 'Funcionalidades', next: 'features_info' },
      { id: 4, type: 'condition', content: 'Suporte', next: 'human' }
    ]
  }
]

function ChatbotFlowCard({ flow }: { flow: any }) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)

  const handleToggleStatus = () => {
    alert(`${flow.status === 'active' ? 'Pausando' : 'Ativando'} fluxo: ${flow.name}`)
  }

  const handleDuplicate = () => {
    alert(`Duplicando fluxo: ${flow.name}`)
  }

  const handleDelete = () => {
    if (confirm(`Tem certeza que deseja deletar o fluxo "${flow.name}"?`)) {
      alert(`Deletando fluxo: ${flow.name}`)
    }
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Bot className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg">{flow.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{flow.description}</p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setIsDetailsOpen(true)}>
                <Activity className="mr-2 h-4 w-4" />
                Ver detalhes
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsEditOpen(true)}>
                <Edit className="mr-2 h-4 w-4" />
                Editar fluxo
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDuplicate}>
                <Copy className="mr-2 h-4 w-4" />
                Duplicar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleToggleStatus}>
                {flow.status === 'active' ? (
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
              <DropdownMenuItem onClick={handleDelete} className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                Deletar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Badge variant={flow.status === 'active' ? 'secondary' : 'outline'}>
            {flow.status === 'active' ? 'Ativo' : 'Inativo'}
          </Badge>
          <div className="flex items-center space-x-2">
            <Switch 
              checked={flow.status === 'active'} 
              onCheckedChange={handleToggleStatus}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Mensagens</p>
            <p className="font-medium">{flow.messagesCount.toLocaleString('pt-BR')}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Taxa de Sucesso</p>
            <p className="font-medium text-green-600">{flow.successRate}%</p>
          </div>
          <div>
            <p className="text-muted-foreground">Atualizado</p>
            <p className="font-medium">{new Date(flow.lastUpdated).toLocaleDateString('pt-BR')}</p>
          </div>
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-2">Palavras-chave:</p>
          <div className="flex flex-wrap gap-1">
            {flow.triggers.map((trigger: string, index: number) => (
              <Badge key={index} variant="outline" className="text-xs">
                {trigger}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>Performance</span>
            <span>{flow.successRate}%</span>
          </div>
          <Progress value={flow.successRate} className="h-2" />
        </div>
      </CardContent>

      {/* Flow Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-4xl max-h-96 overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalhes do Fluxo: {flow.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Nome do Fluxo</Label>
                <p className="text-sm">{flow.name}</p>
              </div>
              <div>
                <Label>Status</Label>
                <Badge variant={flow.status === 'active' ? 'secondary' : 'outline'}>
                  {flow.status === 'active' ? 'Ativo' : 'Inativo'}
                </Badge>
              </div>
              <div>
                <Label>Mensagens Processadas</Label>
                <p className="text-sm">{flow.messagesCount.toLocaleString('pt-BR')}</p>
              </div>
              <div>
                <Label>Taxa de Sucesso</Label>
                <p className="text-sm text-green-600">{flow.successRate}%</p>
              </div>
            </div>

            <div>
              <Label>Palavras-chave de Ativação</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {flow.triggers.map((trigger: string, index: number) => (
                  <Badge key={index} variant="outline">
                    {trigger}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <Label>Estrutura do Fluxo (Simplificada)</Label>
              <div className="mt-3 space-y-3 p-4 bg-muted/30 rounded-lg">
                {flow.nodes.map((node: any, index: number) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-full text-white text-xs font-medium">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {node.type}
                        </Badge>
                        <span className="text-sm">{node.content}</span>
                      </div>
                      {node.options && node.options.length > 0 && (
                        <div className="mt-1 flex space-x-1">
                          {node.options.map((option: string, optIndex: number) => (
                            <Badge key={optIndex} variant="secondary" className="text-xs">
                              {option}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    {index < flow.nodes.length - 1 && (
                      <ArrowDown className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Flow Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Editar Fluxo</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Nome do Fluxo</Label>
              <Input defaultValue={flow.name} />
            </div>
            <div>
              <Label>Descrição</Label>
              <Textarea defaultValue={flow.description} />
            </div>
            <div>
              <Label>Palavras-chave (separadas por vírgula)</Label>
              <Input defaultValue={flow.triggers.join(', ')} />
            </div>
            <div className="flex items-center space-x-2">
              <Switch defaultChecked={flow.status === 'active'} />
              <Label>Fluxo ativo</Label>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                Cancelar
              </Button>
              <Button>
                Salvar Alterações
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

export default function ChatbotPage() {
  const [isNewFlowOpen, setIsNewFlowOpen] = useState(false)

  const activeFlows = mockChatbotFlows.filter(f => f.status === 'active').length
  const totalMessages = mockChatbotFlows.reduce((sum, f) => sum + f.messagesCount, 0)
  const averageSuccessRate = mockChatbotFlows.reduce((sum, f) => sum + f.successRate, 0) / mockChatbotFlows.length

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Gerenciador de Chatbot</h2>
        <div className="flex items-center space-x-2">
          <Dialog open={isNewFlowOpen} onOpenChange={setIsNewFlowOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Criar Novo Fluxo
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Criar Novo Fluxo</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Nome do Fluxo</Label>
                  <Input placeholder="Ex: Atendimento Suporte" />
                </div>
                <div>
                  <Label>Descrição</Label>
                  <Textarea placeholder="Descreva o objetivo deste fluxo..." />
                </div>
                <div>
                  <Label>Palavras-chave de Ativação</Label>
                  <Input placeholder="suporte, ajuda, problema (separadas por vírgula)" />
                </div>
                <div>
                  <Label>Template Inicial</Label>
                  <select className="w-full p-2 border rounded-md">
                    <option>Atendimento Básico</option>
                    <option>Coleta de Dados</option>
                    <option>FAQ</option>
                    <option>Qualificação de Lead</option>
                    <option>Fluxo em Branco</option>
                  </select>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch />
                  <Label>Ativar fluxo imediatamente</Label>
                </div>
                <Button className="w-full">
                  <Bot className="mr-2 h-4 w-4" />
                  Criar Fluxo
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
                <p className="text-sm font-medium text-muted-foreground">Fluxos Ativos</p>
                <p className="text-2xl font-bold">{activeFlows}</p>
                <p className="text-xs text-muted-foreground">de {mockChatbotFlows.length} total</p>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <Bot className="h-4 w-4 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Mensagens Processadas</p>
                <p className="text-2xl font-bold">{totalMessages.toLocaleString('pt-BR')}</p>
                <p className="text-xs text-green-600">Este mês</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <MessageSquare className="h-4 w-4 text-blue-600" />
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
              <div className="p-2 bg-purple-100 rounded-full">
                <BarChart3 className="h-4 w-4 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Economia</p>
                <p className="text-2xl font-bold text-green-600">R$ 4.2k</p>
                <p className="text-xs text-muted-foreground">Em atendimento manual</p>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <Activity className="h-4 w-4 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chatbot Flows */}
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {mockChatbotFlows.map(flow => (
          <ChatbotFlowCard key={flow.id} flow={flow} />
        ))}
      </div>

      {/* Usage Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="mr-2 h-5 w-5" />
            Análise de Uso dos Fluxos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockChatbotFlows.map((flow, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded">
                    <Bot className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{flow.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {flow.messagesCount.toLocaleString('pt-BR')} mensagens
                    </p>
                  </div>
                </div>
                <div className="text-right space-x-4 flex items-center">
                  <div className="text-center">
                    <p className="text-sm font-medium">{flow.successRate}%</p>
                    <p className="text-xs text-muted-foreground">Sucesso</p>
                  </div>
                  <Badge variant={flow.status === 'active' ? 'secondary' : 'outline'}>
                    {flow.status === 'active' ? 'Ativo' : 'Inativo'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

