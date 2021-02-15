import { Model, DataTypes } from 'denodb'
import db from '../../database/index.ts'

class Recipe extends Model {
  static table = 'recipes'
  static timestamps = true

  static fields = {
    _id: {
      primaryKey: true
    },
    name: DataTypes.STRING,
    ingredients: DataTypes.STRING,
    steps: DataTypes.STRING
  }
}

db.link([Recipe])

export default Recipe
