import { json, urlencoded, opine } from 'opine'
import router from './router/index.ts'
import * as eta from 'eta'
import config from './config.ts'

const app = opine()

app.use(json())
app.use(urlencoded())

eta.configure({
  cache: true,
  views: `${config.basePath}/src/templates`
})
app.use('/', router);

app.listen(8080)
