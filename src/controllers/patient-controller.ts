import { Request, Response } from 'express'

import { fetchAllPatients, findPatientById } from '@/services/patient-services'

import { getPatientByIdValidator } from '@/validators/patient-validators'

import { logger } from '@/utils/logger'
import { ZodError } from 'zod'

export async function fetchPatients(req: Request, res: Response) {
  try {
    const patients = await fetchAllPatients()

    if (!patients) {
      return res.status(404).json({ message: 'Patients not found!' })
    }

    res.json({ message: 'Patients found', patients })
  } catch (error) {
    logger.error('Error fetching patients', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export async function getPatientById(req: Request, res: Response) {
  try {
    const { id } = getPatientByIdValidator(req)

    const patient = await findPatientById({ id })

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found!' })
    }

    res.json({ message: 'Patient found', patient })
  } catch (error) {
    logger.error('Error fetching patient by id', error)

    if (error instanceof ZodError) {
      return res
        .status(400)
        .json({ message: 'Invalid request params', errors: error.errors })
    }

    return res.status(500).json({ message: 'Internal server error' })
  }
}
