
'use client'

import { useSession, signOut } from 'next-auth/react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import { Bell, Moon, Sun, User, LogOut, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'

export function Header() {
  const { data: session } = useSession() || {}
  const { theme, setTheme } = useTheme()

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/login' })
  }

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      <div className="flex items-center space-x-4">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <div className="relative h-8 w-12">
            <Image
              src={theme === 'dark' ? '/logo-branco.png' : '/logo-colorido.png'}
              alt="TECHBOT PRO 3.0"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="hidden text-lg font-semibold md:inline-block">
            TECHBOT PRO 3.0
          </span>
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        {/* Notificações */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative" 
              aria-label="Ver 3 notificações"
              title="Ver 3 notificações"
              onClick={() => {/* Dropdown is handled by DropdownMenuTrigger */}}
            >
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notificações (3)</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div className="flex flex-col gap-1">
                <p className="font-medium">Nova conversa iniciada</p>
                <p className="text-sm text-muted-foreground">
                  Maria Silva iniciou uma conversa - há 5 min
                </p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="flex flex-col gap-1">
                <p className="font-medium">Meta de vendas atingida</p>
                <p className="text-sm text-muted-foreground">
                  Parabéns! Meta mensal foi atingida - há 1 hora
                </p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="flex flex-col gap-1">
                <p className="font-medium">Webhook com erro</p>
                <p className="text-sm text-muted-foreground">
                  Verificar configuração do webhook - há 2 horas
                </p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Toggle Tema */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Alternar tema</span>
        </Button>

        {/* Menu do Usuário */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="flex items-center space-x-2"
              aria-label={`Menu de ${session?.user?.name || 'Usuário'}`}
              title={`Abrir menu de ${session?.user?.name || 'Usuário'}`}
              onClick={() => {/* Dropdown is handled by DropdownMenuTrigger */}}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                <User className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="hidden font-medium md:inline-block">
                {session?.user?.name || 'Usuário'}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {session?.user?.name || 'Usuário'}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {session?.user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/configuracoes" className="flex items-center">
                <Settings className="mr-2 h-4 w-4" />
                <span>Configurações</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
