import React from 'react'
import { useParams } from 'react-router-dom'

function RecipeEditView() {
  const { id } = useParams()
  return (
    <h2>Recipe Edit: {id}</h2>
  )
}

export default RecipeEditView
