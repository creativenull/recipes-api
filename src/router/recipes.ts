import { Group } from 'abc'
import RecipeController from '../app/controllers/recipe.ts'

export const recipeRoutesGroup = (group: Group): void => {
  group.prefix = '/api'

  group.get('/recipes', RecipeController.index)
  group.post('/recipes', RecipeController.create)
  group.get('/recipes/:id', RecipeController.read)
  group.put('/recipes/:id', RecipeController.update)
  group.delete('/recipes/:id', RecipeController.delete)
}
