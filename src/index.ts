import { json, urlencoded, opine } from 'opine'
import db from './database/index.ts'
import router from './router/index.ts'
import * as eta from 'eta'
import config from './config.ts'

// Main app instance
const app = opine()

// DB Instance/connection/links
db.sync()

// App plugins
app.use(json())
app.use(urlencoded())

// App templating
const basePath: string = config.basePath
eta.configure({
  cache: true,
  views: `${basePath}/src/templates`
})

// App Routes
app.use('/', router)

app.listen(8080)
