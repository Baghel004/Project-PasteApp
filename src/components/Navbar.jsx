import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='bg-[#1a1a1a] flex flex-row gap-[200px] font text-2xl mt-8  border justify-evenly rounded-md p-3 max-w-[600px] min-w-[400px]'>
      <NavLink to='/'>Home</NavLink>
      <NavLink to='/pastes'>Pastes</NavLink>
    </div>
  )
}

export default Navbar
