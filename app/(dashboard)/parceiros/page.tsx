
'use client'

import { useState } from 'react'
import { 
  Handshake, 
  Settings,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ExternalLink,
  Zap,
  Shield,
  BarChart3,
  Mail,
  DollarSign,
  Package
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
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'

// Mock partners data
const mockPartners = [
  {
    id: 1,
    name: 'Stripe',
    description: 'Processamento de pagamentos online',
    category: 'Pagamentos',
    icon: '💳',
    status: 'connected',
    connectedAt: '2024-05-15',
    features: ['Pagamentos por cartão', 'PIX', 'Boleto', 'Assinaturas'],
    website: 'https://stripe.com',
    config: {
      publicKey: 'pk_test_***',
      secretKey: 'sk_test_***',
      webhookEndpoint: 'https://techbot.com/webhook/stripe'
    }
  },
  {
    id: 2,
    name: 'Mailchimp',
    description: 'Plataforma de email marketing',
    category: 'Marketing',
    icon: '📧',
    status: 'connected',
    connectedAt: '2024-04-20',
    features: ['Email campaigns', 'Automação', 'Segmentação', 'Analytics'],
    website: 'https://mailchimp.com',
    config: {
      apiKey: 'mc_api_***',
      listId: 'list123',
      datacenter: 'us10'
    }
  },
  {
    id: 3,
    name: 'Google Analytics',
    description: 'Análise de dados e comportamento',
    category: 'Analytics',
    icon: '📊',
    status: 'connected',
    connectedAt: '2024-03-10',
    features: ['Tracking', 'Conversões', 'Relatórios', 'Dashboards'],
    website: 'https://analytics.google.com',
    config: {
      trackingId: 'GA-123456789',
      measurementId: 'G-ABCD1234'
    }
  },
  {
    id: 4,
    name: 'Zapier',
    description: 'Automação entre aplicativos',
    category: 'Automação',
    icon: '⚡',
    status: 'available',
    connectedAt: null,
    features: ['Workflows', 'Triggers', '5000+ integrações', 'Automação'],
    website: 'https://zapier.com',
    config: null
  },
  {
    id: 5,
    name: 'HubSpot',
    description: 'CRM e automação de vendas',
    category: 'CRM',
    icon: '🎯',
    status: 'available',
    connectedAt: null,
    features: ['CRM', 'Sales Pipeline', 'Lead Scoring', 'Reports'],
    website: 'https://hubspot.com',
    config: null
  },
  {
    id: 6,
    name: 'Shopify',
    description: 'Plataforma de e-commerce',
    category: 'E-commerce',
    icon: '🛒',
    status: 'available',
    connectedAt: null,
    features: ['Loja online', 'Inventário', 'Pagamentos', 'Analytics'],
    website: 'https://shopify.com',
    config: null
  },
  {
    id: 7,
    name: 'Calendly',
    description: 'Agendamento de reuniões',
    category: 'Produtividade',
    icon: '📅',
    status: 'error',
    connectedAt: '2024-02-15',
    features: ['Agendamentos', 'Calendário', 'Notificações', 'Integrações'],
    website: 'https://calendly.com',
    config: {
      apiKey: 'cal_***',
      eventType: 'consultation'
    }
  },
  {
    id: 8,
    name: 'Slack',
    description: 'Comunicação em equipe',
    category: 'Comunicação',
    icon: '💬',
    status: 'connected',
    connectedAt: '2024-01-20',
    features: ['Mensagens', 'Canais', 'Notificações', 'Bots'],
    website: 'https://slack.com',
    config: {
      webhookUrl: 'https://hooks.slack.com/***',
      channel: '#customer-support'
    }
  }
]

const statusColors = {
  connected: 'secondary',
  available: 'outline',
  error: 'destructive'
} as const

const statusIcons = {
  connected: CheckCircle,
  available: XCircle,
  error: AlertTriangle
}

const categoryIcons = {
  'Pagamentos': DollarSign,
  'Marketing': Mail,
  'Analytics': BarChart3,
  'Automação': Zap,
  'CRM': Handshake,
  'E-commerce': Package,
  'Produtividade': Settings,
  'Comunicação': Mail
}

function PartnerCard({ partner }: { partner: any }) {
  const [isConfigOpen, setIsConfigOpen] = useState(false)
  const StatusIcon = statusIcons[partner.status as keyof typeof statusIcons]
  const CategoryIcon = categoryIcons[partner.category as keyof typeof categoryIcons]

  const handleConnect = () => {
    if (partner.status === 'connected') {
      alert(`Desconectando ${partner.name}...`)
    } else {
      alert(`Conectando ${partner.name}...`)
    }
  }

  const handleConfigure = () => {
    setIsConfigOpen(true)
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">
              {partner.icon}
            </div>
            <div>
              <CardTitle className="text-lg">{partner.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{partner.description}</p>
              <div className="flex items-center space-x-2 mt-2">
                <Badge variant="outline" className="text-xs">
                  {partner.category}
                </Badge>
                <div className="flex items-center space-x-1">
                  <StatusIcon className="h-3 w-3" />
                  <Badge variant={statusColors[partner.status as keyof typeof statusColors]} className="text-xs">
                    {partner.status === 'connected' ? 'Conectado' : 
                     partner.status === 'available' ? 'Disponível' : 'Erro'}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label className="text-sm font-medium mb-2 block">Recursos</Label>
          <div className="flex flex-wrap gap-1">
            {partner.features.slice(0, 4).map((feature: string, index: number) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {feature}
              </Badge>
            ))}
          </div>
        </div>

        {partner.connectedAt && (
          <div className="text-xs text-muted-foreground">
            Conectado em: {new Date(partner.connectedAt).toLocaleDateString('pt-BR')}
          </div>
        )}

        <div className="flex space-x-2">
          <Button 
            variant={partner.status === 'connected' ? 'destructive' : 'default'} 
            size="sm" 
            className="flex-1"
            onClick={handleConnect}
          >
            {partner.status === 'connected' ? (
              <>
                <XCircle className="mr-2 h-3 w-3" />
                Desconectar
              </>
            ) : (
              <>
                <CheckCircle className="mr-2 h-3 w-3" />
                Conectar
              </>
            )}
          </Button>
          
          {partner.status === 'connected' && (
            <Button variant="outline" size="sm" onClick={handleConfigure}>
              <Settings className="h-3 w-3" />
            </Button>
          )}
          
          <Button variant="outline" size="sm" asChild>
            <a href={partner.website} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-3 w-3" />
            </a>
          </Button>
        </div>
      </CardContent>

      {/* Configuration Dialog */}
      <Dialog open={isConfigOpen} onOpenChange={setIsConfigOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Configuração - {partner.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground">
              Configure as credenciais e parâmetros para {partner.name}
            </div>
            
            {partner.config && (
              <div className="space-y-3">
                {Object.entries(partner.config).map(([key, value]) => (
                  <div key={key}>
                    <Label className="text-sm capitalize">
                      {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                    </Label>
                    <Input 
                      defaultValue={String(value)} 
                      type={key.toLowerCase().includes('secret') || key.toLowerCase().includes('key') ? 'password' : 'text'}
                    />
                  </div>
                ))}
              </div>
            )}

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Integração ativa</Label>
                <p className="text-xs text-muted-foreground">
                  Habilitar sincronização automática
                </p>
              </div>
              <Switch defaultChecked={partner.status === 'connected'} />
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsConfigOpen(false)}>
                Cancelar
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

export default function ParceirosPage() {
  const [selectedCategory, setSelectedCategory] = useState('')

  const filteredPartners = selectedCategory 
    ? mockPartners.filter(p => p.category === selectedCategory)
    : mockPartners

  const connectedPartners = mockPartners.filter(p => p.status === 'connected').length
  const availablePartners = mockPartners.filter(p => p.status === 'available').length
  const partnersWithError = mockPartners.filter(p => p.status === 'error').length
  const categories = Array.from(new Set(mockPartners.map(p => p.category)))

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Integrações com Parceiros</h2>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Conectados</p>
                <p className="text-2xl font-bold">{connectedPartners}</p>
                <p className="text-xs text-green-600">Integrações ativas</p>
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
                <p className="text-sm font-medium text-muted-foreground">Disponíveis</p>
                <p className="text-2xl font-bold">{availablePartners}</p>
                <p className="text-xs text-muted-foreground">Para conectar</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <Handshake className="h-4 w-4 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Com Problemas</p>
                <p className="text-2xl font-bold">{partnersWithError}</p>
                <p className="text-xs text-red-600">Requer atenção</p>
              </div>
              <div className="p-2 bg-red-100 rounded-full">
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Categorias</p>
                <p className="text-2xl font-bold">{categories.length}</p>
                <p className="text-xs text-muted-foreground">Tipos disponíveis</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-full">
                <Package className="h-4 w-4 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium">Filtrar por categoria:</span>
            <div className="flex flex-wrap gap-2">
              <Button 
                variant={selectedCategory === '' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setSelectedCategory('')}
              >
                Todas
              </Button>
              {categories.map(category => {
                const Icon = categoryIcons[category as keyof typeof categoryIcons]
                return (
                  <Button 
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    <Icon className="mr-1 h-3 w-3" />
                    {category}
                  </Button>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Partners Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPartners.map(partner => (
          <PartnerCard key={partner.id} partner={partner} />
        ))}
      </div>

      {/* Integration Benefits */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="mr-2 h-5 w-5" />
            Benefícios das Integrações
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                <h4 className="text-sm font-medium text-blue-900 mb-1">
                  🔄 Automação Completa
                </h4>
                <p className="text-xs text-blue-700">
                  Sincronize dados automaticamente entre plataformas e elimine trabalho manual.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                <h4 className="text-sm font-medium text-green-900 mb-1">
                  📊 Visão Unificada
                </h4>
                <p className="text-xs text-green-700">
                  Centralize informações de clientes, vendas e marketing em um só lugar.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
                <h4 className="text-sm font-medium text-purple-900 mb-1">
                  ⚡ Eficiência Máxima
                </h4>
                <p className="text-xs text-purple-700">
                  Reduza tempo de configuração com integrações pré-configuradas.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-amber-50 border border-amber-200">
                <h4 className="text-sm font-medium text-amber-900 mb-1">
                  🛡️ Segurança Total
                </h4>
                <p className="text-xs text-amber-700">
                  Conexões seguras com criptografia e autenticação avançada.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

