import { Recipe } from '../models/recipe.ts'
import { getDbInstance } from '../../database/index.ts'

interface RecipeSchema extends Recipe {
  _id: { $oid: string }
}

const db = await getDbInstance()
const recipes = db.collection<RecipeSchema>('recipes')
const controller = {
  async recipes (): Promise<RecipeSchema[] | undefined> {
    const recipeList = await recipes.find().toArray()
    return recipeList
  },

  async recipe (ctx: { id: string }): Promise<RecipeSchema | undefined> {
    const recipe = await recipes.findOne({ _id: ctx.id })
    return recipe
  },

  async createRecipe (ctx: { input: Recipe }): Promise<RecipeSchema | undefined> {
    const inserted = await recipes.insertOne({ ...ctx.input })
    const result = await recipes.findOne({ _id: inserted })
    return result
  },

  // updateRecipe (ctx: { id: string, input: Recipe }): Recipe | undefined {
    // const index = store.recipes.findIndex((item) => item.uuid === ctx.id)
    // if (index !== -1) {
    //   store.recipes[index] = {
    //     ...store.recipes[index],
    //     ...ctx.input
    //   }
    //   return store.recipes[index]
    // }
    // return null
  // },

  async deleteRecipe (ctx: { id: string }): Promise<number> {
    const deleteCount = await recipes.deleteOne({ _id: ctx.id })
    return deleteCount
  }
}

export default controller
