import { Database, MongoDBConnector } from 'denodb'
import { config } from 'dotenv'
import Recipe from '../app/models/recipe.ts'

const env = config()
const connector = new MongoDBConnector({
  uri: env.DB_HOST,
  database: env.DB_DATABASE
  // username: env.DB_USERNAME,
  // password: env.DB_PASSWORD
})
const db = new Database(connector)

db.link([Recipe])

export default db
