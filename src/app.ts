import express, { Application } from 'express'
import mainRouter from './application/routes/main.route.ts'
import { dbConnection } from './infrasctructure/config/mongoDB.ts'

const app: Application = express()
const PORT: number = 3000

app.use(express.json())
app.use(mainRouter)

async function main (): Promise<void> {
  // Assuring to stablish connection to the database before running the server
  await dbConnection()

  app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
  })
}

// Ignore error handling since it's already handled inside dbConnection()
void main()
