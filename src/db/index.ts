import { MongoClient } from 'mongo'
import { Database } from 'mongo_database'

export async function getDbInstance (): Promise<Database> {
  const client = new MongoClient()
  await client.connect('mongodb://localhost:27017')
  return client.database('recipesdb')
}
