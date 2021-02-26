import { HandlerFunc, Context, InternalServerErrorException, BadRequestException } from 'abc'
import { customAlphabet } from 'nanoid'
import { Model } from 'denodb'
import Recipe from '../models/recipe.ts'

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

const RecipeController: RecipeControllerMethods = {
  async index () {
    const recipes = await Recipe.all()
    return recipes
  },

  async create () {
    try {
      const isPizzaOrBurgerOrBoth = Math.random()
      let name: string
      if (isPizzaOrBurgerOrBoth >= 0.3) {
        name = 'Pizza'
      } else if (isPizzaOrBurgerOrBoth < 0.3 && isPizzaOrBurgerOrBoth >= 0.6) {
        name = 'Burger'
      } else {
        name = 'PizzaBurger'
      }

      await Recipe.create({
        name,
        uuid: customAlphabet('1234567890qwertyuiopasdfghjklzxcvbnm', 10)(),
        ingredients: 'dough,sauce,chicken,cheese',
        steps: 'chicken,cheese,sauce on top of dough and bake'
      })

      return {
        status: 'success',
        message: 'Successfully generated'
      }
    } catch (e) {
      throw new InternalServerErrorException()
    }
  },

  async read (c: Context) {
    const uuid = c.params.id
    const [recipe] = (await Recipe.where({ uuid }).get()) as Model[]
    return recipe
  },

  async update (c: Context) {
    const uuid = c.params.id
    const data = JSON.parse(await c.body as string) as UpdateRequestBody

    if (data.name !== undefined || data.ingredients !== undefined || data.steps !== undefined) {
      const recipeResults = (await Recipe.where({ uuid }).get()) as Model[]

      const recipe = recipeResults[0]
      recipe.name = data.name ?? recipe.name
      recipe.ingredients = data.ingredients ?? recipe.ingredients
      recipe.steps = data.steps ?? recipe.steps

      await recipe.update()

      return recipe
    }

    throw new BadRequestException()
  },

  async delete (c: Context) {
    const uuid = c.params.id
    const recipeResults = (await Recipe.where({ uuid }).get()) as Model[]
    const recipe = recipeResults[0]
    await recipe.delete()

    return recipe
  }
}

export default RecipeController
