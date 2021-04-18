// import { App } from 'tinyhttp'
// import { cors } from 'tinyhttp_cors'
// import { applyGraphQL } from 'oak_graphql'
// import { GraphQLHTTP } from 'gql'
import { Application, Router } from 'oak'
import { oakCors } from 'oak_cors'
import graphqlHTTP from 'koa_graphql'
import { schema, root } from './gql/schema.ts'

const app = new Application()

app.addEventListener('listen', (ctx) => {
  console.log('Listening on port:', ctx.port)
})

const router = new Router()

router.all('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true
}))

app.use(oakCors())

app.use(router.routes())
app.use(router.allowedMethods())

// app.get('/', () => { console.log('received') })
// app.post('/graphql', GraphQLHTTP({ schema, rootValue: root }))
await app.listen({ port: 8080 })
