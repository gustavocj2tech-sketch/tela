
'use client'

import { useState } from 'react'
import { 
  Filter, 
  Plus, 
  Settings,
  GripVertical,
  Edit,
  Trash2,
  Clock,
  Target,
  TrendingUp,
  AlertCircle
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
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
import { Switch } from '@/components/ui/switch'
import { Progress } from '@/components/ui/progress'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

// Mock funnel stages
const mockFunnelStages = [
  {
    id: 1,
    name: 'Primeiro Contato',
    order: 1,
    color: '#3B82F6',
    description: 'Cliente entra em contato pela primeira vez',
    averageTime: 0, // dias
    conversionRate: 85.2,
    automations: [
      { id: 1, name: 'Mensagem de boas-vindas', active: true },
      { id: 2, name: 'Coleta de informações básicas', active: true }
    ]
  },
  {
    id: 2,
    name: 'Lead Qualificado',
    order: 2,
    color: '#10B981',
    description: 'Cliente demonstra interesse real no produto/serviço',
    averageTime: 2, // dias
    conversionRate: 67.8,
    automations: [
      { id: 3, name: 'Envio de material informativo', active: true },
      { id: 4, name: 'Agendamento de reunião', active: false }
    ]
  },
  {
    id: 3,
    name: 'Proposta Apresentada',
    order: 3,
    color: '#F59E0B',
    description: 'Proposta comercial foi enviada ao cliente',
    averageTime: 7, // dias
    conversionRate: 45.3,
    automations: [
      { id: 5, name: 'Follow-up automático', active: true },
      { id: 6, name: 'Lembrete de vencimento', active: true }
    ]
  },
  {
    id: 4,
    name: 'Em Negociação',
    order: 4,
    color: '#EF4444',
    description: 'Cliente está negociando condições',
    averageTime: 14, // dias
    conversionRate: 73.1,
    automations: [
      { id: 7, name: 'Notificação para vendedor', active: true },
      { id: 8, name: 'Alerta de inatividade', active: true }
    ]
  },
  {
    id: 5,
    name: 'Fechado - Ganho',
    order: 5,
    color: '#22C55E',
    description: 'Venda foi finalizada com sucesso',
    averageTime: 3, // dias para processamento
    conversionRate: 100,
    automations: [
      { id: 9, name: 'Email de confirmação', active: true },
      { id: 10, name: 'Processo de onboarding', active: true }
    ]
  },
  {
    id: 6,
    name: 'Fechado - Perdido',
    order: 6,
    color: '#6B7280',
    description: 'Oportunidade foi perdida',
    averageTime: 0,
    conversionRate: 0,
    automations: [
      { id: 11, name: 'Feedback de perda', active: true },
      { id: 12, name: 'Remarketing futuro', active: false }
    ]
  }
]

function StageCard({ stage, onEdit }: { stage: any; onEdit: (stage: any) => void }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: stage.color }}
              />
            </div>
            <div>
              <CardTitle className="text-lg">{stage.name}</CardTitle>
              <Badge variant="outline" className="text-xs mt-1">
                Posição {stage.order}
              </Badge>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={() => onEdit(stage)}>
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{stage.description}</p>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Tempo Médio</p>
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <p className="font-medium">
                {stage.averageTime === 0 ? 'Imediato' : `${stage.averageTime} dias`}
              </p>
            </div>
          </div>
          <div>
            <p className="text-muted-foreground">Conversão</p>
            <p className="font-medium text-green-600">{stage.conversionRate}%</p>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>Taxa de Conversão</span>
            <span>{stage.conversionRate}%</span>
          </div>
          <Progress value={stage.conversionRate} className="h-2" />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium">Automações</p>
            <Badge variant="secondary" className="text-xs">
              {stage.automations.filter((a: any) => a.active).length} ativa(s)
            </Badge>
          </div>
          <div className="space-y-1">
            {stage.automations.slice(0, 2).map((automation: any, index: number) => (
              <div key={index} className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{automation.name}</span>
                <Badge variant={automation.active ? 'secondary' : 'outline'} className="text-xs">
                  {automation.active ? 'Ativa' : 'Inativa'}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function FunilPage() {
  const [isNewStageOpen, setIsNewStageOpen] = useState(false)
  const [selectedStage, setSelectedStage] = useState<any>(null)
  const [isEditOpen, setIsEditOpen] = useState(false)

  const handleEditStage = (stage: any) => {
    setSelectedStage(stage)
    setIsEditOpen(true)
  }

  const handleDeleteStage = (stageId: number) => {
    if (confirm('Tem certeza que deseja deletar esta etapa?')) {
      alert(`Deletando etapa ID: ${stageId}`)
    }
  }

  const totalStages = mockFunnelStages.length
  const activeAutomations = mockFunnelStages.reduce((total, stage) => 
    total + stage.automations.filter((a: any) => a.active).length, 0
  )
  const averageConversion = mockFunnelStages.reduce((total, stage) => 
    total + stage.conversionRate, 0
  ) / mockFunnelStages.length

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Configuração do Funil</h2>
        <div className="flex items-center space-x-2">
          <Dialog open={isNewStageOpen} onOpenChange={setIsNewStageOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Etapa
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Nova Etapa do Funil</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Nome da Etapa</Label>
                  <Input placeholder="Ex: Reunião Agendada" />
                </div>
                <div>
                  <Label>Descrição</Label>
                  <Textarea placeholder="Descreva o que acontece nesta etapa..." />
                </div>
                <div>
                  <Label>Posição no Funil</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a posição" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: totalStages + 1 }, (_, i) => (
                        <SelectItem key={i + 1} value={(i + 1).toString()}>
                          Posição {i + 1}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Cor da Etapa</Label>
                  <div className="flex space-x-2 mt-2">
                    {['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#22C55E'].map(color => (
                      <button
                        key={color}
                        className="w-8 h-8 rounded-full border-2 border-gray-300"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Tempo Médio (dias)</Label>
                  <Input type="number" placeholder="0" />
                </div>
                <Button className="w-full">
                  <Filter className="mr-2 h-4 w-4" />
                  Criar Etapa
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
                <p className="text-sm font-medium text-muted-foreground">Total de Etapas</p>
                <p className="text-2xl font-bold">{totalStages}</p>
                <p className="text-xs text-muted-foreground">No funil</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <Filter className="h-4 w-4 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Automações Ativas</p>
                <p className="text-2xl font-bold">{activeAutomations}</p>
                <p className="text-xs text-green-600">Em execução</p>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <Target className="h-4 w-4 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Conversão Média</p>
                <p className="text-2xl font-bold">{averageConversion.toFixed(1)}%</p>
                <p className="text-xs text-muted-foreground">Entre etapas</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-full">
                <TrendingUp className="h-4 w-4 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tempo Médio Total</p>
                <p className="text-2xl font-bold">26</p>
                <p className="text-xs text-muted-foreground">Dias no funil</p>
              </div>
              <div className="p-2 bg-yellow-100 rounded-full">
                <Clock className="h-4 w-4 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Funnel Stages */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Etapas do Funil</h3>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <GripVertical className="h-4 w-4" />
            <span>Arraste para reordenar</span>
          </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockFunnelStages
            .sort((a, b) => a.order - b.order)
            .map(stage => (
              <StageCard 
                key={stage.id} 
                stage={stage} 
                onEdit={handleEditStage}
              />
            ))}
        </div>
      </div>

      {/* Edit Stage Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Configurar Etapa: {selectedStage?.name}</DialogTitle>
          </DialogHeader>
          {selectedStage && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Nome da Etapa</Label>
                  <Input defaultValue={selectedStage.name} />
                </div>
                <div>
                  <Label>Posição no Funil</Label>
                  <Select defaultValue={selectedStage.order.toString()}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: totalStages }, (_, i) => (
                        <SelectItem key={i + 1} value={(i + 1).toString()}>
                          Posição {i + 1}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label>Descrição</Label>
                <Textarea defaultValue={selectedStage.description} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Tempo Médio (dias)</Label>
                  <Input type="number" defaultValue={selectedStage.averageTime} />
                </div>
                <div>
                  <Label>Cor da Etapa</Label>
                  <div className="flex space-x-2 mt-2">
                    {['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#22C55E'].map(color => (
                      <button
                        key={color}
                        className={`w-8 h-8 rounded-full border-2 ${selectedStage.color === color ? 'border-gray-800' : 'border-gray-300'}`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-base font-medium mb-3 block">Automações da Etapa</Label>
                <div className="space-y-3">
                  {selectedStage.automations.map((automation: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center space-x-3">
                        <Switch defaultChecked={automation.active} />
                        <div>
                          <p className="text-sm font-medium">{automation.name}</p>
                          <p className="text-xs text-muted-foreground">
                            Executada automaticamente quando lead entra na etapa
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="mt-3 w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar Automação
                </Button>
              </div>

              <div className="flex justify-between">
                <Button 
                  variant="destructive" 
                  onClick={() => handleDeleteStage(selectedStage.id)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Deletar Etapa
                </Button>
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                    Cancelar
                  </Button>
                  <Button>
                    Salvar Alterações
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Performance Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="mr-2 h-5 w-5" />
            Performance do Funil
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockFunnelStages.map((stage, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: stage.color }}
                    />
                    <span className="text-sm font-medium">{stage.name}</span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <span>{stage.conversionRate}%</span>
                    <span className="text-muted-foreground">
                      {stage.averageTime > 0 ? `${stage.averageTime} dias` : 'Imediato'}
                    </span>
                  </div>
                </div>
                <Progress value={stage.conversionRate} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

