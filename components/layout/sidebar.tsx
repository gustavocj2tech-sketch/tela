
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import {
  BarChart3,
  MessageSquare,
  Users,
  Target,
  FileText,
  TrendingUp,
  DollarSign,
  Shield,
  Radio,
  Bot,
  Filter,
  Mail,
  Webhook,
  Handshake,
  Settings,
  ChevronDown,
  ChevronRight,
  Home,
  Calendar,
  Zap,
  Star,
  Clock,
  Activity,
  PieChart
} from 'lucide-react'

interface NavItem {
  title: string
  href: string
  icon: any
  badge?: string
  children?: NavItem[]
}

const navigation: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: BarChart3,
    children: [
      { title: 'Dashboard Geral', href: '/dashboard/geral', icon: Home },
      { title: 'Dashboard Atendimento', href: '/dashboard/atendimento', icon: MessageSquare },
      { title: 'Dashboard Oportunidades', href: '/dashboard/oportunidades', icon: Target },
      { title: 'Dashboard Vendas', href: '/dashboard/vendas', icon: DollarSign },
      { title: 'Dashboard Resumo', href: '/dashboard/resumo', icon: FileText },
      { title: 'Dashboard Operação ao Vivo', href: '/dashboard/operacao', icon: Activity },
      { title: 'Dashboard Qualidade/CSAT', href: '/dashboard/qualidade', icon: Star },
      { title: 'Dashboard Créditos & IA', href: '/dashboard/creditos', icon: Zap },
      { title: 'Dashboard Canais & Qualidade WA', href: '/dashboard/canais', icon: Radio },
    ]
  },
  { title: 'Atendimento', href: '/atendimento', icon: MessageSquare, badge: '12' },
  { title: 'Contatos', href: '/contatos', icon: Users },
  { title: 'Pipeline', href: '/pipeline', icon: Target },
  { title: 'BI-Atendimento', href: '/bi-atendimento', icon: TrendingUp },
  { title: 'BI-Contatos', href: '/bi-contatos', icon: PieChart },
  { title: 'Custos', href: '/custos', icon: DollarSign },
  { title: 'Bloqueios', href: '/bloqueios', icon: Shield },
  { title: 'Canais', href: '/canais', icon: Radio },
  { title: 'Chatbot', href: '/chatbot', icon: Bot },
  { title: 'Funil', href: '/funil', icon: Filter },
  { title: 'Campanhas', href: '/campanhas', icon: Mail },
  { title: 'Webhooks', href: '/webhooks', icon: Webhook },
  { title: 'Parceiros', href: '/parceiros', icon: Handshake },
  { title: 'Configurações', href: '/configuracoes', icon: Settings }
]

export function Sidebar() {
  const pathname = usePathname()
  const [openItems, setOpenItems] = useState<string[]>(['Dashboard'])

  const toggleItem = (title: string) => {
    setOpenItems(prev =>
      prev.includes(title)
        ? prev.filter(item => item !== title)
        : [...prev, title]
    )
  }

  const renderNavItem = (item: NavItem, depth = 0) => {
    const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
    const isOpen = openItems.includes(item.title)
    const hasChildren = item.children && item.children.length > 0

    if (hasChildren) {
      return (
        <Collapsible key={item.title} open={isOpen} onOpenChange={() => toggleItem(item.title)}>
          <CollapsibleTrigger asChild>
            <Button
              variant={isActive ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-between text-left font-normal",
                depth > 0 && "ml-4",
                isActive && "bg-primary/10 text-primary font-medium"
              )}
            >
              <div className="flex items-center">
                <item.icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
                {item.badge && (
                  <span className="ml-2 rounded-full bg-primary px-2 py-1 text-xs text-primary-foreground">
                    {item.badge}
                  </span>
                )}
              </div>
              {isOpen ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1 pl-4">
            {item.children?.map(child => renderNavItem(child, depth + 1))}
          </CollapsibleContent>
        </Collapsible>
      )
    }

    return (
      <Link key={item.href} href={item.href}>
        <Button
          variant={isActive ? "secondary" : "ghost"}
          className={cn(
            "w-full justify-start text-left font-normal",
            depth > 0 && "ml-4",
            isActive && "bg-primary/10 text-primary font-medium"
          )}
        >
          <item.icon className="mr-2 h-4 w-4" />
          <span>{item.title}</span>
          {item.badge && (
            <span className="ml-auto rounded-full bg-primary px-2 py-1 text-xs text-primary-foreground">
              {item.badge}
            </span>
          )}
        </Button>
      </Link>
    )
  }

  return (
    <div className="flex h-full w-64 flex-col border-r bg-background">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-sm font-bold text-primary-foreground">T</span>
          </div>
          <span className="text-lg font-semibold">TECHBOT PRO</span>
        </Link>
      </div>
      <ScrollArea className="flex-1 px-3">
        <div className="space-y-1 py-4">
          {navigation.map(item => renderNavItem(item))}
        </div>
      </ScrollArea>
    </div>
  )
}
