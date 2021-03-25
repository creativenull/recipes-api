import { buildSchema } from 'graphql_deno'
import recipeController from '../app/controllers/recipe.ts'

export const schema = buildSchema(`
  type Step {
    stepNum: Int
    description: String
  }

  type Measurement {
    amount: Int
    unit: String
  }

  type Ingredient {
    measurement: Measurement
    name: String
    notes: String
  }

  type Image {
    src: String
    caption: String
  }

  type Author {
    name: String
    avatar: String
  }

  type Recipe {
    uuid: String!
    title: String!
    quickSummary: String
    author: Author!
    images: [Image!]
    ingredient: [Ingredient!]
    steps: [Step!]
    notes: String
  }

  input CreateRecipeInput {
    title: String
    quickSummary: String
    notes: String
  }

  input UpdateRecipeInput {
    title: String
    quickSummary: String
    notes: String
  }

  type Query {
    recipes: [Recipe!]
    recipe(id: String): Recipe
  }

  type Mutation {
    createRecipe(input: CreateRecipeInput!): Recipe
    updateRecipe(id: String!, input: UpdateRecipeInput!): Recipe
    deleteRecipe(id: String!): Boolean
  }
`)

export const root = { ...recipeController }
