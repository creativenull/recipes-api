import React, { useEffect, useState } from 'react'
import { useParams, useHistory, Link } from 'react-router-dom'

function RecipeEditView() {
  const { id } = useParams()
  const routeHistory = useHistory()
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

  const onClickDeleteHandler = (e) => {
    e.preventDefault()
    const confirmed = window.confirm('Are you sure, you want to delete?')
    if (confirmed) {
      fetch(`http://localhost:8080/api/recipes/${id}`, {
        method: 'DELETE'
      })
        .then(res => {
          if (res.status === 200) {
            routeHistory.push('/')
          }
        })
        .catch(e => console.log(e))
    }
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()
    fetch(`http://localhost:8080/api/recipes/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        name: recipe.name,
        ingredients: recipe.ingredients,
        steps: recipe.steps
      })
    })
      .then(res => {
        if (res.status === 200) {
          routeHistory.push(`/show/${id}`)
        }
      })
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

              <div className="columns">
                <div className="column is-half">
                  <Link className="button mr-4" to={'/'}>Back</Link>
                  <button className="button is-success" type="submit">Save Changes</button>
                </div>
                <div className="column is-half is-flex is-justify-content-flex-end">
                  <button className="button is-danger" onClick={onClickDeleteHandler}>Delete</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      }
    </div>
  )
}

export default RecipeEditView
