// import { Application } from 'abc'
// import { cors } from 'abc/middleware/cors'
// import db from './database/index.ts'
// import { recipeRoutesGroup } from './router/index.ts'
// const app = new Application()

// DB
// db.sync()

// Middlewars
// app.use(cors())

// Routes
// recipeRoutesGroup(app.group('recipes'))

// app.start({ port: 8080 })

import { App } from 'tinyhttp'
import { GraphQLHTTP } from 'gql'
import { schema, root } from './gql/schema.ts'

const app = new App()

app.post('/graphql', GraphQLHTTP({ schema, rootValue: root }))

app.listen(8080, () => {
  console.log('Listening on port 8080')
})
