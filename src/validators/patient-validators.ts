import { Request } from 'express'
import { z } from 'zod'

const getPatientByIdParamsSchema = z.object({
  id: z.string({ required_error: 'Id is required' }).uuid(),
})

export type GetPatientByIdParamsSchema = z.infer<
  typeof getPatientByIdParamsSchema
>

export function getPatientByIdValidator(req: Request) {
  const { id } = getPatientByIdParamsSchema.parse(req.params)

  return { id }
}
