import React from 'react'
//Router
import { Outlet } from "react-router-dom";
import { Link } from 'react-router-dom';
//Components
import Footer from "../../componentes/shared/Footer";
//Images
import Logo from "../../assets/svg/BostawyLogo.svg?react";
const AuthLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#ffffff]  py-4">
        <div className='px-10'>
        <Link to='/'>
            <Logo className="w-25 h-20 m-0 p-0 text-[#e30715] cursor-pointer" />
        </Link>
        </div>
        <main className="flex-1 p-4  md:p-10 md:m-0">
            <Outlet />
        </main>
        <Footer />
    </div>
  )
}

export default AuthLayout