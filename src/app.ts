import express, { Application } from 'express'
import mainRouter from './application/routes/main.route.ts'

const app: Application = express()
const PORT: number = 3000

app.use(express.json())
app.use(mainRouter)

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`)
})
