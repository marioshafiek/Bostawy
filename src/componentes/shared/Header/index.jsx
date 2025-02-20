import React, { useState } from "react";
//Router
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
// Components
import HeaderBaskt from "../../ecom/HeaderBasket";
import Cart from "../../ecom/Cart"; 
import UserMenu from "../../../componentes/ecom/UserMenu";
//Redux
import { useSelector } from "react-redux";
// Images
import Logo from "../../../assets/svg/BostawyLogo.svg?react";

const Header = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  
  const links = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Add", path: "/add" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const [menuOpen, setMenuOpen] = useState(false);
  // For Cart Drawer
  const [cartOpen, setCartOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  return (
    <>
      <header className="flex justify-between items-center px-10 py-4">
        {/* Logo */}
        <NavLink to="/">
          <Logo className="w-25 h-20 m-0 p-0 text-[#e30715] cursor-pointer" />
        </NavLink>

        {/* Navigation links for desktop */}
        <div className="hidden md:flex gap-10">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `hover:text-[#e30715] ${
                  isActive ? "text-[#e30715] font-semibold" : "text-[#505766]"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Right side: User options */}
        <div className="flex gap-2 items-center justify-center">
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              {/* Mobile menu toggle */}
              <div className="md:hidden">
                <button
                  onClick={toggleMenu}
                  className="text-2xl text-[#505766] focus:outline-none"
                >
                  <img
                    width="30"
                    height="30"
                    src="https://img.icons8.com/ios-glyphs/30/menu--v1.png"
                    alt="menu"
                  />
                </button>
              </div>
              <HeaderBaskt onClick={toggleCart} />
              <UserMenu />
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to='/Auth/signin'>
                <button className="px-4 py-2 border border-[#e30715] text-[#e30715] rounded hover:bg-[#e30715] hover:text-white transition cursor-pointer">
                  Sign In
                </button>
              </Link>
              <Link to='/Auth/signup'>
                <button className="px-4 py-2 bg-[#e30715] text-white rounded hover:bg-[#c20612] transition cursor-pointer">
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* Mobile navigation menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center gap-4 p-4 bg-gray-50">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `hover:text-[#e30715] ${
                  isActive ? "text-[#e30715] font-semibold" : "text-[#505766]"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      )}
      
      {/* Cart Drawer */}
      <Cart isOpen={cartOpen} onClose={toggleCart} />
    </>
  );
};

export default Header;
