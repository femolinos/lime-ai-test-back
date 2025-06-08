import prisma from '@/orm/prisma.client'

import {
  CreateNoteBodySchema,
  GetNoteByIdParamsSchema,
  UpdateNoteBodySchema,
} from '@/validators/note-validators'

import {
  generateNoteSummary,
  generateSectionGAnswers,
  transcribeAudio,
} from './ai-services'

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
  audio,
}: CreateNoteBodySchema) {
  const transcription = await transcribeAudio(audio.path)
  const summary = await generateNoteSummary(transcription)
  const sectionGAnswers = await generateSectionGAnswers(transcription)

  const newNote = await prisma.note.create({
    data: {
      patientId,
      transcription,
      summary,
      m1800: sectionGAnswers.M1800,
      m1810: sectionGAnswers.M1810,
      m1820: sectionGAnswers.M1820,
      m1830: sectionGAnswers.M1830,
      m1840: sectionGAnswers.M1840,
      m1850: sectionGAnswers.M1850,
      m1860: sectionGAnswers.M1860,
    },
  })

  return newNote
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
