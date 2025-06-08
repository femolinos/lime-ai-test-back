import prisma from '@/orm/prisma.client'

import { GetPatientByIdParamsSchema } from '@/validators/patient-validators'

export async function fetchAllPatients() {
  const patients = await prisma.patient.findMany()

  return patients
}

export async function findPatientById({ id }: GetPatientByIdParamsSchema) {
  const patient = await prisma.patient.findUnique({
    where: {
      id,
    },
  })

  return patient
}
