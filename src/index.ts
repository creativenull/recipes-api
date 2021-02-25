import { json, opine } from 'opine'
import { opineCors } from 'cors'
import db from './database/index.ts'
import { recipeRoutes } from './router/index.ts'

// Main app instance
const app = opine()

// DB Instance/connection/links
db.sync()

// TODO
// FIX THE DAMN CORS
// App plugins
app.use(opineCors())

// app.use((req, res, next) => {
//   // @ts-ignore
//   res.headers['Access-Control-Allow-Origin'] = '*'
//   // @ts-ignore
//   res.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept'
//   next()
// })

app.use(json())

// App Routes
app.use('/api', recipeRoutes)

app.listen(8080)
