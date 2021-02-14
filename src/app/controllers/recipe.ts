import { Request, Response } from 'opine'
import { render } from '../render.ts';

export default class RecipeController {
  public static async index (req: Request, res: Response<any>) {
    // TODO
    // Find a way to get data from Mongo
    const recipes = [{ title: 'Pizza' }, { title: 'Burger' }]
    res.send(await render('recipes/index', { title: 'Recipes App', recipes }, res))
  }

  public static create (req: Request, res: Response<any>) {
    res.send('Create Resource')
  }

  public static read (req: Request, res: Response<any>) {
    res.send('Read Resource')
  }

  public static update (req: Request, res: Response<any>) {
    res.send('Update Resource')
  }

  public static delete (req: Request, res: Response<any>) {
    res.send('Delete Resource')
  }
}
