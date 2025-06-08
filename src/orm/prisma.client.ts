import { PrismaClient } from '@prisma/client'
import { formatQuery } from 'prisma-query-formatter'

import { logger } from '@/utils/logger'

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  log: [{ emit: 'event', level: 'query' }],
  errorFormat: 'pretty',
})

prisma.$on('query', (e) => {
  const query = formatQuery(e.query, e.params, { escapeParams: true })
  logger.info('QUERY FORMATTED ->', { query })
})

export default prisma
