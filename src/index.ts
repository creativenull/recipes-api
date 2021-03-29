import { App } from 'tinyhttp'
import { cors } from 'tinyhttp_cors'
import { GraphQLHTTP } from 'gql'
import { schema, root } from './gql/schema.ts'

const app = new App()

app.use(cors())

app.post('/graphql', GraphQLHTTP({ schema, rootValue: root }))

app.listen(8080, () => { console.log('Listening on port 8080') })
