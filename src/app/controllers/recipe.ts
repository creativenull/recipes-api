import { HandlerFunc, Context } from 'abc'
import { customAlphabet } from 'nanoid'

interface UpdateRequestBody {
  name: string
  ingredients: string
  steps: string
}

interface RecipeControllerMethods {
  index: HandlerFunc
  create: HandlerFunc
  read: HandlerFunc
  update: HandlerFunc
  delete: HandlerFunc
}

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

const RecipeController: RecipeControllerMethods = {
  async index () {
    return store.recipes
  },

  async create () {
    return null
  },

  async read (c: Context) {
    const uuid = c.params.id
    const [recipe] = store.recipes.filter(item => item.uuid === uuid)
    return recipe
  },

  async update (c: Context) {
    const uuid = c.params.id
    const data = await c.body as UpdateRequestBody

    if (data.name !== undefined || data.ingredients !== undefined || data.steps !== undefined) {
      const [recipeResults] = store.recipes.filter(item => item.uuid === uuid)

      const recipe = recipeResults
      recipe.name = data.name ?? recipe.name
      recipe.ingredients = data.ingredients ?? recipe.ingredients
      recipe.steps = data.steps ?? recipe.steps

      const ind = store.recipes.findIndex(item => item.uuid === uuid)
      store.recipes[ind] = {
        ...store.recipes[ind],
        ...recipe
      }

      return recipe
    }

    return null
  },

  async delete (c: Context) {
    return true
  }
}

export default RecipeController
