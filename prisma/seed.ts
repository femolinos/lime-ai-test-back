import prisma from '@/orm/prisma.client'
import { faker } from '@faker-js/faker'

import { logger } from '@/utils/logger'

async function seed() {
  await prisma.patient.createMany({
    data: Array.from({ length: 5 }).map(() => {
      return {
        name: faker.person.fullName(),
      }
    }),
  })
}

seed()
  .then(() => {
    console.log('Database seeded!')
  })
  .catch((error) => {
    logger.error('Error while seeding database:', error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
