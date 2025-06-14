import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import routes from './routes'

dotenv.config()

const app = express()

const PORT = 3333

app.use(cors())
app.use(express.json())
app.use('/api', routes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
