import { nanoid } from 'nanoid'
import { Request, Response } from 'opine'
import { render } from '../render.ts'
import { Model } from 'denodb'
import Recipe from '../models/recipe.ts'

export default class RecipeController {
  public static async index (req: Request, res: Response<any>) {
    const recipes = await Recipe.all()
    res.send(
      await render('recipes/index', { title: 'Recipes App', recipes }, res)
    )
  }

  public static async create (req: Request, res: Response<any>) {
    try {
      const isPizzaOrBurder = Math.random()
      await Recipe.create({
        name: isPizzaOrBurder >= 0.5 ? 'Burger' : 'Pizza',
        uuid: nanoid(),
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
    const uuid = req.params.id
    const [recipe, _] = (await Recipe.where({ uuid }).get()) as Model[]
    res.send(await render('recipes/single', { title: 'Recipe', recipe }, res))
  }

  // TODO
  // Add edit page
  public static async edit (req: Request, res: Response<any>) {
    res.send(await render('recipes/edit', { title: 'Edit Recipe' }, res))
  }

  // TODO
  // Add edit resource
  public static update (req: Request, res: Response<any>) {
    res.send('Update Resource')
  }

  // TODO
  // Add edit resource
  public static delete (req: Request, res: Response<any>) {
    res.send('Delete Resource')
  }
}
