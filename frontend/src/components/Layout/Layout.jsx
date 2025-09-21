import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import React from 'react'

const Layout = () => {
  return (
    <>
        <Header/>
            <Outlet/>
        <Footer/>
    </>  
  )
}

export default Layout