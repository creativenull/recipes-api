import { Model, DataTypes } from 'denodb'

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

export default Recipe
