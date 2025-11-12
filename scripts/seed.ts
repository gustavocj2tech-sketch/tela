
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...')

  // Limpar dados existentes
  await prisma.$transaction([
    prisma.webhookLog.deleteMany(),
    prisma.webhook.deleteMany(),
    prisma.conversationTag.deleteMany(),
    prisma.contactTag.deleteMany(),
    prisma.message.deleteMany(),
    prisma.conversation.deleteMany(),
    prisma.opportunityActivity.deleteMany(),
    prisma.opportunity.deleteMany(),
    prisma.contact.deleteMany(),
    prisma.pipelineStage.deleteMany(),
    prisma.campaign.deleteMany(),
    prisma.channel.deleteMany(),
    prisma.blockedContact.deleteMany(),
    prisma.partner.deleteMany(),
    prisma.cost.deleteMany(),
    prisma.attendantStats.deleteMany(),
    prisma.dashboardMetric.deleteMany(),
    prisma.systemConfig.deleteMany(),
    prisma.chatbotFlow.deleteMany(),
    prisma.account.deleteMany(),
    prisma.session.deleteMany(),
    prisma.verificationToken.deleteMany(),
    prisma.user.deleteMany(),
  ])

  // Criar usuários
  const adminPassword = await bcrypt.hash('johndoe123', 12)
  const demoPassword = await bcrypt.hash('admin123', 12)

  const adminUser = await prisma.user.create({
    data: {
      id: 'admin-user-id',
      name: 'João Admin',
      email: 'john@doe.com',
      password: adminPassword,
      role: 'admin',
      company: 'TechBot Corp',
      isActive: true,
    },
  })

  const demoUser = await prisma.user.create({
    data: {
      id: 'demo-user-id',
      name: 'Demo User',
      email: 'admin@techbot.com',
      password: demoPassword,
      role: 'admin',
      company: 'Demo Company',
      isActive: true,
    },
  })

  console.log('✅ Usuários criados')

  // Criar contatos
  const contacts = []
  const nomes = [
    'Maria Silva', 'João Santos', 'Ana Costa', 'Pedro Oliveira', 'Carla Lima',
    'Ricardo Souza', 'Julia Pereira', 'Carlos Ferreira', 'Lucia Almeida', 'Paulo Rodrigues',
    'Fernanda Castro', 'Roberto Dias', 'Camila Torres', 'Diego Martins', 'Isabel Cardoso',
    'Alexandre Ribeiro', 'Patrícia Moreira', 'Felipe Barbosa', 'Adriana Campos', 'Marcos Teixeira',
    'Vanessa Gomes', 'Rafael Nascimento', 'Tatiana Correia', 'Bruno Monteiro', 'Cristina Rocha',
    'Eduardo Pinto', 'Monica Silva', 'Gustavo Araújo', 'Priscila Mendes', 'Renato Carvalho'
  ]

  const estados = ['SP', 'RJ', 'MG', 'RS', 'PR', 'SC', 'GO', 'DF', 'BA', 'CE']
  const cidades = ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Porto Alegre', 'Curitiba', 'Florianópolis', 'Goiânia', 'Brasília', 'Salvador', 'Fortaleza']

  for (let i = 0; i < nomes.length; i++) {
    const contact = await prisma.contact.create({
      data: {
        name: nomes[i],
        email: `${nomes[i].toLowerCase().replace(' ', '.')}@email.com`,
        whatsapp: `11${Math.floor(900000000 + Math.random() * 100000000)}`,
        phone: `11${Math.floor(900000000 + Math.random() * 100000000)}`,
        state: estados[Math.floor(Math.random() * estados.length)],
        city: cidades[Math.floor(Math.random() * cidades.length)],
        status: Math.random() > 0.1 ? 'ACTIVE' : 'INACTIVE',
        assignedUserId: Math.random() > 0.5 ? adminUser.id : demoUser.id,
        notes: `Contato adicionado via ${Math.random() > 0.5 ? 'WhatsApp' : 'Site'}`,
        firstContact: new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000),
      },
    })
    contacts.push(contact)
  }

  console.log('✅ Contatos criados')

  // Criar stages do pipeline
  const stages = await Promise.all([
    prisma.pipelineStage.create({
      data: { name: 'Novo Lead', description: 'Leads recém chegados', order: 1, color: '#3B82F6' }
    }),
    prisma.pipelineStage.create({
      data: { name: 'Qualificação', description: 'Leads sendo qualificados', order: 2, color: '#8B5CF6' }
    }),
    prisma.pipelineStage.create({
      data: { name: 'Proposta', description: 'Proposta enviada', order: 3, color: '#F59E0B' }
    }),
    prisma.pipelineStage.create({
      data: { name: 'Negociação', description: 'Em negociação', order: 4, color: '#EF4444' }
    }),
    prisma.pipelineStage.create({
      data: { name: 'Fechado', description: 'Negócio fechado', order: 5, color: '#10B981' }
    }),
  ])

  console.log('✅ Stages do pipeline criados')

  // Criar oportunidades
  const oportunidades = [
    'Sistema de CRM', 'Consultoria em Marketing Digital', 'Desenvolvimento de Site',
    'Automação de WhatsApp', 'Dashboard Analytics', 'Sistema de Vendas',
    'Integração API', 'Treinamento da Equipe', 'Suporte Técnico', 'Licença Software',
    'Implementação Chatbot', 'Análise de Dados', 'SEO e Marketing', 'E-commerce',
    'Sistema de Estoque', 'App Mobile', 'Backup e Segurança', 'Cloud Migration',
    'ERP Integration', 'Social Media Management'
  ]

  for (let i = 0; i < 20; i++) {
    await prisma.opportunity.create({
      data: {
        title: oportunidades[i],
        description: `Oportunidade de ${oportunidades[i]} para cliente ${contacts[i]?.name}`,
        value: Math.floor(Math.random() * 50000) + 5000,
        contactId: contacts[i % contacts.length]?.id || contacts[0]!.id,
        userId: Math.random() > 0.5 ? adminUser.id : demoUser.id,
        stageId: stages[Math.floor(Math.random() * stages.length)]!.id,
        status: Math.random() > 0.7 ? 'WON' : Math.random() > 0.5 ? 'OPEN' : 'LOST',
        probability: Math.floor(Math.random() * 100),
        source: Math.random() > 0.5 ? 'Website' : Math.random() > 0.5 ? 'WhatsApp' : 'Indicação',
        expectedCloseDate: new Date(Date.now() + Math.floor(Math.random() * 60) * 24 * 60 * 60 * 1000),
      },
    })
  }

  console.log('✅ Oportunidades criadas')

  // Criar conversas
  for (let i = 0; i < 15; i++) {
    const conversation = await prisma.conversation.create({
      data: {
        contactId: contacts[i]?.id || contacts[0]!.id,
        userId: Math.random() > 0.5 ? adminUser.id : demoUser.id,
        status: Math.random() > 0.3 ? 'WAITING' : Math.random() > 0.5 ? 'ACTIVE' : 'CLOSED',
        channel: Math.random() > 0.7 ? 'WhatsApp' : Math.random() > 0.5 ? 'Site' : 'Email',
        department: Math.random() > 0.5 ? 'Vendas' : 'Suporte',
        priority: Math.random() > 0.8 ? 'HIGH' : Math.random() > 0.6 ? 'NORMAL' : 'LOW',
        subject: `Conversa com ${contacts[i]?.name || 'Cliente'}`,
        startedAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
        rating: Math.random() > 0.5 ? Math.floor(Math.random() * 5) + 1 : null,
      },
    })

    // Criar mensagens para esta conversa
    const numMessages = Math.floor(Math.random() * 10) + 3
    for (let j = 0; j < numMessages; j++) {
      await prisma.message.create({
        data: {
          conversationId: conversation.id,
          userId: Math.random() > 0.5 ? adminUser.id : null,
          content: Math.random() > 0.5 ? 
            `Olá! Como posso ajudá-lo hoje?` :
            `Obrigado pelo contato, vou verificar essa informação para você.`,
          isFromCustomer: Math.random() > 0.5,
          createdAt: new Date(conversation.startedAt.getTime() + j * 5 * 60 * 1000),
        },
      })
    }
  }

  console.log('✅ Conversas e mensagens criadas')

  // Criar campanhas
  const campanhas = [
    { name: 'Black Friday 2025', type: 'EMAIL' as const },
    { name: 'Promoção Natal', type: 'WHATSAPP' as const },
    { name: 'Newsletter Mensal', type: 'EMAIL' as const },
    { name: 'Campanha SMS Ofertas', type: 'SMS' as const },
    { name: 'Push App Mobile', type: 'PUSH' as const },
  ]

  for (const campanha of campanhas) {
    await prisma.campaign.create({
      data: {
        name: campanha.name,
        description: `Descrição da campanha ${campanha.name}`,
        type: campanha.type,
        status: Math.random() > 0.5 ? 'RUNNING' : 'SCHEDULED',
        targetAudience: 'Clientes ativos',
        content: `Conteúdo da campanha ${campanha.name}`,
        userId: adminUser.id,
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    })
  }

  console.log('✅ Campanhas criadas')

  // Criar canais
  const canais = [
    { name: 'WhatsApp Business', type: 'WHATSAPP' as const },
    { name: 'Telegram Bot', type: 'TELEGRAM' as const },
    { name: 'Facebook Page', type: 'FACEBOOK' as const },
    { name: 'Instagram Business', type: 'INSTAGRAM' as const },
    { name: 'Email Marketing', type: 'EMAIL' as const },
  ]

  for (const canal of canais) {
    await prisma.channel.create({
      data: {
        name: canal.name,
        type: canal.type,
        status: Math.random() > 0.2 ? 'ACTIVE' : 'INACTIVE',
        isConnected: Math.random() > 0.3,
        lastSync: new Date(Date.now() - Math.floor(Math.random() * 24) * 60 * 60 * 1000),
      },
    })
  }

  console.log('✅ Canais criados')

  // Criar webhooks
  for (let i = 0; i < 5; i++) {
    await prisma.webhook.create({
      data: {
        name: `Webhook ${i + 1}`,
        url: `https://api.exemplo.com/webhook/${i + 1}`,
        method: 'POST',
        events: ['message', 'conversation_started', 'conversation_ended'],
        userId: adminUser.id,
        isActive: Math.random() > 0.3,
        lastTriggered: Math.random() > 0.5 ? new Date() : null,
      },
    })
  }

  console.log('✅ Webhooks criados')

  // Criar parceiros
  const parceiros = [
    { name: 'WhatsApp Business API', type: 'Messaging' },
    { name: 'Mercado Pago', type: 'Payment' },
    { name: 'Google Analytics', type: 'Analytics' },
    { name: 'Zapier', type: 'Automation' },
    { name: 'AWS', type: 'Cloud' },
  ]

  for (const parceiro of parceiros) {
    await prisma.partner.create({
      data: {
        name: parceiro.name,
        type: parceiro.type,
        status: Math.random() > 0.2 ? 'ACTIVE' : 'INACTIVE',
        isConnected: Math.random() > 0.3,
      },
    })
  }

  console.log('✅ Parceiros criados')

  // Criar custos
  const servicos = ['WhatsApp API', 'Servidor AWS', 'Banco de Dados', 'CDN', 'Email Service']
  for (let i = 0; i < 30; i++) {
    await prisma.cost.create({
      data: {
        service: servicos[Math.floor(Math.random() * servicos.length)]!,
        category: Math.random() > 0.5 ? 'Infraestrutura' : 'Serviços',
        amount: Math.random() * 1000 + 50,
        date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
        description: 'Custo mensal do serviço',
      },
    })
  }

  console.log('✅ Custos criados')

  // Criar métricas do dashboard
  const metricsTypes = ['conversations', 'messages', 'sales', 'leads', 'revenue']
  for (let i = 0; i < 50; i++) {
    await prisma.dashboardMetric.create({
      data: {
        type: metricsTypes[Math.floor(Math.random() * metricsTypes.length)]!,
        name: 'Daily Metric',
        value: Math.random() * 1000,
        date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
      },
    })
  }

  console.log('✅ Métricas criadas')

  // Criar configurações do sistema
  await prisma.systemConfig.create({
    data: {
      key: 'company_name',
      value: 'TECHBOT PRO 3.0',
      type: 'string',
    },
  })

  await prisma.systemConfig.create({
    data: {
      key: 'working_hours',
      value: '09:00-18:00',
      type: 'string',
    },
  })

  console.log('✅ Configurações criadas')

  console.log('🎉 Seed concluído com sucesso!')
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
