import { Database, MongoDBConnector } from 'denodb'

// TODO
// Finish implementation of database and models
const connector = new MongoDBConnector({
  uri: 'mongodb://localhost:27017',
  database: 'recipesdb'
})
const db = new Database(connector)

export default db
