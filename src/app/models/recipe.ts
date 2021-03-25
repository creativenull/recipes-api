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
  title: string
  quickSummary: string
  author: Author
  images: Image[]
  ingredients: Ingredient[]
  steps: Step[]
  notes: string
}
