//React
import React, { useState, useRef, useEffect } from 'react';

//Images
import User from "../../../assets/svg/User.svg?react";

//Redux 
import { useDispatch, useSelector } from "react-redux";
import {logout} from '../../../store/auth/authSlice'


const UserMenu = () => {

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.auth.user.username);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setMenuOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setMenuOpen((prev) => !prev)}
        className="w-6 h-6 rounded-full bg-[#e30715] flex items-center justify-center cursor-pointer focus:outline-none"
      >
        <User className="w-10 h-10 text-white cursor-pointer" />
      </button>

      {/* Dropdown */}
      {menuOpen && (
        <div className="absolute flex flex-col  gap-2 right-0 mt-2 w-32 bg-white border border-[#e30715] rounded shadow-lg z-10">
          <div className='pl-4 pt-4 font-bold'>
            Hi, {userName}
          </div>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 hover:bg-[#e30715] hover:text-white"
          >
            Logout
          </button>
        </div>
        
      )}
    </div>
  );
};

export default UserMenu;
