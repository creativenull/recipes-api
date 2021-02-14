import { json, opine, urlencoded } from 'opine'
import { nanoid } from 'nanoid'

const app = opine()

interface Recipe {
  id: string
  title: string
  ingredients: string[]
  steps: string[]
}

const idSize = 5
const recipes: Recipe[] = [
  {
    id: nanoid(idSize),
    title: 'Pizza',
    ingredients: ['pizza sauce', 'bread', 'tomatoes', 'chicken'],
    steps: ['Put pizza sauce on bread', 'Put tomatoes on bread', 'Put chicken on bread', 'Put bread in oven']
  },
  {
    id: nanoid(idSize),
    title: 'Pizza 2',
    ingredients: ['pizza sauce', 'bread', 'tomatoes', 'chicken'],
    steps: ['Put pizza sauce on bread', 'Put tomatoes on bread', 'Put chicken on bread', 'Put bread in oven']
  },
  {
    id: nanoid(idSize),
    title: 'Pizza 3',
    ingredients: ['pizza sauce', 'bread', 'tomatoes', 'chicken'],
    steps: ['Put pizza sauce on bread', 'Put tomatoes on bread', 'Put chicken on bread', 'Put bread in oven']
  }
]

app.use(json())
app.use(urlencoded())

app.get('/', (_, res) => {
  res.send('Hello World')
})

app.get('/recipes', (_, res) => {
  res.json(recipes)
})

app.post('/recipes', (req, res) => {
  if (!(req.body.title && req.body.ingredients && req.body.steps)) {
    res.setStatus(400)
    res.json({
      error: 'missing one of input fields: title, ingredients, steps'
    })
  }

  const newRecipe = {
    id: nanoid(idSize),
    ...req.body
  }
  recipes.push(newRecipe)

  res.json(newRecipe)
})

app.get('/recipes/:id', (req, res) => {
  const id = req.params.id
  const findQuery = recipes.filter((item) => item.id === id)

  if (findQuery.length === 0) {
    res.setStatus(404)
    res.json()
  }

  const recipe = findQuery[0]

  res.json(recipe)
})

app.put('/recipes/:id', (req, res) => {
  if (!(req.body.title || req.body.ingredients || req.body.steps)) {
    res.setStatus(400)
    res.json({
      error: 'missing one of input fields: title, ingredients, steps'
    })
  }

  const id = req.params.id
  const ind = recipes.findIndex((item) => item.id === id)
  if (ind === -1) {
    res.setStatus(404)
    res.json({ error: 'Not found' })
  }

  recipes[ind] = {
    ...recipes[ind],
    ...req.body
  }

  res.json(recipes[ind])
})

app.listen(8080)
