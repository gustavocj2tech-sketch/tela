
'use client'

import { useState } from 'react'
import { 
  Settings, 
  User, 
  Building, 
  Bell, 
  Zap, 
  Shield,
  Save,
  Upload,
  Eye,
  EyeOff,
  Smartphone,
  Monitor,
  Globe
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

// Mock user data
const mockUser = {
  id: 1,
  name: 'Administrador',
  email: 'admin@techbot.com',
  phone: '+55 11 99999-0000',
  role: 'Admin',
  avatar: null,
  company: {
    name: 'TechBot Solutions',
    cnpj: '12.345.678/0001-90',
    email: 'contato@techbot.com',
    phone: '+55 11 3333-4444',
    address: 'Rua das Tecnologias, 123',
    city: 'São Paulo',
    state: 'SP',
    country: 'Brasil',
    zip: '01234-567',
    website: 'https://techbot.com',
    logo: null
  },
  preferences: {
    notifications: {
      email: true,
      sms: false,
      push: true,
      marketing: false
    },
    language: 'pt-BR',
    timezone: 'America/Sao_Paulo',
    theme: 'system'
  },
  security: {
    twoFactorEnabled: false,
    lastPasswordChange: '2024-03-15',
    activeSessions: [
      {
        id: 1,
        device: 'Chrome - Windows',
        location: 'São Paulo, SP',
        lastActive: '2024-06-15T10:30:00',
        current: true
      },
      {
        id: 2,
        device: 'Safari - iPhone',
        location: 'São Paulo, SP',
        lastActive: '2024-06-14T18:45:00',
        current: false
      }
    ]
  }
}

// Mock integrations
const mockIntegrations = [
  { id: 1, name: 'WhatsApp Business', status: 'connected', connectedAt: '2024-05-01' },
  { id: 2, name: 'Google Analytics', status: 'connected', connectedAt: '2024-04-15' },
  { id: 3, name: 'Stripe', status: 'connected', connectedAt: '2024-03-10' },
  { id: 4, name: 'Mailchimp', status: 'disconnected', connectedAt: null },
  { id: 5, name: 'Slack', status: 'connected', connectedAt: '2024-02-20' }
]

// Mock access logs
const mockAccessLogs = [
  {
    id: 1,
    action: 'Login',
    device: 'Chrome - Windows',
    location: 'São Paulo, SP',
    ip: '192.168.1.100',
    timestamp: '2024-06-15T10:30:00',
    success: true
  },
  {
    id: 2,
    action: 'Password Change',
    device: 'Chrome - Windows', 
    location: 'São Paulo, SP',
    ip: '192.168.1.100',
    timestamp: '2024-06-10T14:20:00',
    success: true
  },
  {
    id: 3,
    action: 'Failed Login',
    device: 'Unknown',
    location: 'Rio de Janeiro, RJ',
    ip: '10.0.0.50',
    timestamp: '2024-06-08T22:15:00',
    success: false
  }
]

export default function ConfiguracoesPage() {
  const [activeTab, setActiveTab] = useState('perfil')
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [user, setUser] = useState(mockUser)

  const handleSave = (section: string) => {
    alert(`Salvando configurações de ${section}...`)
  }

  const handleUploadAvatar = () => {
    alert('Upload de avatar não implementado neste demo')
  }

  const handleUploadLogo = () => {
    alert('Upload de logo não implementado neste demo')
  }

  const handleTerminateSession = (sessionId: number) => {
    if (confirm('Tem certeza que deseja encerrar esta sessão?')) {
      alert(`Encerrando sessão ${sessionId}`)
    }
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Configurações</h2>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="perfil" className="flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span>Perfil</span>
          </TabsTrigger>
          <TabsTrigger value="empresa" className="flex items-center space-x-2">
            <Building className="h-4 w-4" />
            <span>Empresa</span>
          </TabsTrigger>
          <TabsTrigger value="notificacoes" className="flex items-center space-x-2">
            <Bell className="h-4 w-4" />
            <span>Notificações</span>
          </TabsTrigger>
          <TabsTrigger value="integracoes" className="flex items-center space-x-2">
            <Zap className="h-4 w-4" />
            <span>Integrações</span>
          </TabsTrigger>
          <TabsTrigger value="seguranca" className="flex items-center space-x-2">
            <Shield className="h-4 w-4" />
            <span>Segurança</span>
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="perfil" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Informações Pessoais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <Button onClick={handleUploadAvatar}>
                    <Upload className="mr-2 h-4 w-4" />
                    Alterar Foto
                  </Button>
                  <p className="text-xs text-muted-foreground mt-1">
                    PNG, JPG até 5MB
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Nome Completo</Label>
                  <Input 
                    defaultValue={user.name}
                    onChange={(e) => setUser({...user, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label>E-mail</Label>
                  <Input 
                    type="email" 
                    defaultValue={user.email}
                    onChange={(e) => setUser({...user, email: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Telefone</Label>
                  <Input 
                    defaultValue={user.phone}
                    onChange={(e) => setUser({...user, phone: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Função</Label>
                  <Select defaultValue={user.role}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Admin">Administrador</SelectItem>
                      <SelectItem value="Manager">Gerente</SelectItem>
                      <SelectItem value="Operator">Operador</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="text-sm font-medium">Alterar Senha</h4>
                <div className="grid grid-cols-1 gap-4 max-w-md">
                  <div>
                    <Label>Senha Atual</Label>
                    <div className="relative">
                      <Input 
                        type={showPassword ? "text" : "password"}
                        placeholder="Digite sua senha atual"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label>Nova Senha</Label>
                    <div className="relative">
                      <Input 
                        type={showNewPassword ? "text" : "password"}
                        placeholder="Digite sua nova senha"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label>Confirmar Nova Senha</Label>
                    <Input 
                      type="password"
                      placeholder="Confirme sua nova senha"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => handleSave('perfil')}>
                  <Save className="mr-2 h-4 w-4" />
                  Salvar Alterações
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Company Tab */}
        <TabsContent value="empresa" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="mr-2 h-5 w-5" />
                Informações da Empresa
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center">
                  <Building className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <Button onClick={handleUploadLogo}>
                    <Upload className="mr-2 h-4 w-4" />
                    Alterar Logo
                  </Button>
                  <p className="text-xs text-muted-foreground mt-1">
                    PNG, JPG até 2MB
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Nome da Empresa</Label>
                  <Input defaultValue={user.company.name} />
                </div>
                <div>
                  <Label>CNPJ</Label>
                  <Input defaultValue={user.company.cnpj} />
                </div>
                <div>
                  <Label>E-mail Corporativo</Label>
                  <Input type="email" defaultValue={user.company.email} />
                </div>
                <div>
                  <Label>Telefone</Label>
                  <Input defaultValue={user.company.phone} />
                </div>
                <div className="col-span-2">
                  <Label>Website</Label>
                  <Input defaultValue={user.company.website} />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="text-sm font-medium">Endereço</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label>Endereço</Label>
                    <Input defaultValue={user.company.address} />
                  </div>
                  <div>
                    <Label>Cidade</Label>
                    <Input defaultValue={user.company.city} />
                  </div>
                  <div>
                    <Label>Estado</Label>
                    <Select defaultValue={user.company.state}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SP">São Paulo</SelectItem>
                        <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                        <SelectItem value="MG">Minas Gerais</SelectItem>
                        <SelectItem value="PR">Paraná</SelectItem>
                        <SelectItem value="SC">Santa Catarina</SelectItem>
                        <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>CEP</Label>
                    <Input defaultValue={user.company.zip} />
                  </div>
                  <div>
                    <Label>País</Label>
                    <Select defaultValue={user.company.country}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Brasil">Brasil</SelectItem>
                        <SelectItem value="Argentina">Argentina</SelectItem>
                        <SelectItem value="Chile">Chile</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => handleSave('empresa')}>
                  <Save className="mr-2 h-4 w-4" />
                  Salvar Alterações
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notificacoes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                Preferências de Notificação
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Notificações por E-mail</Label>
                    <p className="text-sm text-muted-foreground">
                      Receber alertas importantes por e-mail
                    </p>
                  </div>
                  <Switch 
                    defaultChecked={user.preferences.notifications.email}
                    onCheckedChange={(checked) => 
                      setUser({
                        ...user, 
                        preferences: {
                          ...user.preferences,
                          notifications: {
                            ...user.preferences.notifications,
                            email: checked
                          }
                        }
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Notificações SMS</Label>
                    <p className="text-sm text-muted-foreground">
                      Receber alertas críticos por SMS
                    </p>
                  </div>
                  <Switch 
                    defaultChecked={user.preferences.notifications.sms}
                    onCheckedChange={(checked) => 
                      setUser({
                        ...user, 
                        preferences: {
                          ...user.preferences,
                          notifications: {
                            ...user.preferences.notifications,
                            sms: checked
                          }
                        }
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Notificações Push</Label>
                    <p className="text-sm text-muted-foreground">
                      Receber notificações no navegador
                    </p>
                  </div>
                  <Switch 
                    defaultChecked={user.preferences.notifications.push}
                    onCheckedChange={(checked) => 
                      setUser({
                        ...user, 
                        preferences: {
                          ...user.preferences,
                          notifications: {
                            ...user.preferences.notifications,
                            push: checked
                          }
                        }
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Marketing</Label>
                    <p className="text-sm text-muted-foreground">
                      Receber novidades e promoções
                    </p>
                  </div>
                  <Switch 
                    defaultChecked={user.preferences.notifications.marketing}
                    onCheckedChange={(checked) => 
                      setUser({
                        ...user, 
                        preferences: {
                          ...user.preferences,
                          notifications: {
                            ...user.preferences.notifications,
                            marketing: checked
                          }
                        }
                      })
                    }
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="text-sm font-medium">Preferências do Sistema</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Idioma</Label>
                    <Select defaultValue={user.preferences.language}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                        <SelectItem value="en-US">English (US)</SelectItem>
                        <SelectItem value="es-ES">Español</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Fuso Horário</Label>
                    <Select defaultValue={user.preferences.timezone}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/Sao_Paulo">São Paulo (GMT-3)</SelectItem>
                        <SelectItem value="America/New_York">New York (GMT-5)</SelectItem>
                        <SelectItem value="Europe/London">London (GMT+0)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Tema</Label>
                    <Select defaultValue={user.preferences.theme}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Claro</SelectItem>
                        <SelectItem value="dark">Escuro</SelectItem>
                        <SelectItem value="system">Sistema</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => handleSave('notificacoes')}>
                  <Save className="mr-2 h-4 w-4" />
                  Salvar Preferências
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations Tab */}
        <TabsContent value="integracoes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="mr-2 h-5 w-5" />
                Integrações Ativas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockIntegrations.map(integration => (
                  <div key={integration.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{integration.name}</p>
                      <div className="flex items-center space-x-2">
                        <Badge variant={integration.status === 'connected' ? 'secondary' : 'outline'}>
                          {integration.status === 'connected' ? 'Conectado' : 'Desconectado'}
                        </Badge>
                        {integration.connectedAt && (
                          <span className="text-xs text-muted-foreground">
                            desde {new Date(integration.connectedAt).toLocaleDateString('pt-BR')}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Switch defaultChecked={integration.status === 'connected'} />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <Button>
                  <Zap className="mr-2 h-4 w-4" />
                  Gerenciar Integrações
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="seguranca" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Configurações de Segurança
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Autenticação de Dois Fatores (2FA)</Label>
                  <p className="text-sm text-muted-foreground">
                    Adicione uma camada extra de segurança à sua conta
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch defaultChecked={user.security.twoFactorEnabled} />
                  {user.security.twoFactorEnabled && <Badge variant="secondary">Ativo</Badge>}
                </div>
              </div>

              <Separator />

              <div>
                <Label className="text-base font-medium mb-3 block">Sessões Ativas</Label>
                <div className="space-y-3">
                  {user.security.activeSessions.map(session => (
                    <div key={session.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-background rounded">
                          {session.device.includes('iPhone') ? 
                            <Smartphone className="h-4 w-4" /> : 
                            <Monitor className="h-4 w-4" />
                          }
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <p className="text-sm font-medium">{session.device}</p>
                            {session.current && <Badge variant="secondary" className="text-xs">Atual</Badge>}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {session.location} • Último acesso: {new Date(session.lastActive).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      </div>
                      {!session.current && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleTerminateSession(session.id)}
                        >
                          Encerrar
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <Label className="text-base font-medium mb-3 block">Logs de Acesso Recentes</Label>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ação</TableHead>
                      <TableHead>Dispositivo</TableHead>
                      <TableHead>Localização</TableHead>
                      <TableHead>Data/Hora</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockAccessLogs.map(log => (
                      <TableRow key={log.id}>
                        <TableCell className="font-medium">{log.action}</TableCell>
                        <TableCell>{log.device}</TableCell>
                        <TableCell>{log.location}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(log.timestamp).toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </TableCell>
                        <TableCell>
                          <Badge variant={log.success ? 'secondary' : 'destructive'}>
                            {log.success ? 'Sucesso' : 'Falha'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex justify-between">
                <Button variant="outline">
                  <Shield className="mr-2 h-4 w-4" />
                  Baixar Logs Completos
                </Button>
                <Button onClick={() => handleSave('seguranca')}>
                  <Save className="mr-2 h-4 w-4" />
                  Salvar Configurações
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
