
'use client'

import { useState, useEffect } from 'react'
import {
  Users,
  Search,
  Filter,
  Download,
  Upload,
  Plus,
  MessageSquare,
  Edit,
  ArrowRightLeft,
  Tag,
  Trash2,
  MoreHorizontal
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { toast } from '@/components/ui/use-toast'

interface Contact {
  id: string
  name: string
  email: string | null
  whatsapp: string
  state: string
  status: string
  firstContact: string
  tags: Array<{ id: string; name: string; color: string }> | null
  assignedUser: { name: string | null } | null
}

function ContactActions({ contactId }: { contactId: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Abrir menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Ações</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => toast({ title: "Iniciar chat", description: "Redirecionando..." })}>
          <MessageSquare className="mr-2 h-4 w-4" />
          Iniciar Chat
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => toast({ title: "Editar contato", description: "Funcionalidade em desenvolvimento" })}>
          <Edit className="mr-2 h-4 w-4" />
          Editar
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => toast({ title: "Transferir contato", description: "Funcionalidade em desenvolvimento" })}>
          <ArrowRightLeft className="mr-2 h-4 w-4" />
          Transferir
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => toast({ title: "Editar tags", description: "Funcionalidade em desenvolvimento" })}>
          <Tag className="mr-2 h-4 w-4" />
          Editar Tags
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-600" onClick={() => toast({ title: "Deletar contato", description: "Funcionalidade em desenvolvimento", variant: "destructive" })}>
          <Trash2 className="mr-2 h-4 w-4" />
          Deletar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default function ContatosPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [stats, setStats] = useState({ total: 0, active: 0, inactive: 0, thisWeek: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [contactsRes, statsRes] = await Promise.all([
        fetch('/api/contacts'),
        fetch('/api/contacts/stats')
      ])

      if (contactsRes.ok) {
        const contactsData = await contactsRes.json()
        setContacts(contactsData)
      }

      if (statsRes.ok) {
        const statsData = await statsRes.json()
        setStats(statsData)
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      'ACTIVE': 'default',
      'INACTIVE': 'secondary',
      'BLOCKED': 'destructive'
    } as const

    const labels = {
      'ACTIVE': 'Ativo',
      'INACTIVE': 'Inativo',
      'BLOCKED': 'Bloqueado'
    }

    return (
      <Badge variant={variants[status as keyof typeof variants] || 'secondary'}>
        {labels[status as keyof typeof labels] || status}
      </Badge>
    )
  }

  const handleImport = () => {
    toast({
      title: "Importar contatos",
      description: "Funcionalidade em desenvolvimento"
    })
  }

  const handleExport = () => {
    toast({
      title: "Exportar contatos",
      description: "Gerando arquivo CSV..."
    })
  }

  const handleAddContact = () => {
    toast({
      title: "Adicionar contato",
      description: "Funcionalidade em desenvolvimento"
    })
  }

  const handleFilter = () => {
    toast({
      title: "Filtros",
      description: "Funcionalidade em desenvolvimento"
    })
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Contatos</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={handleImport}>
            <Upload className="mr-2 h-4 w-4" />
            Importar
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Button size="sm" onClick={handleAddContact}>
            <Plus className="mr-2 h-4 w-4" />
            Adicionar
          </Button>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Contatos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              Todos os contatos cadastrados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contatos Ativos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.active}</div>
            <p className="text-xs text-muted-foreground">
              {((stats.active / (stats.total || 1)) * 100).toFixed(1)}% do total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contatos Inativos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.inactive}</div>
            <p className="text-xs text-muted-foreground">
              Precisam ser reativados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Novos esta Semana</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.thisWeek}</div>
            <p className="text-xs text-muted-foreground">
              Últimos 7 dias
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros e Busca */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Lista de Contatos</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome ou número..."
                  className="pl-8 w-80"
                />
              </div>
              <Button variant="outline" size="sm" onClick={handleFilter}>
                <Filter className="mr-2 h-4 w-4" />
                Filtros
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="h-96 animate-pulse bg-muted rounded" />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>WhatsApp</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Primeiro contato</TableHead>
                  <TableHead>Etiquetas</TableHead>
                  <TableHead>Atendente vinculado</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contacts.map((contact) => (
                  <TableRow key={contact.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-3">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-xs font-medium">
                            {contact.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{contact.name}</p>
                          {contact.email && (
                            <p className="text-xs text-muted-foreground">{contact.email}</p>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-mono text-sm">{contact.whatsapp}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{contact.state}</span>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(contact.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-sm">
                          {new Date(contact.firstContact).toLocaleDateString('pt-BR')}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(contact.firstContact).toLocaleTimeString('pt-BR', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {contact.tags?.map((tag) => (
                          <Badge
                            key={tag.id}
                            variant="secondary"
                            className="text-xs"
                            style={{ backgroundColor: `${tag.color}20`, color: tag.color }}
                          >
                            {tag.name}
                          </Badge>
                        ))}
                        {(!contact.tags || contact.tags.length === 0) && (
                          <span className="text-xs text-muted-foreground">Sem tags</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {contact.assignedUser ? (
                        <div className="flex items-center space-x-2">
                          <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-xs">
                              {contact.assignedUser.name?.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <span className="text-sm">{contact.assignedUser.name}</span>
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">Não atribuído</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <ContactActions contactId={contact.id} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          
          {!loading && contacts.length === 0 && (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Nenhum contato encontrado</h3>
              <p className="text-muted-foreground">
                Comece adicionando contatos ao seu sistema.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
