import express from 'express'
import { doSomething } from '@/test/someFile'

const app = express()

const PORT = 3333

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

app.get('/test', (req, res) => {
  doSomething()

  res.json({
    message: 'Hello World',
  })
})
