import { Bson } from 'mongo'
import { Recipe } from '../models/recipe.ts'
import { userCollection as users, UserSchema } from '../../db/schema/user.ts'
import { recipeCollection as recipes, RecipeSchema } from '../../db/schema/recipe.ts'

function toMongoId (id: any): Bson.ObjectID {
  return new Bson.ObjectId(id)
}

const controller = {
  async recipes (): Promise<RecipeSchema[] | undefined> {
    const recipeList = await recipes.find().toArray()
    return recipeList
  },

  async recipe (ctx: { id: string }): Promise<RecipeSchema | undefined> {
    const recipeResult = await recipes.findOne({ _id: toMongoId(ctx.id) }) as RecipeSchema
    const author = await users.findOne({ _id: toMongoId(recipeResult.author) }) as UserSchema
    return {
      ...recipeResult,
      author: {
        name: author.name,
        avatar: author.avatar
      }
    }
  },

  async createRecipe (ctx: { input: Recipe }): Promise<RecipeSchema | undefined> {
    const inserted = await recipes.insertOne({ ...ctx.input }) as RecipeSchema
    const result = await recipes.findOne({ _id: toMongoId(inserted) }) as RecipeSchema
    return result
  },

  async updateRecipe (ctx: { id: string, input: Recipe }): Promise<RecipeSchema | undefined> {
    const _id = toMongoId(ctx.id)
    let recipe = await recipes.findOne({ _id }) as RecipeSchema
    recipe = { ...recipe, ...ctx.input }
    await recipes.updateOne({ _id }, { $set: { ...recipe } })
    return recipe
  },

  async deleteRecipe (ctx: { id: string }): Promise<number> {
    const deleteCount = await recipes.deleteOne({ _id: toMongoId(ctx.id) })
    return deleteCount
  }
}

export default controller
