import React from 'react'
import Logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='bg-gray-800 p-4 mx-auto'>
        <div className='flex justify-center items-center p-5'>
          <div className='w-1/3 text-white border-r-2 justify-center flex flex-col items-center'>
            <span className=' flex flex-row items-center px-4 py-1'>
              <img className='w-10 h-10' src={Logo} alt="Task Manager App Logo" />
              <h2 className='text-lg font-semibold  text-white'>Task Manager App</h2>
            </span>
              <p className='text-white italic text-sm'>" Collaboration and Management Made easy "</p>
              <br/>
              <br/>
          </div>
          <div className='w-1/3 border-r-2 '>
            <ul className='px-4 '>
               <li className='py-1'>
              <Link to={"/"} className='text-white hover:text-gray-400'>Home</Link>
              </li>
              <li className='py-1'>
                <Link to={"/about"} className='text-white hover:text-gray-400'>About</Link>
              </li>
              <li className='py-1'>
                <Link to={"/contact"} className='text-white hover:text-gray-400'>Contact</Link>
              </li>
              <li className='py-1'>
                <Link to={"/explore"} className='text-white hover:text-gray-400'>Explore</Link>
              </li>
            </ul>
          </div>
          <div className='w-1/3 text-white text-md'>
            <p className='px-4'>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi maxime sunt, magnam laboriosam atque incidunt similique tempore facere quibusdam cum ipsum? Magnam rem ut ullam aut deserunt quod, fugiat dolorum.
            </p>
          </div>
        </div>
        <p className='text-center text-white'> </p>
    </footer>
  )
}

export default Footer