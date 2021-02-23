import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

function RecipeShowView() {
  const { id } = useParams()
  const [recipe, setRecipe] = useState({})

  useEffect(() => {
    fetch(`http://localhost:8080/api/recipes/${id}`)
      .then(res => res.json())
      .then(res => setRecipe(res))
      .catch(e => console.log(e))
  }, [])

  return (
    <div style={{ height: '100vh', width: '50%', margin: '0 auto' }} className="block py-6">
      {recipe &&
        <div className="card">
          <div className="card-content">
            <h2 className="is-size-2">{recipe.name}</h2>
            <div className="content">
              <div className="block">
                <h5 className="is-size-5">Ingredients</h5>
                <p>{recipe.ingredients}</p>
              </div>
              <div className="block">
                <h5 className="is-size-5">Steps</h5>
                <p>{recipe.steps}</p>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default RecipeShowView
