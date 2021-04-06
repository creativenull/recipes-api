import { Bson } from 'mongo'
import faker from 'faker'
import { Image, Ingredient, Step } from '../../app/models/recipe.ts'
import { getDbInstance } from '../index.ts'

interface User {
  name: string
  username: string
  email: string
  avatar: string
  aboutMe: string
  recipes: Bson.ObjectID[]
}

interface Recipe {
  title: string
  quickSummary: string
  featuredImg: Image
  images: Image[]
  ingredients: Ingredient[]
  steps: Step[]
  notes: string
  author?: Bson.ObjectID
}

interface RecipeSchema extends Recipe {
  _id: { $oid: string }
}

interface UserSchema extends User {
  _id: { $oid: string }
}

const db = await getDbInstance()
const recipes = db.collection<RecipeSchema>('recipes')
const users = db.collection<UserSchema>('users')

function makeUser (): User {
  return {
    name: faker.name.findName(),
    username: faker.name.firstName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    aboutMe: faker.lorem.words(30),
    recipes: []
  }
}

function makeImages (amount: number = 5): Image[] {
  const images: Image[] = []
  for (let i = 0; i < amount; i++) {
    images.push({ caption: faker.lorem.words(5), src: faker.image.imageUrl() })
  }

  return images
}

function makeIngredients (amount: number = 5): Ingredient[] {
  const ingredients: Ingredient[] = []
  for (let i = 0; i < amount; i++) {
    ingredients.push({
      name: faker.lorem.words(2),
      measurement: { amount: faker.datatype.number(), unit: 'tbsp' },
      notes: faker.lorem.words(5)
    })
  }

  return ingredients
}

function makeSteps (amount: number = 5): Step[] {
  const steps: Step[] = []
  for (let i = 0; i < amount; i++) {
    steps.push({ stepNum: i + 1, description: faker.lorem.words(20) })
  }

  return steps
}

function makeRecipe (): Recipe {
  return {
    title: faker.internet.color(),
    quickSummary: faker.lorem.words(20),
    featuredImg: {
      caption: faker.lorem.words(5),
      src: faker.image.imageUrl()
    },
    images: makeImages(),
    ingredients: makeIngredients(),
    steps: makeSteps(),
    notes: faker.lorem.words(20)
  }
}

async function seed (): Promise<void> {
  const userAmount = 10
  const recipeAmount = 10

  console.log('Starting the seed')

  await users.drop()
  await recipes.drop()

  for (let i = 0; i < userAmount; i++) {
    const userInfo = makeUser()
    const insertedUserId = await users.insertOne(userInfo)

    for (let j = 0; j < recipeAmount; j++) {
      const recipeInfo = makeRecipe()

      // New recipe
      const insertedRecipeId = await recipes.insertOne({
        ...recipeInfo,
        author: new Bson.ObjectId(insertedUserId)
      } as Recipe)

      // Attach recipe to the user
      const user = await users.findOne({ _id: new Bson.ObjectId(insertedUserId) }) as UserSchema
      user.recipes.push(new Bson.ObjectId(insertedRecipeId))
      await users.updateOne({ _id: new Bson.ObjectId(insertedUserId) }, { $set: { ...user } })
    }
  }

  console.log('Done!')
}

await seed()
