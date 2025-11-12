
'use client'

import { SessionProvider } from 'next-auth/react'
import { useEffect, useState } from 'react'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <>{children}</>
  }

  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}
