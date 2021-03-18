import { buildSchema } from 'graphql_deno'
import { customAlphabet } from 'nanoid'

const store = {
  recipes: [
    {
      name: 'Pizza 0',
      uuid: customAlphabet('1234567890qwertyuiopasdfghjklzxcvbnm', 10)(),
      ingredients: 'dough,sauce,chicken,cheese',
      steps: 'chicken,cheese,sauce on top of dough and bake'
    },
    {
      name: 'Pizza 1',
      uuid: customAlphabet('1234567890qwertyuiopasdfghjklzxcvbnm', 10)(),
      ingredients: 'dough,sauce,chicken,cheese',
      steps: 'chicken,cheese,sauce on top of dough and bake'
    },
    {
      name: 'Pizza 2',
      uuid: customAlphabet('1234567890qwertyuiopasdfghjklzxcvbnm', 10)(),
      ingredients: 'dough,sauce,chicken,cheese',
      steps: 'chicken,cheese,sauce on top of dough and bake'
    },
    {
      name: 'Pizza 3',
      uuid: customAlphabet('1234567890qwertyuiopasdfghjklzxcvbnm', 10)(),
      ingredients: 'dough,sauce,chicken,cheese',
      steps: 'chicken,cheese,sauce on top of dough and bake'
    }
  ]
}

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
    description: String
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

  type Recipe2 {
    uuid: String!
    title: String!
    quickSummary: String
    author: Author!
    images: [Image!]
    ingredient: [Ingredient!]
    steps: [Step!]
    notes: String
  }

  type Recipe {
    uuid: String!
    name: String
    ingredients: String
    steps: String
  }

  type Query {
    hello: String
    recipes: [Recipe!]
  }
`)

export const root = {
  hello () {
    return 'Hello World'
  },

  recipes () {
    return store.recipes
  }
}
