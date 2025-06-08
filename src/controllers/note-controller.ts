import { Request, Response } from 'express'
import { ZodError } from 'zod'

import {
  fetchAllNotes,
  findNoteById,
  updatePatientNote,
} from '@/services/note-services'

import {
  getNoteByIdValidator,
  updateNoteValidator,
} from '@/validators/note-validators'

import { logger } from '@/utils/logger'

export async function fetchNotes(req: Request, res: Response) {
  try {
    const notes = await fetchAllNotes()

    if (!notes) {
      return res.status(404).json({ message: 'Notes not found!' })
    }

    res.json({ message: 'Notes found', notes })
  } catch (error) {
    logger.error('Error fetching notes', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export async function getNoteById(req: Request, res: Response) {
  try {
    const { id } = getNoteByIdValidator(req)

    const note = await findNoteById({ id })

    if (!note) {
      return res.status(404).json({ message: 'Note not found!' })
    }

    res.json({ message: 'Note found', note })
  } catch (error) {
    logger.error('Error fetching note by id', error)

    if (error instanceof ZodError) {
      return res
        .status(400)
        .json({ message: 'Invalid request params', errors: error.errors })
    }

    return res.status(500).json({ message: 'Internal server error' })
  }
}

export async function updateNote(req: Request, res: Response) {
  try {
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
    } = updateNoteValidator(req)

    const note = await updatePatientNote({
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
    })

    if (!note) {
      return res.status(404).json({ message: 'Note not found!' })
    }

    res.json({ message: 'Note updated', note })
  } catch (error) {
    logger.error('Error updating note', error)

    if (error instanceof ZodError) {
      return res
        .status(400)
        .json({ message: 'Invalid request params/body', errors: error.errors })
    }

    return res.status(500).json({ message: 'Internal server error' })
  }
}
