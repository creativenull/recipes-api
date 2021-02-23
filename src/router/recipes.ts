import { Router } from 'opine'
import RecipeController from '../app/controllers/recipe.ts'

export const recipeRoutes = Router({
  caseSensitive: true
})
  // Recipes CRUD
  .get('/recipes', RecipeController.index)
  .post('/recipes', RecipeController.create)
  .get('/recipes/:id', RecipeController.read)
  .put('/recipes/:id', RecipeController.update)
  .delete('/recipes/:id', RecipeController.delete)

  // Fallback 404
  .all('*', async (_, res) => {
    res.setStatus(404)
    res.json({ status: 'error', message: 'Not Found' })
  })
