import { customAlphabet } from 'nanoid'
import { Request, Response } from 'opine'
import { render } from '../render.ts'
import { Model } from 'denodb'
import Recipe from '../models/recipe.ts'

const RecipeController = {
  async index (_: Request, res: Response<any>) {
    const recipes = await Recipe.all()
    res.send(
      await render('recipes/index', { title: 'Recipes App', recipes }, res)
    )
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
      res.setStatus(200)
      res.send('Created Resource')
    } catch (e) {
      res.setStatus(500)
      res.send()
    }
  },

  async read (req: Request, res: Response<any>) {
    const uuid = req.params.id
    const [recipe] = (await Recipe.where({ uuid }).get()) as Model[]
    res.send(await render('recipes/single', { title: 'Recipe', recipe }, res))
  },

  // TODO
  // Add edit page
  async edit (req: Request, res: Response<any>) {
    res.send(await render('recipes/edit', { title: 'Edit Recipe', id: req.params.id }, res))
  },

  // TODO
  // Add edit resource
  update (_: Request, res: Response<any>) {
    res.send('Update Resource')
  },

  // TODO
  // Add delete resource
  delete (_: Request, res: Response<any>) {
    res.send('Delete Resource')
  }
}

export default RecipeController
