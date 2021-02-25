import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

function RecipeEditView() {
  const { id } = useParams()
  const [recipe, setRecipe] = useState({})

  useEffect(() => {
    fetch(`http://localhost:8080/api/recipes/${id}`)
      .then(res => res.json())
      .then(res => setRecipe(res))
      .catch(e => console.log(e))
  }, [])

  const onChangeInput = (e, target) => {
    setRecipe(prevState => ({
      ...prevState,
      [target]: e.target.value
    }))
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()
    fetch(`http://localhost:8080/api/recipes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(recipe),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(e => console.log(e))
  }

  return (
    <div style={{ height: '100vh', width: '50%', margin: '0 auto' }} className="block py-6">
      {recipe &&
        <div className="card">
          <div className="card-content">
            <form onSubmit={onSubmitHandler}>
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input
                      className="input"
                      type="text"
                      placeholder="Enter a name"
                      value={recipe.name ?? ''}
                      onChange={(e) => onChangeInput(e, 'name')}
                    />
                </div>
              </div>

              <div className="field">
                <label className="label">Ingredients</label>
                <div className="control">
                  <textarea
                    className="textarea"
                    value={recipe.ingredients ?? ''}
                    onChange={(e) => onChangeInput(e, 'ingredients')}
                  >
                  </textarea>
                </div>
              </div>

              <div className="field">
                <label className="label">Steps</label>
                <div className="control">
                  <textarea
                    className="textarea"
                    value={recipe.steps ?? ''}
                    onChange={(e) => onChangeInput(e, 'steps')}
                  >
                  </textarea>
                </div>
              </div>

              <div>
                <Link className="button mr-4" to={'/'}>Cancel</Link>
                <button className="button is-success" type="submit">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      }
    </div>
  )
}

export default RecipeEditView
