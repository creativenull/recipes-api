import { customAlphabet } from 'nanoid'
import { Request, Response } from 'opine'
import { Model } from 'denodb'
import Recipe from '../models/recipe.ts'

const RecipeController = {
  async index (_: Request, res: Response<any>) {
    const recipes = await Recipe.all()
    res.json(recipes)
  },

  async create (_: Request, res: Response<any>) {
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
      res.json({ status: 'success', message: 'Successfully generated' })
    } catch (e) {
      res.setStatus(500)
      res.json({ status: 'error', message: 'Failed to create' })
    }
  },

  async read (req: Request, res: Response<any>) {
    const uuid = req.params.id
    const [recipe] = (await Recipe.where({ uuid }).get()) as Model[]
    res.json(recipe)
  },

  // TODO
  // Add edit resource
  update (req: Request, res: Response<any>) {
    const body = req.body
    res.json(body)
  },

  // TODO
  // Add delete resource
  delete (req: Request, res: Response<any>) {
    const body = req.body
    res.json(body)
  }
}

export default RecipeController
