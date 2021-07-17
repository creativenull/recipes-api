import { getDbInstance } from '../index.ts'
import { Recipe } from '../../app/models/recipe.ts'

export interface RecipeSchema extends Recipe {
  _id: { $oid: string }
}

const db = await getDbInstance()
export const recipeCollection = db.collection<RecipeSchema>('recipes')
