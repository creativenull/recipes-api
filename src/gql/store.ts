import uuid from './utils.ts'

interface Author {
  name: string
  avatar: string
}

interface Image {
  src: string
  caption: string
}

interface Measurement {
  amount: number
  unit: string
}

interface Ingredient {
  measurement: Measurement
  name: string
  notes: string
}

interface Step {
  stepNum: number
  description: string
}

export interface Recipe {
  uuid: string
  title: string
  quickSummary: string
  author: Author
  images: Image[]
  ingredients: Ingredient[]
  steps: Step[]
  notes: string
}

export default {
  recipes: [
    {
      uuid: uuid(),
      title: 'Pizza 0',
      quickSummary: 'A quick pizza recipe',
      author: {
        name: 'Some Dude',
        avatar: 'https://picsum.photos/300'
      },
      images: [
        { src: 'https://picsum.photos/300', caption: 'Some Pizza' },
        { src: 'https://picsum.photos/300', caption: 'Some Pizza 1' }
      ],
      ingredients: [
        { measurement: { amount: 1, unit: 'tbsp' }, name: 'Sauce', notes: 'Some sauce' },
        { measurement: { amount: 10, unit: 'tbsp' }, name: 'Dough', notes: 'Dough for sauce' }
      ],
      steps: [
        { stepNum: 1, description: 'Put dough in sauce' },
        { stepNum: 2, description: 'Put sauce in dough' }
      ],
      notes: 'Some notes come here'
    },

    {
      uuid: uuid(),
      title: 'Pizza 123',
      quickSummary: 'A quick pizza recipe',
      author: {
        name: 'John Doe',
        avatar: 'https://picsum.photos/300'
      },
      images: [
        { src: 'https://picsum.photos/300', caption: 'Some Pizza' },
        { src: 'https://picsum.photos/300', caption: 'Some Pizza 1' }
      ],
      ingredients: [
        { measurement: { amount: 1, unit: 'tbsp' }, name: 'Sauce', notes: 'Some sauce' },
        { measurement: { amount: 10, unit: 'tbsp' }, name: 'Dough', notes: 'Dough for sauce' }
      ],
      steps: [
        { stepNum: 1, description: 'Put dough in sauce' },
        { stepNum: 2, description: 'Put sauce in dough' }
      ],
      notes: 'Some notes come here'
    },

    {
      uuid: uuid(),
      title: 'Pasta',
      quickSummary: 'A quick pasta recipe',
      author: {
        name: 'Some Dude 111',
        avatar: 'https://picsum.photos/300'
      },
      images: [
        { src: 'https://picsum.photos/300', caption: 'Some Pasta' },
        { src: 'https://picsum.photos/300', caption: 'Some Pasta 1' }
      ],
      ingredients: [
        { measurement: { amount: 1, unit: 'tbsp' }, name: 'Sauce', notes: 'Some sauce' },
        { measurement: { amount: 20, unit: 'tbsp' }, name: 'Pasta', notes: 'Pasta for sauce' }
      ],
      steps: [
        { stepNum: 1, description: 'Put dough in sauce' },
        { stepNum: 2, description: 'Put sauce in dough' }
      ],
      notes: 'Some notes come here'
    },

    {
      uuid: uuid(),
      title: 'Pizza Supreme',
      quickSummary: 'A quick supreme recipe',
      author: {
        name: 'Some Dude Supreme',
        avatar: 'https://picsum.photos/300'
      },
      images: [
        { src: 'https://picsum.photos/300', caption: 'Some Pizza' },
        { src: 'https://picsum.photos/300', caption: 'Some Pizza 1' }
      ],
      ingredients: [
        { measurement: { amount: 1, unit: 'tbsp' }, name: 'Sauce', notes: 'Some sauce' },
        { measurement: { amount: 10, unit: 'tbsp' }, name: 'Dough', notes: 'Dough for sauce' }
      ],
      steps: [
        { stepNum: 1, description: 'Put dough in sauce' },
        { stepNum: 2, description: 'Put sauce in dough' }
      ],
      notes: 'Some notes come here'
    },

    {
      uuid: uuid(),
      title: 'Flat Bread Pizza',
      quickSummary: 'A quick flat pizza bread recipe',
      author: {
        name: 'Some Dude called Bread',
        avatar: 'https://picsum.photos/300'
      },
      images: [
        { src: 'https://picsum.photos/300', caption: 'Some Pizza' },
        { src: 'https://picsum.photos/300', caption: 'Some Pizza 1' }
      ],
      ingredients: [
        { measurement: { amount: 1, unit: 'tbsp' }, name: 'Sauce', notes: 'Some sauce' },
        { measurement: { amount: 10, unit: 'tbsp' }, name: 'Dough', notes: 'Dough for sauce' }
      ],
      steps: [
        { stepNum: 1, description: 'Put dough in sauce' },
        { stepNum: 2, description: 'Put sauce in dough' }
      ],
      notes: 'Some notes come here'
    }
  ] as Recipe[]
}
