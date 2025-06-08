import { Request } from 'express'
import { z } from 'zod'

const getNoteByIdParamsSchema = z.object({
  id: z.string({ required_error: 'Id is required' }).uuid(),
})

export type GetNoteByIdParamsSchema = z.infer<typeof getNoteByIdParamsSchema>

export function getNoteByIdValidator(req: Request) {
  const { id } = getNoteByIdParamsSchema.parse(req.params)

  return { id }
}

const updateNoteBodySchema = z.object({
  id: z.string({ required_error: 'Id is required' }).uuid(),
  transcription: z.string().optional(),
  summary: z.string().optional(),
  m1800: z.string().optional(),
  m1810: z.string().optional(),
  m1820: z.string().optional(),
  m1830: z.string().optional(),
  m1840: z.string().optional(),
  m1850: z.string().optional(),
  m1860: z.string().optional(),
})

export type UpdateNoteBodySchema = z.infer<typeof updateNoteBodySchema>

export function updateNoteValidator(req: Request) {
  const {
    id,
    transcription,
    summary,
    m1800,
    m1810,
    m1820,
    m1830,
    m1840,
    m1850,
    m1860,
  } = updateNoteBodySchema.parse({ id: req.params, ...req.body })

  return {
    id,
    transcription,
    summary,
    m1800,
    m1810,
    m1820,
    m1830,
    m1840,
    m1850,
    m1860,
  }
}
