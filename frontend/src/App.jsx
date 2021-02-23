import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import RecipesView from './views/RecipesView'
import RecipeShowView from './views/RecipeShowView'
import RecipeEditView from './views/RecipeEditView'

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <RecipesView />
          </Route>
          <Route path="/show/:id">
            <RecipeShowView />
          </Route>
          <Route path="/edit/:id">
            <RecipeEditView />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
