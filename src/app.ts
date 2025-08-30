import express, { Application, Request, Response } from 'express'

const app: Application = express()
const PORT: number = 3000

app.use(express.json())

app.get('/', (_req: Request, res: Response) => {
  res.send({
    title: 'this is my title',
    description: 'that was just for testing porpuses'
  })
})

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`)
})
