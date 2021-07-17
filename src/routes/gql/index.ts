import { Context, Router, RouterContext } from 'oak'
import { buildSchema, graphql, GraphQLSchema } from 'graphql_deno'
import { applyGraphQL, gql, GQLError } from 'oak_graphql'
import recipeController from '../../app/controllers/recipe.ts'

/**
 * Retrieve the schema from .gql file
 *
 * @returns {GraphQLSchema}
 */
function getSchema(): GraphQLSchema {
  const decoder = new TextDecoder('utf-8')
  const data = Deno.readFileSync('./src/routes/gql/schema.gql')
  const stringData = decoder.decode(data)
  return buildSchema(stringData)
}

function getSchemaAsString(): string {
  const decoder = new TextDecoder('utf-8')
  const data = Deno.readFileSync('./src/routes/gql/schema.gql')
  const stringData = decoder.decode(data)
  return stringData
}

/**
 * GraphQL Middleware
 *
 * @param {Context} c
 * @returns {Promise<void>}
 */
export async function graphqlRouter(c: Context): Promise<void> {
  const schema = getSchema()
  const root = { ...recipeController }
  const bodyOpts = c.request.body({ type: 'json' })

  try {
    const body = await bodyOpts.value
    const gqlResponse = await graphql(schema, body.query, root)
    c.response.type = 'application/json'
    c.response.body = gqlResponse
  } catch (_) {
    c.response.status = 500
    c.response.body = 'Server Issue'
  }
}

export const GraphQLService = await applyGraphQL<Router>({
  Router,
  typeDefs: getSchemaAsString(),
  resolvers: {
    Query: {
      recipes: recipeController.recipes,
      recipe: recipeController.recipe,
    },
    Mutation: {
      createRecipe: recipeController.createRecipe,
      updateRecipe: recipeController.updateRecipe,
      deleteRecipe: recipeController.deleteRecipe,
    },
  },
  usePlayground: true,
})
