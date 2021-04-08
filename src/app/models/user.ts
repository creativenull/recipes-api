import { Recipe } from './recipe.ts'

export interface User {
    name: string
    username: string
    email: string
    avatar: string
    aboutMe: string
    recipes?: Recipe[]
}
