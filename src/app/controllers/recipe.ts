import { Request, Response } from 'opine'
import { render } from '../render.ts'
import Recipe from '../models/recipe.ts'

// TODO
// Start rendering pages from Eta renderer to the controller
export default class RecipeController {
  public static async index (req: Request, res: Response<any>) {
    const recipes = [{ title: 'Pizza' }, { title: 'Burger' }]
    res.send(
      await render('recipes/index', { title: 'Recipes App', recipes }, res)
    )
  }

  public static async create (req: Request, res: Response<any>) {
    try {
      await Recipe.create({
        name: 'Pizza',
        ingredients: 'dough,sauce,chicken,cheese',
        steps: 'chicken,cheese,sauce on top of dough and bake'
      })
      res.setStatus(200)
      res.send('Created Resource')
    } catch (e) {
      res.setStatus(500)
      res.send()
    }
  }

  public static async read (req: Request, res: Response<any>) {
    res.send(await render('recipes/single', { title: 'Recipe' }, res))
  }

  public static async edit (req: Request, res: Response<any>) {
    res.send(await render('recipes/edit', { title: 'Edit Recipe' }, res))
  }

  public static update (req: Request, res: Response<any>) {
    res.send('Update Resource')
  }

  public static delete (req: Request, res: Response<any>) {
    res.send('Delete Resource')
  }
}
