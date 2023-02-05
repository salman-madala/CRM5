import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <div>PageNotFound please go to home 
      <Link to="/home">
      <button>Home</button>
      </Link>
     
    </div>
  )
}

export default PageNotFound