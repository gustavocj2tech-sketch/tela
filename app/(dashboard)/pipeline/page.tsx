
'use client'

import { useState } from 'react'
import { 
  Target, 
  Plus, 
  Filter, 
  Search,
  DollarSign,
  Calendar,
  User,
  MoreVertical,
  Eye,
  Edit,
  Archive
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

// Mock pipeline stages
const pipelineStages = [
  { id: 'lead', name: 'Lead', color: 'bg-blue-100 text-blue-800' },
  { id: 'contato', name: 'Contato', color: 'bg-yellow-100 text-yellow-800' },
  { id: 'proposta', name: 'Proposta', color: 'bg-purple-100 text-purple-800' },
  { id: 'negociacao', name: 'Negociação', color: 'bg-orange-100 text-orange-800' },
  { id: 'fechado', name: 'Fechado', color: 'bg-green-100 text-green-800' },
  { id: 'perdido', name: 'Perdido', color: 'bg-red-100 text-red-800' }
]

// Mock opportunities
const mockOpportunities = [
  {
    id: 1,
    title: 'Empresa ABC - Sistema CRM',
    value: 25000,
    company: 'ABC Tecnologia',
    contact: 'João Silva',
    stage: 'lead',
    daysInStage: 3,
    probability: 25,
    lastActivity: '2024-06-15',
    responsible: 'Ana Santos'
  },
  {
    id: 2,
    title: 'XYZ Corp - Consultoria',
    value: 45000,
    company: 'XYZ Corporation',
    contact: 'Maria Costa',
    stage: 'contato',
    daysInStage: 7,
    probability: 40,
    lastActivity: '2024-06-14',
    responsible: 'Carlos Lima'
  },
  {
    id: 3,
    title: 'Tech Solutions - Integração',
    value: 35000,
    company: 'Tech Solutions',
    contact: 'Pedro Rocha',
    stage: 'proposta',
    daysInStage: 12,
    probability: 65,
    lastActivity: '2024-06-13',
    responsible: 'Ana Santos'
  },
  {
    id: 4,
    title: 'Digital Inc - Plataforma',
    value: 60000,
    company: 'Digital Inc',
    contact: 'Lucia Ferreira',
    stage: 'negociacao',
    daysInStage: 5,
    probability: 80,
    lastActivity: '2024-06-15',
    responsible: 'Roberto Silva'
  },
  {
    id: 5,
    title: 'StartupX - MVP',
    value: 15000,
    company: 'StartupX',
    contact: 'Marco Oliveira',
    stage: 'lead',
    daysInStage: 1,
    probability: 20,
    lastActivity: '2024-06-15',
    responsible: 'Fernanda Costa'
  },
  {
    id: 6,
    title: 'MegaCorp - Automação',
    value: 85000,
    company: 'MegaCorp Ltd',
    contact: 'Julia Rocha',
    stage: 'proposta',
    daysInStage: 8,
    probability: 70,
    lastActivity: '2024-06-12',
    responsible: 'Carlos Lima'
  },
  {
    id: 7,
    title: 'LocalBiz - Website',
    value: 8000,
    company: 'Local Business',
    contact: 'André Santos',
    stage: 'contato',
    daysInStage: 4,
    probability: 35,
    lastActivity: '2024-06-14',
    responsible: 'Ana Santos'
  },
  {
    id: 8,
    title: 'GrowthCo - Marketing',
    value: 28000,
    company: 'Growth Company',
    contact: 'Patricia Lima',
    stage: 'negociacao',
    daysInStage: 15,
    probability: 75,
    lastActivity: '2024-06-11',
    responsible: 'Roberto Silva'
  }
]

function OpportunityCard({ opportunity, onEdit }: { 
  opportunity: any; 
  onEdit: (opportunity: any) => void 
}) {
  const getDaysColor = (days: number) => {
    if (days > 14) return 'text-red-600'
    if (days > 7) return 'text-yellow-600'
    return 'text-green-600'
  }

  return (
    <Card className="mb-3 hover:shadow-md transition-shadow cursor-pointer">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h4 className="text-sm font-medium mb-1 line-clamp-2">
              {opportunity.title}
            </h4>
            <p className="text-xs text-muted-foreground mb-2">
              {opportunity.company}
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <MoreVertical className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(opportunity)}>
                <Eye className="mr-2 h-4 w-4" />
                Ver detalhes
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Archive className="mr-2 h-4 w-4" />
                Arquivar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-green-600">
              R$ {opportunity.value.toLocaleString('pt-BR')}
            </span>
            <Badge variant="outline" className="text-xs">
              {opportunity.probability}%
            </Badge>
          </div>

          <div className="flex items-center text-xs text-muted-foreground">
            <User className="mr-1 h-3 w-3" />
            {opportunity.contact}
          </div>

          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center text-muted-foreground">
              <Calendar className="mr-1 h-3 w-3" />
              {opportunity.lastActivity}
            </div>
            <span className={`font-medium ${getDaysColor(opportunity.daysInStage)}`}>
              {opportunity.daysInStage} dias
            </span>
          </div>

          <div className="text-xs text-muted-foreground">
            Responsável: {opportunity.responsible}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function PipelinePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedResponsible, setSelectedResponsible] = useState('')
  const [selectedOpportunity, setSelectedOpportunity] = useState<any>(null)
  const [isNewOpportunityOpen, setIsNewOpportunityOpen] = useState(false)

  const filteredOpportunities = mockOpportunities.filter(opp => {
    const matchesSearch = opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opp.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesResponsible = !selectedResponsible || opp.responsible === selectedResponsible
    return matchesSearch && matchesResponsible
  })

  const getOpportunitiesByStage = (stageId: string) => {
    return filteredOpportunities.filter(opp => opp.stage === stageId)
  }

  const getTotalValueByStage = (stageId: string) => {
    return getOpportunitiesByStage(stageId).reduce((sum, opp) => sum + opp.value, 0)
  }

  const responsibles = Array.from(new Set(mockOpportunities.map(opp => opp.responsible)))

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Pipeline de Vendas</h2>
        <div className="flex items-center space-x-2">
          <Dialog open={isNewOpportunityOpen} onOpenChange={setIsNewOpportunityOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nova Oportunidade
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Nova Oportunidade</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Título da Oportunidade</Label>
                  <Input placeholder="Ex: Empresa ABC - Sistema CRM" />
                </div>
                <div>
                  <Label>Empresa</Label>
                  <Input placeholder="Nome da empresa" />
                </div>
                <div>
                  <Label>Valor (R$)</Label>
                  <Input type="number" placeholder="0" />
                </div>
                <div>
                  <Label>Responsável</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o responsável" />
                    </SelectTrigger>
                    <SelectContent>
                      {responsibles.map(resp => (
                        <SelectItem key={resp} value={resp}>{resp}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Observações</Label>
                  <Textarea placeholder="Informações adicionais..." />
                </div>
                <Button className="w-full">
                  Criar Oportunidade
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar oportunidades..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Select value={selectedResponsible} onValueChange={setSelectedResponsible}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Todos os responsáveis" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Todos os responsáveis</SelectItem>
            {responsibles.map(resp => (
              <SelectItem key={resp} value={resp}>{resp}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Pipeline Board */}
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
        {pipelineStages.map(stage => (
          <div key={stage.id} className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Badge className={stage.color}>
                    {stage.name}
                  </Badge>
                  <span className="text-sm font-medium">
                    {getOpportunitiesByStage(stage.id).length}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  R$ {getTotalValueByStage(stage.id).toLocaleString('pt-BR')}
                </div>
              </CardHeader>
            </Card>

            <div className="space-y-3 min-h-96">
              {getOpportunitiesByStage(stage.id).map(opportunity => (
                <OpportunityCard
                  key={opportunity.id}
                  opportunity={opportunity}
                  onEdit={setSelectedOpportunity}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Opportunity Details Dialog */}
      <Dialog open={!!selectedOpportunity} onOpenChange={() => setSelectedOpportunity(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedOpportunity?.title}</DialogTitle>
          </DialogHeader>
          {selectedOpportunity && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Empresa</Label>
                  <p className="text-sm text-muted-foreground">{selectedOpportunity.company}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Contato</Label>
                  <p className="text-sm text-muted-foreground">{selectedOpportunity.contact}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Valor</Label>
                  <p className="text-lg font-bold text-green-600">
                    R$ {selectedOpportunity.value.toLocaleString('pt-BR')}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Probabilidade</Label>
                  <p className="text-sm">{selectedOpportunity.probability}%</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Responsável</Label>
                  <p className="text-sm text-muted-foreground">{selectedOpportunity.responsible}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Tempo no Estágio</Label>
                  <p className="text-sm text-muted-foreground">{selectedOpportunity.daysInStage} dias</p>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setSelectedOpportunity(null)}>
                  Fechar
                </Button>
                <Button>
                  Editar Oportunidade
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
