import React from 'react';
import { Link } from 'react-router-dom';
import Logo from "../assets/svg/BostawyLogo.svg?react";

const Home = () => {
  return (
    <div className="relative flex flex-col justify-center items-center min-h-[600px] md:min-h-[550px]">
      {/* Background logo */}
      <div className="absolute inset-0 flex justify-center items-center opacity-4">
        <Logo className="w-2/3 h-2/3" />
      </div>

      <div className="z-10 flex flex-col gap-5 justify-center items-center">
        <Link
          to="/shop"
          className="px-10 py-3 border border-[#e30715] text-xl text-black rounded hover:bg-[#e30715] hover:text-white transition"
        >
          Start
        </Link>
        <div className="font-bold">Bosta Task 2025</div>
      </div>
    </div>
  );
};

export default Home;
