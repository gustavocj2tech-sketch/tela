
'use client'

import { useState } from 'react'
import { 
  Mail, 
  Plus, 
  Play,
  Pause,
  Eye,
  Edit,
  Copy,
  BarChart3,
  Users,
  Send,
  Target,
  Calendar,
  Filter
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
import { Progress } from '@/components/ui/progress'

// Mock campaigns data
const mockCampaigns = [
  {
    id: 1,
    name: 'Promoção de Verão 2024',
    status: 'active',
    channel: 'WhatsApp',
    audience: 'Clientes Ativos',
    sent: 2847,
    delivered: 2785,
    opened: 1892,
    clicked: 456,
    converted: 78,
    createdAt: '2024-06-01',
    launchedAt: '2024-06-05',
    budget: 850.00,
    ctr: 24.1, // click-through rate
    conversionRate: 17.1
  },
  {
    id: 2,
    name: 'Reativação de Leads',
    status: 'scheduled',
    channel: 'Email',
    audience: 'Leads Inativos',
    sent: 0,
    delivered: 0,
    opened: 0,
    clicked: 0,
    converted: 0,
    createdAt: '2024-06-10',
    launchedAt: '2024-06-20',
    budget: 320.00,
    ctr: 0,
    conversionRate: 0
  },
  {
    id: 3,
    name: 'Lançamento Produto X',
    status: 'completed',
    channel: 'WhatsApp + Email',
    audience: 'Todos os Contatos',
    sent: 4521,
    delivered: 4398,
    opened: 3102,
    clicked: 892,
    converted: 156,
    createdAt: '2024-05-15',
    launchedAt: '2024-05-20',
    budget: 1250.00,
    ctr: 28.7,
    conversionRate: 17.5
  },
  {
    id: 4,
    name: 'Black Friday Preview',
    status: 'draft',
    channel: 'WhatsApp',
    audience: 'Clientes Premium',
    sent: 0,
    delivered: 0,
    opened: 0,
    clicked: 0,
    converted: 0,
    createdAt: '2024-06-12',
    launchedAt: null,
    budget: 2000.00,
    ctr: 0,
    conversionRate: 0
  },
  {
    id: 5,
    name: 'Pesquisa de Satisfação',
    status: 'paused',
    channel: 'Email + SMS',
    audience: 'Clientes Recentes',
    sent: 1234,
    delivered: 1198,
    opened: 687,
    clicked: 245,
    converted: 89,
    createdAt: '2024-05-28',
    launchedAt: '2024-06-02',
    budget: 450.00,
    ctr: 35.7,
    conversionRate: 36.3
  }
]

const statusLabels = {
  draft: 'Rascunho',
  scheduled: 'Agendada',
  active: 'Ativa',
  paused: 'Pausada',
  completed: 'Finalizada'
}

const statusColors = {
  draft: 'outline',
  scheduled: 'secondary',
  active: 'default',
  paused: 'outline',
  completed: 'secondary'
} as const

const channelIcons = {
  'WhatsApp': '💬',
  'Email': '✉️',
  'SMS': '📱',
  'WhatsApp + Email': '💬✉️',
  'Email + SMS': '✉️📱'
}

function CampaignPerformance({ campaign }: { campaign: any }) {
  const deliveryRate = campaign.sent > 0 ? (campaign.delivered / campaign.sent * 100) : 0
  const openRate = campaign.delivered > 0 ? (campaign.opened / campaign.delivered * 100) : 0
  const clickRate = campaign.opened > 0 ? (campaign.clicked / campaign.opened * 100) : 0

  return (
    <div className="grid grid-cols-4 gap-4 text-sm">
      <div>
        <p className="text-muted-foreground">Entrega</p>
        <p className="font-medium">{deliveryRate.toFixed(1)}%</p>
      </div>
      <div>
        <p className="text-muted-foreground">Abertura</p>
        <p className="font-medium">{openRate.toFixed(1)}%</p>
      </div>
      <div>
        <p className="text-muted-foreground">Clique</p>
        <p className="font-medium">{clickRate.toFixed(1)}%</p>
      </div>
      <div>
        <p className="text-muted-foreground">Conversão</p>
        <p className="font-medium text-green-600">{campaign.conversionRate.toFixed(1)}%</p>
      </div>
    </div>
  )
}

export default function CampanhasPage() {
  const [isNewCampaignOpen, setIsNewCampaignOpen] = useState(false)
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState('')
  const [channelFilter, setChannelFilter] = useState('')

  const filteredCampaigns = mockCampaigns.filter(campaign => {
    const matchesStatus = !statusFilter || campaign.status === statusFilter
    const matchesChannel = !channelFilter || campaign.channel.includes(channelFilter)
    return matchesStatus && matchesChannel
  })

  const handleViewDetails = (campaign: any) => {
    setSelectedCampaign(campaign)
    setIsDetailsOpen(true)
  }

  const handleToggleStatus = (campaignId: number, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'paused' : 'active'
    alert(`Alterando status da campanha ${campaignId} para: ${statusLabels[newStatus as keyof typeof statusLabels]}`)
  }

  const handleDuplicate = (campaignId: number) => {
    alert(`Duplicando campanha ${campaignId}`)
  }

  const totalCampaigns = mockCampaigns.length
  const activeCampaigns = mockCampaigns.filter(c => c.status === 'active').length
  const totalSent = mockCampaigns.reduce((sum, c) => sum + c.sent, 0)
  const totalBudget = mockCampaigns.reduce((sum, c) => sum + c.budget, 0)

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Gerenciamento de Campanhas</h2>
        <div className="flex items-center space-x-2">
          <Dialog open={isNewCampaignOpen} onOpenChange={setIsNewCampaignOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nova Campanha
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Criar Nova Campanha</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Nome da Campanha</Label>
                  <Input placeholder="Ex: Promoção de Inverno 2024" />
                </div>
                <div>
                  <Label>Canal</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o canal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="whatsapp">WhatsApp</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                      <SelectItem value="multi">Multi-canal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Público-Alvo</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o público" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os Contatos</SelectItem>
                      <SelectItem value="active">Clientes Ativos</SelectItem>
                      <SelectItem value="inactive">Leads Inativos</SelectItem>
                      <SelectItem value="premium">Clientes Premium</SelectItem>
                      <SelectItem value="recent">Clientes Recentes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Orçamento (R$)</Label>
                  <Input type="number" placeholder="0,00" />
                </div>
                <div>
                  <Label>Descrição</Label>
                  <Textarea placeholder="Descreva o objetivo da campanha..." />
                </div>
                <Button className="w-full">
                  <Mail className="mr-2 h-4 w-4" />
                  Criar Campanha
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
                <p className="text-sm font-medium text-muted-foreground">Total de Campanhas</p>
                <p className="text-2xl font-bold">{totalCampaigns}</p>
                <p className="text-xs text-muted-foreground">Todas</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <Mail className="h-4 w-4 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Campanhas Ativas</p>
                <p className="text-2xl font-bold">{activeCampaigns}</p>
                <p className="text-xs text-green-600">Em execução</p>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <Play className="h-4 w-4 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Mensagens Enviadas</p>
                <p className="text-2xl font-bold">{totalSent.toLocaleString('pt-BR')}</p>
                <p className="text-xs text-muted-foreground">Este mês</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-full">
                <Send className="h-4 w-4 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Orçamento Total</p>
                <p className="text-2xl font-bold">R$ {totalBudget.toLocaleString('pt-BR')}</p>
                <p className="text-xs text-muted-foreground">Investimento</p>
              </div>
              <div className="p-2 bg-yellow-100 rounded-full">
                <Target className="h-4 w-4 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filtros:</span>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos os status</SelectItem>
                <SelectItem value="draft">Rascunho</SelectItem>
                <SelectItem value="scheduled">Agendada</SelectItem>
                <SelectItem value="active">Ativa</SelectItem>
                <SelectItem value="paused">Pausada</SelectItem>
                <SelectItem value="completed">Finalizada</SelectItem>
              </SelectContent>
            </Select>
            <Select value={channelFilter} onValueChange={setChannelFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Canal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos os canais</SelectItem>
                <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                <SelectItem value="Email">Email</SelectItem>
                <SelectItem value="SMS">SMS</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Campaigns Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Mail className="mr-2 h-5 w-5" />
            Lista de Campanhas
            <Badge variant="secondary" className="ml-2">
              {filteredCampaigns.length} campanha{filteredCampaigns.length !== 1 ? 's' : ''}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Canal</TableHead>
                <TableHead>Público</TableHead>
                <TableHead>Enviadas</TableHead>
                <TableHead>Taxa de Conversão</TableHead>
                <TableHead>Data de Criação</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCampaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell className="font-medium">
                    {campaign.name}
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusColors[campaign.status as keyof typeof statusColors]}>
                      {statusLabels[campaign.status as keyof typeof statusLabels]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <span>{channelIcons[campaign.channel as keyof typeof channelIcons]}</span>
                      <span className="text-sm">{campaign.channel}</span>
                    </div>
                  </TableCell>
                  <TableCell>{campaign.audience}</TableCell>
                  <TableCell>
                    {campaign.sent > 0 ? campaign.sent.toLocaleString('pt-BR') : '-'}
                  </TableCell>
                  <TableCell>
                    {campaign.conversionRate > 0 ? (
                      <span className="font-medium text-green-600">
                        {campaign.conversionRate.toFixed(1)}%
                      </span>
                    ) : '-'}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(campaign.createdAt).toLocaleDateString('pt-BR')}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <BarChart3 className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewDetails(campaign)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Ver detalhes
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDuplicate(campaign.id)}>
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicar
                        </DropdownMenuItem>
                        {(campaign.status === 'active' || campaign.status === 'paused') && (
                          <DropdownMenuItem onClick={() => handleToggleStatus(campaign.id, campaign.status)}>
                            {campaign.status === 'active' ? (
                              <>
                                <Pause className="mr-2 h-4 w-4" />
                                Pausar
                              </>
                            ) : (
                              <>
                                <Play className="mr-2 h-4 w-4" />
                                Retomar
                              </>
                            )}
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Campaign Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Detalhes da Campanha: {selectedCampaign?.name}</DialogTitle>
          </DialogHeader>
          {selectedCampaign && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label className="text-base font-medium mb-3 block">Informações Gerais</Label>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <Badge variant={statusColors[selectedCampaign.status as keyof typeof statusColors]}>
                        {statusLabels[selectedCampaign.status as keyof typeof statusLabels]}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Canal:</span>
                      <span>{selectedCampaign.channel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Público:</span>
                      <span>{selectedCampaign.audience}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Orçamento:</span>
                      <span>R$ {selectedCampaign.budget.toLocaleString('pt-BR')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Criada em:</span>
                      <span>{new Date(selectedCampaign.createdAt).toLocaleDateString('pt-BR')}</span>
                    </div>
                    {selectedCampaign.launchedAt && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Lançada em:</span>
                        <span>{new Date(selectedCampaign.launchedAt).toLocaleDateString('pt-BR')}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium mb-3 block">Métricas de Performance</Label>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Enviadas</p>
                        <p className="text-xl font-bold">{selectedCampaign.sent.toLocaleString('pt-BR')}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Entregues</p>
                        <p className="text-xl font-bold">{selectedCampaign.delivered.toLocaleString('pt-BR')}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Abertas</p>
                        <p className="text-xl font-bold">{selectedCampaign.opened.toLocaleString('pt-BR')}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Cliques</p>
                        <p className="text-xl font-bold">{selectedCampaign.clicked.toLocaleString('pt-BR')}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Conversões</p>
                      <p className="text-2xl font-bold text-green-600">{selectedCampaign.converted}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-base font-medium mb-3 block">Taxa de Performance</Label>
                <CampaignPerformance campaign={selectedCampaign} />
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
                  Fechar
                </Button>
                <Button>
                  Editar Campanha
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

