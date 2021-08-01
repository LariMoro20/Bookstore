import React from 'react'
import '../App.css'
import { NavLink } from 'react-router-dom'

export default function Menu() {
  return (
    <>
      <div className="col-md-12 books_menu">

        <nav className='text-center'>
          <NavLink exact to="/" activeClassName="selected">Inicial</NavLink >
        </nav>
      </div>
    </>
  )
}