import { Context } from 'oak'
import { graphql, buildSchema, GraphQLSchema } from 'graphql_deno'
import recipeController from '../../app/controllers/recipe.ts'

/**
 * Retrieve the schema from .gql file
 *
 * @returns {GraphQLSchema}
 */
function getSchema (): GraphQLSchema {
  const decoder = new TextDecoder('utf-8')
  const data = Deno.readFileSync('./src/routes/gql/schema.gql')
  const stringData = decoder.decode(data)
  return buildSchema(stringData)
}

/**
 * GraphQL Middleware
 *
 * @param {Context} c
 * @returns {Promise<void>}
 */
export async function graphqlRouter (c: Context): Promise<void> {
  const schema = getSchema()
  const root = { ...recipeController }
  const bodyOpts = c.request.body({ type: 'json' })

  try {
    const body = await bodyOpts.value
    const gqlResponse = await graphql(schema, body.query, root)
    c.response.type = 'application/json'
    c.response.body = gqlResponse
  } catch (e) {
    c.response.status = 500
    c.response.body = 'Server Issue'
  }
}
