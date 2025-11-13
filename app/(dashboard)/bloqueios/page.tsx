
'use client'

import { useState } from 'react'
import { 
  Shield, 
  Plus, 
  Search,
  MoreVertical,
  Unlock,
  Eye,
  AlertCircle,
  Calendar,
  User,
  Filter
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

// Mock blocked contacts
const mockBlockedContacts = [
  {
    id: 1,
    number: '+55 11 99999-8888',
    name: 'Cliente Problemático',
    reason: 'Linguagem ofensiva',
    blockedBy: 'Carlos Souza',
    blockedAt: '2024-06-10T14:30:00',
    status: 'blocked',
    history: [
      { date: '2024-06-10', action: 'Bloqueado', reason: 'Linguagem ofensiva', user: 'Carlos Souza' },
      { date: '2024-06-09', action: 'Advertência', reason: 'Comportamento inadequado', user: 'Ana Santos' }
    ]
  },
  {
    id: 2,
    number: '+55 21 98888-7777',
    name: 'Spam Bot',
    reason: 'Spam / Mensagens repetitivas',
    blockedBy: 'Ana Santos',
    blockedAt: '2024-06-08T09:15:00',
    status: 'blocked',
    history: [
      { date: '2024-06-08', action: 'Bloqueado', reason: 'Spam detectado', user: 'Ana Santos' }
    ]
  },
  {
    id: 3,
    number: '+55 31 97777-6666',
    name: 'Usuário Suspeito',
    reason: 'Atividade suspeita',
    blockedBy: 'Roberto Silva',
    blockedAt: '2024-06-05T16:45:00',
    status: 'blocked',
    history: [
      { date: '2024-06-05', action: 'Bloqueado', reason: 'Atividade suspeita detectada', user: 'Roberto Silva' },
      { date: '2024-06-04', action: 'Monitoramento', reason: 'Comportamento irregular', user: 'Sistema' }
    ]
  },
  {
    id: 4,
    number: '+55 85 96666-5555',
    name: 'Ex-Cliente',
    reason: 'Solicitação do cliente',
    blockedBy: 'Maria Santos',
    blockedAt: '2024-05-28T11:20:00',
    status: 'blocked',
    history: [
      { date: '2024-05-28', action: 'Bloqueado', reason: 'Solicitação de não receber mais mensagens', user: 'Maria Santos' }
    ]
  },
  {
    id: 5,
    number: '+55 47 95555-4444',
    name: 'Número Inválido',
    reason: 'Número inexistente',
    blockedBy: 'Sistema',
    blockedAt: '2024-05-25T08:10:00',
    status: 'blocked',
    history: [
      { date: '2024-05-25', action: 'Bloqueado automaticamente', reason: 'Número inexistente - hard bounce', user: 'Sistema' }
    ]
  }
]

const blockReasons = [
  'Linguagem ofensiva',
  'Spam / Mensagens repetitivas',
  'Atividade suspeita',
  'Solicitação do cliente',
  'Número inexistente',
  'Comportamento inadequado',
  'Violação dos termos',
  'Outro'
]

export default function BloqueiosPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedReason, setSelectedReason] = useState('')
  const [isAddBlockOpen, setIsAddBlockOpen] = useState(false)
  const [selectedContact, setSelectedContact] = useState<any>(null)
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)

  const filteredContacts = mockBlockedContacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.number.includes(searchTerm)
    const matchesReason = !selectedReason || contact.reason === selectedReason
    return matchesSearch && matchesReason
  })

  const handleUnblock = (contactId: number) => {
    // Mock unblock functionality
    alert(`Desbloqueando contato ID: ${contactId}`)
  }

  const handleViewHistory = (contact: any) => {
    setSelectedContact(contact)
    setIsHistoryOpen(true)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Gestão de Bloqueios</h2>
        <div className="flex items-center space-x-2">
          <Dialog open={isAddBlockOpen} onOpenChange={setIsAddBlockOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Bloqueio
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Novo Bloqueio</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Número do WhatsApp</Label>
                  <Input placeholder="+55 11 99999-9999" />
                </div>
                <div>
                  <Label>Nome do Contato</Label>
                  <Input placeholder="Nome do contato (opcional)" />
                </div>
                <div>
                  <Label>Motivo do Bloqueio</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o motivo" />
                    </SelectTrigger>
                    <SelectContent>
                      {blockReasons.map(reason => (
                        <SelectItem key={reason} value={reason}>{reason}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Observações</Label>
                  <Textarea placeholder="Detalhes adicionais sobre o bloqueio..." />
                </div>
                <Button className="w-full">
                  <Shield className="mr-2 h-4 w-4" />
                  Bloquear Contato
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
                <p className="text-sm font-medium text-muted-foreground">Total Bloqueados</p>
                <p className="text-2xl font-bold">{mockBlockedContacts.length}</p>
                <p className="text-xs text-muted-foreground">Contatos ativos</p>
              </div>
              <div className="p-2 bg-red-100 rounded-full">
                <Shield className="h-4 w-4 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Esta Semana</p>
                <p className="text-2xl font-bold">3</p>
                <p className="text-xs text-green-600">-40% vs semana anterior</p>
              </div>
              <div className="p-2 bg-yellow-100 rounded-full">
                <Calendar className="h-4 w-4 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Principal Motivo</p>
                <p className="text-lg font-bold">Linguagem Ofensiva</p>
                <p className="text-xs text-muted-foreground">40% dos casos</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <AlertCircle className="h-4 w-4 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Bloqueios Automáticos</p>
                <p className="text-2xl font-bold">1</p>
                <p className="text-xs text-muted-foreground">Por sistema</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-full">
                <User className="h-4 w-4 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome ou número..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedReason} onValueChange={setSelectedReason}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrar por motivo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos os motivos</SelectItem>
                {blockReasons.map(reason => (
                  <SelectItem key={reason} value={reason}>{reason}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Blocked Contacts Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="mr-2 h-5 w-5" />
            Contatos Bloqueados
            <Badge variant="secondary" className="ml-2">
              {filteredContacts.length} registro{filteredContacts.length !== 1 ? 's' : ''}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Número</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Motivo</TableHead>
                <TableHead>Bloqueado por</TableHead>
                <TableHead>Data/Hora</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContacts.map((contact) => (
                <TableRow key={contact.id}>
                  <TableCell className="font-mono">
                    {contact.number}
                  </TableCell>
                  <TableCell className="font-medium">
                    {contact.name}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {contact.reason}
                    </Badge>
                  </TableCell>
                  <TableCell>{contact.blockedBy}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(contact.blockedAt)}
                  </TableCell>
                  <TableCell>
                    <Badge variant="destructive">
                      Bloqueado
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewHistory(contact)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Ver histórico
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleUnblock(contact.id)}>
                          <Unlock className="mr-2 h-4 w-4" />
                          Desbloquear
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredContacts.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-sm">Nenhum contato bloqueado encontrado</p>
              <p className="text-xs">Use os filtros acima para refinar sua busca</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Contact History Dialog */}
      <Dialog open={isHistoryOpen} onOpenChange={setIsHistoryOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Histórico de Bloqueio</DialogTitle>
          </DialogHeader>
          {selectedContact && (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-muted/50">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Contato</Label>
                    <p className="text-sm">{selectedContact.name}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Número</Label>
                    <p className="text-sm font-mono">{selectedContact.number}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Status Atual</Label>
                    <Badge variant="destructive">Bloqueado</Badge>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Último Motivo</Label>
                    <p className="text-sm">{selectedContact.reason}</p>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-3 block">Histórico de Ações</Label>
                <div className="space-y-3">
                  {selectedContact.history?.map((entry: any, index: number) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/30">
                      <div className="p-1 bg-muted rounded-full mt-1">
                        <Calendar className="h-3 w-3" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">{entry.action}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(entry.date).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                        <p className="text-sm text-muted-foreground">{entry.reason}</p>
                        <p className="text-xs text-muted-foreground">Por: {entry.user}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsHistoryOpen(false)}>
                  Fechar
                </Button>
                <Button variant="destructive" onClick={() => handleUnblock(selectedContact.id)}>
                  <Unlock className="mr-2 h-4 w-4" />
                  Desbloquear Contato
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
