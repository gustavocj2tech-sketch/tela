
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const [total, active, inactive, thisWeek] = await Promise.all([
      prisma.contact.count(),
      prisma.contact.count({ where: { status: 'ACTIVE' } }),
      prisma.contact.count({ where: { status: 'INACTIVE' } }),
      prisma.contact.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          }
        }
      })
    ])

    return NextResponse.json({ total, active, inactive, thisWeek })
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error)
    return NextResponse.json({ total: 0, active: 0, inactive: 0, thisWeek: 0 }, { status: 500 })
  }
}
