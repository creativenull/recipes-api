import { Bson } from 'mongo'
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
    const recipe = await recipes.findOne({ _id: new Bson.ObjectId(ctx.id) })
    return recipe
  },

  async createRecipe (ctx: { input: Recipe }): Promise<RecipeSchema | undefined> {
    const inserted = await recipes.insertOne({ ...ctx.input })
    const result = await recipes.findOne({ _id: new Bson.ObjectId(inserted) })
    return result
  },

  async updateRecipe (ctx: { id: string, input: Recipe }): Promise<RecipeSchema | undefined> {
    const _id = new Bson.ObjectId(ctx.id)
    let recipe = await recipes.findOne({ _id }) as RecipeSchema
    recipe = { ...recipe, ...ctx.input }
    await recipes.updateOne({ _id }, { $set: { ...recipe } })
    return recipe
  },

  async deleteRecipe (ctx: { id: string }): Promise<number> {
    const deleteCount = await recipes.deleteOne({ _id: new Bson.ObjectId(ctx.id) })
    return deleteCount
  }
}

export default controller
