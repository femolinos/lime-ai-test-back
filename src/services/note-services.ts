import prisma from '@/orm/prisma.client'

import {
  CreateNoteBodySchema,
  GetNoteByIdParamsSchema,
  UpdateNoteBodySchema,
} from '@/validators/note-validators'

export async function fetchAllNotes() {
  const notes = await prisma.note.findMany()

  return notes
}

export async function findNoteById({ id }: GetNoteByIdParamsSchema) {
  const note = await prisma.note.findUnique({ where: { id } })

  return note
}

export async function createNewPatientNote({
  patientId,
  file,
}: CreateNoteBodySchema) {
  // TODO: insert logic here
}

export async function updatePatientNote({
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
}: UpdateNoteBodySchema) {
  const note = await prisma.note.update({
    where: { id },
    data: {
      transcription,
      summary,
      m1800,
      m1810,
      m1820,
      m1830,
      m1840,
      m1850,
      m1860,
    },
  })

  return note
}
