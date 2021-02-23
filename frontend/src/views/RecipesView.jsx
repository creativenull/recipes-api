import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function RecipesView() {
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    fetch('http://localhost:8080/api/recipes')
      .then(res => res.json())
      .then(res => setRecipes(res))
      .catch(e => console.log(e))
  }, [])

  return (
    <>
      <h2 className="is-size-2 mb-4">Recipes</h2>
      {recipes.length > 0 && (
        <div className="columns is-multiline">
          {recipes.map((item, i) => 
            <div key={item.uuid} className="column block is-one-quarter">
              <div style={{background: '#10B981'}} className="box has-text-white" key={`recipe${i}`}>
                <div className="block is-size-4">{item.name}</div>
                <div className="block">{item.ingredients}</div>
                <div className="has-text-right">
                  <Link className="button is-warning" to={`/edit/${item.uuid}`}>Edit</Link>
                  <Link className="button is-info is-light ml-2" to={`/show/${item.uuid}`}>Show</Link>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default RecipesView
