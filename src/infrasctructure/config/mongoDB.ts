import mongoose from 'mongoose'

const MONGOATLAS_URL = 'mongodb+srv://jdavid:juan123David@jdavidcluster.blk8vtz.mongodb.net/?retryWrites=true&w=majority&appName=jDavidCluster'
const DB_NAME = 'e_commerce'

export async function dbConnection (): Promise<void> {
  try {
    await mongoose.connect(MONGOATLAS_URL, { dbName: DB_NAME })
    console.log(`[DB-STATUS] MongoDB is online, dbName=${mongoose.connection.name}`)
  } catch (error) {
    console.log(error)
    throw new Error('[DB-ERROR] It\'s not possible to connect')
  }
}
