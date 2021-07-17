export interface Author {
  name: string
  avatar: string
}

export interface Image {
  src: string
  caption: string
}

export interface Measurement {
  amount: number
  unit: string
}

export interface Ingredient {
  measurement: Measurement
  name: string
  notes: string
}

export interface Step {
  stepNum: number
  description: string
}

export interface Recipe {
  title: string
  featuredImg: Image
  quickSummary: string
  author: Author
  images: Image[]
  ingredients: Ingredient[]
  steps: Step[]
  notes: string
}
