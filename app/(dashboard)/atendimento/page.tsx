
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import {
  MessageSquare,
  Search,
  Filter,
  Plus,
  Send,
  Smile,
  Paperclip,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle,
  Circle,
  User
} from 'lucide-react'
import { toast } from '@/hooks/use-toast'

interface Conversation {
  id: string
  contact: {
    name: string
    whatsapp: string
    avatar?: string
  }
  status: 'WAITING' | 'ACTIVE' | 'CLOSED'
  lastMessage: string
  lastMessageTime: Date
  unreadCount: number
  channel: string
  priority: 'HIGH' | 'NORMAL' | 'LOW'
}

interface Message {
  id: string
  content: string
  isFromCustomer: boolean
  timestamp: Date
  type: 'text' | 'image' | 'file'
}

export default function AtendimentoPage() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [filter, setFilter] = useState('ALL')
  const [searchTerm, setSearchTerm] = useState('')
  const [isInitiateDialogOpen, setIsInitiateDialogOpen] = useState(false)

  // Simulação de dados - em produção viria da API
  useEffect(() => {
    const mockConversations: Conversation[] = [
      {
        id: '1',
        contact: { name: 'Maria Silva', whatsapp: '11987654321' },
        status: 'WAITING',
        lastMessage: 'Olá, gostaria de saber sobre os produtos...',
        lastMessageTime: new Date(Date.now() - 5 * 60 * 1000),
        unreadCount: 2,
        channel: 'WhatsApp',
        priority: 'HIGH'
      },
      {
        id: '2',
        contact: { name: 'João Santos', whatsapp: '11987654322' },
        status: 'ACTIVE',
        lastMessage: 'Perfeito! Aguardo o orçamento.',
        lastMessageTime: new Date(Date.now() - 15 * 60 * 1000),
        unreadCount: 0,
        channel: 'WhatsApp',
        priority: 'NORMAL'
      },
      {
        id: '3',
        contact: { name: 'Ana Costa', whatsapp: '11987654323' },
        status: 'CLOSED',
        lastMessage: 'Obrigada pelo atendimento!',
        lastMessageTime: new Date(Date.now() - 60 * 60 * 1000),
        unreadCount: 0,
        channel: 'WhatsApp',
        priority: 'LOW'
      },
      {
        id: '4',
        contact: { name: 'Pedro Oliveira', whatsapp: '11987654324' },
        status: 'WAITING',
        lastMessage: 'Preciso de suporte técnico urgente',
        lastMessageTime: new Date(Date.now() - 2 * 60 * 1000),
        unreadCount: 1,
        channel: 'Site',
        priority: 'HIGH'
      },
      {
        id: '5',
        contact: { name: 'Carla Lima', whatsapp: '11987654325' },
        status: 'ACTIVE',
        lastMessage: 'Pode me ajudar com o pagamento?',
        lastMessageTime: new Date(Date.now() - 30 * 60 * 1000),
        unreadCount: 0,
        channel: 'WhatsApp',
        priority: 'NORMAL'
      }
    ]
    setConversations(mockConversations)
  }, [])

  const filteredConversations = conversations?.filter(conv => {
    const matchesFilter = filter === 'ALL' || conv.status === filter || 
      (filter === 'ATIVOS' && conv.status === 'ACTIVE') ||
      (filter === 'PENDENTES' && conv.status === 'WAITING') ||
      (filter === 'FECHADOS' && conv.status === 'CLOSED')
    
    const matchesSearch = !searchTerm || 
      conv.contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.contact.whatsapp.includes(searchTerm)
      
    return matchesFilter && matchesSearch
  }) ?? []

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation)
    
    // Mock messages para a conversa selecionada
    const mockMessages: Message[] = [
      {
        id: '1',
        content: 'Olá! Como posso ajudá-lo hoje?',
        isFromCustomer: false,
        timestamp: new Date(Date.now() - 60 * 60 * 1000),
        type: 'text'
      },
      {
        id: '2',
        content: conversation.lastMessage,
        isFromCustomer: true,
        timestamp: conversation.lastMessageTime,
        type: 'text'
      }
    ]
    setMessages(mockMessages)
  }

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      isFromCustomer: false,
      timestamp: new Date(),
      type: 'text'
    }

    setMessages(prev => [...prev, message])
    setNewMessage('')
    
    toast({
      title: "Mensagem enviada!",
      description: `Mensagem enviada para ${selectedConversation.contact.name}`,
    })
  }

  const handleInitiateService = (data: any) => {
    toast({
      title: "Atendimento iniciado!",
      description: `Novo atendimento iniciado via ${data.channel}`,
    })
    setIsInitiateDialogOpen(false)
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      'WAITING': 'secondary',
      'ACTIVE': 'default',
      'CLOSED': 'outline'
    } as const
    
    const labels = {
      'WAITING': 'Aguardando',
      'ACTIVE': 'Ativo',
      'CLOSED': 'Fechado'
    }

    return (
      <Badge variant={variants[status as keyof typeof variants]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    )
  }

  const getPriorityColor = (priority: string) => {
    const colors = {
      'HIGH': 'text-red-500',
      'NORMAL': 'text-blue-500',
      'LOW': 'text-green-500'
    }
    return colors[priority as keyof typeof colors]
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-background">
      {/* Lista de Conversas */}
      <div className="w-80 border-r bg-card">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Conversas</h3>
            <Dialog open={isInitiateDialogOpen} onOpenChange={setIsInitiateDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="h-8">
                  <Plus className="h-4 w-4 mr-1" />
                  Iniciar
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Iniciar Novo Atendimento</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div>
                    <Label htmlFor="channel">Canal</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o canal" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="whatsapp">WhatsApp</SelectItem>
                        <SelectItem value="telegram">Telegram</SelectItem>
                        <SelectItem value="site">Site</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="department">Departamento</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o departamento" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vendas">Vendas</SelectItem>
                        <SelectItem value="suporte">Suporte</SelectItem>
                        <SelectItem value="financeiro">Financeiro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="message">Mensagem Inicial</Label>
                    <Textarea 
                      placeholder="Digite a mensagem inicial..."
                      className="min-h-[100px]"
                    />
                  </div>
                  <Button 
                    onClick={handleInitiateService} 
                    className="w-full"
                  >
                    Iniciar Atendimento
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Busca */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar conversas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Filtros */}
          <div className="flex gap-2 mb-4">
            {['ALL', 'ATIVOS', 'PENDENTES', 'FECHADOS'].map((filterOption) => (
              <Button
                key={filterOption}
                variant={filter === filterOption ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter(filterOption)}
                className="text-xs"
              >
                {filterOption === 'ALL' ? 'Todos' : filterOption.charAt(0) + filterOption.slice(1).toLowerCase()}
              </Button>
            ))}
          </div>
        </div>

        {/* Lista */}
        <ScrollArea className="h-[calc(100%-200px)]">
          <div className="p-2">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`p-3 rounded-lg cursor-pointer hover:bg-muted/50 mb-2 ${
                  selectedConversation?.id === conversation.id ? 'bg-muted' : ''
                }`}
                onClick={() => handleSelectConversation(conversation)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-5 w-5" />
                      </div>
                      <div className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-background ${
                        conversation.priority === 'HIGH' ? 'bg-red-500' :
                        conversation.priority === 'NORMAL' ? 'bg-blue-500' : 'bg-green-500'
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{conversation.contact.name}</p>
                      <p className="text-xs text-muted-foreground">{conversation.contact.whatsapp}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    {getStatusBadge(conversation.status)}
                    {conversation.unreadCount > 0 && (
                      <Badge variant="destructive" className="h-5 w-5 p-0 text-xs rounded-full">
                        {conversation.unreadCount}
                      </Badge>
                    )}
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground truncate mb-1">
                  {conversation.lastMessage}
                </p>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{conversation.channel}</span>
                  <span>{conversation.lastMessageTime.toLocaleTimeString('pt-BR', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}</span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Área do Chat */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Header do Chat */}
            <div className="p-4 border-b bg-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">{selectedConversation.contact.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedConversation.contact.whatsapp} • {selectedConversation.channel}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusBadge(selectedConversation.status)}
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Mensagens */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isFromCustomer ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-3 py-2 rounded-lg ${
                        message.isFromCustomer
                          ? 'bg-muted text-foreground'
                          : 'bg-primary text-primary-foreground'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs mt-1 opacity-70">
                        {message.timestamp.toLocaleTimeString('pt-BR', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Input de Mensagem */}
            <div className="p-4 border-t bg-card">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <div className="flex-1 relative">
                  <Input
                    placeholder="Digite sua mensagem..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="pr-10"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                  >
                    <Smile className="h-4 w-4" />
                  </Button>
                </div>
                <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="h-24 w-24 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <MessageSquare className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Selecione uma conversa</h3>
              <p className="text-muted-foreground">
                Escolha uma conversa da lista para começar o atendimento
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Detalhes do Contato */}
      {selectedConversation && (
        <div className="w-80 border-l bg-card p-4">
          <h4 className="font-medium mb-4">Detalhes do Contato</h4>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-6 w-6" />
              </div>
              <div>
                <p className="font-medium">{selectedConversation.contact.name}</p>
                <p className="text-sm text-muted-foreground">Cliente</p>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{selectedConversation.contact.whatsapp}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                <span>{selectedConversation.channel}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>Primeiro contato: Hoje</span>
              </div>
            </div>

            <Separator />

            <div>
              <h5 className="font-medium mb-2">Tags</h5>
              <div className="flex flex-wrap gap-1">
                <Badge variant="secondary">VIP</Badge>
                <Badge variant="secondary">Interessado</Badge>
              </div>
            </div>

            <div>
              <h5 className="font-medium mb-2">Histórico</h5>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  <span className="text-muted-foreground">Conversa iniciada</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Circle className="h-3 w-3 text-muted-foreground" />
                  <span className="text-muted-foreground">Aguardando resposta</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
