import { json, urlencoded, opine } from 'opine'
import { opineCors } from 'cors'
import db from './database/index.ts'
import { recipeRoutes } from './router/index.ts'

// Main app instance
const app = opine()

// DB Instance/connection/links
db.sync()

// App plugins
app.use(json())
app.use(urlencoded())
app.use(opineCors())

// App Routes
app.use('/api', recipeRoutes)

app.listen(8080)
