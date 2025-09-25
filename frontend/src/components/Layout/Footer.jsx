import React from 'react'
import Logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 md:p-6 mx-auto">
      <div className="flex flex-col md:flex-row justify-center items-center md:items-start p-5 gap-6 md:gap-0">
        
        {/* Logo + App Info */}
        <div className="w-full md:w-1/3 text-white flex flex-col items-center md:items-center text-center md:text-left pb-4 md:pb-0">
          <span className="flex flex-row items-center px-4 py-1">
            <img className="w-10 h-10" src={Logo} alt="Task Manager App Logo" />
            <h2 className="text-lg font-semibold text-white ml-2">Task Manager App</h2>
          </span>
          <p className="text-white italic text-sm">
            "Collaboration and Management Made Easy"
          </p>
        </div>

        {/* Navigation Links */}
        {/* <div className=" hidden md:block w-full md:w-1/3 md:border-r-2 flex justify-center md:justify-start">
          <ul className="px-4 text-center md:text-left">
            <li className="py-1">
              <Link to="/" className="text-white hover:text-gray-400">Home</Link>
            </li>
            <li className="py-1">
              <Link to="/about" className="text-white hover:text-gray-400">About</Link>
            </li>
            <li className="py-1">
              <Link to="/contact" className="text-white hover:text-gray-400">Contact</Link>
            </li>
            <li className="py-1">
              <Link to="/explore" className="text-white hover:text-gray-400">Explore</Link>
            </li>
          </ul>
        </div> */}

        {/* Extra Info */}
        {/* <div className="hidden md:block w-full md:w-1/3 text-white text-md text-center md:text-left px-4">
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi maxime sunt, magnam laboriosam atque incidunt similique tempore facere quibusdam cum ipsum?
          </p>
        </div> */}
      </div>

      <p className="text-center text-white text-sm md:mt-4 pb-4">
        &copy; {new Date().getFullYear()} Task Manager App
      </p>
    </footer>
  )
}

export default Footer
