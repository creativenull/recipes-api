import { Router } from 'opine'
import { render } from '../app/render.ts'
import RecipeController from '../app/controllers/recipe.ts'

const router = Router({
  caseSensitive: true
})

router.get('/', async (_, res) =>
  res.send(await render('index', { title: 'Recipes App' }, res))
)

// Recipes CRUD
router.get('/recipes', RecipeController.index)
router.post('/recipes', RecipeController.create)
router.get('/recipes/:id', RecipeController.read)
router.put('/recipes/:id', RecipeController.update)
router.delete('/recipes/:id', RecipeController.delete)

// Fallback 404
router.all('*', async (_, res) =>
  res.send(await render('404', { title: 'Not Found' }, res))
)

export default router
