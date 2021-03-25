import { App } from 'tinyhttp'
import { GraphQLHTTP } from 'gql'
import { schema, root } from './gql/schema.ts'

const app = new App()

app.post('/graphql', GraphQLHTTP({ schema, rootValue: root }))

app.listen(8080, () => { console.log('Listening on port 8080') })
