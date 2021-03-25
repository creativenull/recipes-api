import store, { Recipe } from '../../gql/store.ts'
import uuid from '../../gql/utils.ts'

const controller = {
  recipes (): Recipe[] {
    return store.recipes
  },

  recipe (ctx: { id: string }): Recipe | null {
    const results = store.recipes.filter((item) => item.uuid === ctx.id)
    return results.length === 0 ? null : results[0]
  },

  createRecipe (ctx: { input: Recipe }): Recipe {
    const recipe: Recipe = { ...ctx.input, uuid: uuid() }
    store.recipes.push(recipe)
    return store.recipes[store.recipes.length - 1]
  },

  updateRecipe (ctx: { id: string, input: Recipe }): Recipe | null {
    const index = store.recipes.findIndex((item) => item.uuid === ctx.id)
    if (index !== -1) {
      store.recipes[index] = {
        ...store.recipes[index],
        ...ctx.input
      }

      return store.recipes[index]
    }

    return null
  },

  deleteRecipe (ctx: { id: string }): boolean {
    const index = store.recipes.findIndex((item) => item.uuid === ctx.id)
    if (index !== -1) {
      store.recipes.splice(index, 1)
      return true
    }

    return false
  }
}

export default controller
