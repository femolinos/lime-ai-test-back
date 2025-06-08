import { Router } from 'express'
import multer from 'multer'

import { fetchPatients, getPatientById } from '@/controllers/patient-controller'
import {
  createNote,
  fetchNotes,
  getNoteById,
  updateNote,
} from '@/controllers/note-controller'

const router = Router()

const upload = multer({
  dest: 'uploads/',
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = [
      'audio/flac',
      'audio/x-m4a',
      'audio/mpeg',
      'audio/mp4',
      'audio/ogg',
      'audio/wav',
      'audio/webm',
    ]

    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(
        new Error(
          'Invalid file type. Supported formats: flac, m4a, mp3, mp4, ogg, wav, webm',
        ),
      )
    }
  },
})

router.get('/patients', (req, res) => {
  fetchPatients(req, res)
})
router.get('/patient/:id', (req, res) => {
  getPatientById(req, res)
})

router.get('/notes', (req, res) => {
  fetchNotes(req, res)
})
router.get('/note/:id', (req, res) => {
  getNoteById(req, res)
})
router.post('/note', upload.single('audio'), (req, res) => {
  createNote(req, res)
})
router.put('/note/:id', (req, res) => {
  updateNote(req, res)
})

export default router
