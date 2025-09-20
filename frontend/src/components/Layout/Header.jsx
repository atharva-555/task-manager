import React from 'react'
import Logo from '../../assets/logo.svg';



const Header = () => {
  return (
    <header className="bg-gradient-to-r from-primary-600 to-primary-700 shadow-medium sticky top-0 z-50">
        <div className='max-w-7xl mx-auto flex justify-content-between '>
            <span className='flex flex-row items-center justify-center p-4'>
              <img className='w-10 h-10' src={Logo} alt="Task Manager App Logo" />
              <h1 className='text-2xl font-bold text-white'>Task Manager</h1> 
            </span>
        </div>

    </header>
  )
}

export default Header;