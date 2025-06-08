import { Router } from 'express'

import { fetchPatients, getPatientById } from '@/controllers/patient-controller'
import {
  fetchNotes,
  getNoteById,
  updateNote,
} from '@/controllers/note-controller'

const router = Router()

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
router.put('/note/:id', (req, res) => {
  updateNote(req, res)
})

export default router
