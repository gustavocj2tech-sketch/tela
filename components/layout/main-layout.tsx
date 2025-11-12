
'use client'

import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Sidebar } from './sidebar'
import { Header } from './header'

export function MainLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  // Páginas que não precisam de layout (login, signup, etc)
  const publicPages = ['/login', '/signup', '/']

  useEffect(() => {
    setMounted(true)
  }, [])

  // Se está em página pública, não mostra o layout principal
  if (publicPages.includes(pathname)) {
    return <>{children}</>
  }

  // Aguarda hidratação antes de usar hooks de session
  if (!mounted) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <span>Carregando...</span>
        </div>
      </div>
    )
  }

  // Layout principal com sidebar e header
  return <AuthenticatedLayout>{children}</AuthenticatedLayout>
}

function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status !== 'loading' && !session) {
      router.push('/login')
    }
  }, [session, status, router])

  if (status === 'loading') {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <span>Carregando...</span>
        </div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <span>Redirecionando...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
