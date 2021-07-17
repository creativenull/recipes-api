import { Application } from 'oak'
import { oakCors } from 'oak_cors'
import { GraphQLService } from './routes/gql/index.ts'
// import router from "./routes/index.ts";

const app = new Application()
app.addEventListener('listen', (ctx) => {
  console.log('Listening on port:', ctx.port)
})

app.use(oakCors())
app.use(GraphQLService.routes(), GraphQLService.allowedMethods())
// app.use(router.routes());
// app.use(router.allowedMethods());

await app.listen({ port: 8080 })
