import { Application } from 'abc'
import { cors } from 'abc/middleware/cors'
import db from './database/index.ts'
import { recipeRoutesGroup } from './router/index.ts'
const app = new Application()

// DB
db.sync()

// Middlewars
app.use(cors())

// Routes
recipeRoutesGroup(app.group('recipes'))

app.start({ port: 8080 })
