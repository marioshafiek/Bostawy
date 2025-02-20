//React
import React from 'react'
import { NavLink } from 'react-router-dom';
//Components
import AddButton from './AddButton/AddButton';
//Redux
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from '../../../store/cart/cartSlice';

const ProductCard = ({product, actionTitle}) => {

    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    const handleAddToCart = () => {
        dispatch(addToCart(product.id));
      };

    const trimDescription = (desc) => {
        return desc.slice(0, 50)+'...';
    };
    const trimTitle = (title) => {
        return title.slice(0, 25)+'...';
    };

  return (

    <div className="flex flex-col justify-between w-[300px] rounded-[10px] overflow-hidden bg-white shadow-[0_8px_16px_rgba(0,0,0,0.1)] transition-all duration-300 ease-in-out hover:-translate-y-[10px] hover:shadow-[0_12px_24px_rgba(0,0,0,0.2)]">
        <NavLink to={`/productDetails/${product.id}`}>
        <div className="relative w-full h-[200px] bg-[#fafafa] flex justify-center items-center">
            <div className="absolute inset-0 bg-[#fafafa] z-[1]" />
                <img
                src={product.image}
                alt={product.title}
                className="relative z-[2] bg-[#fafafa] max-w-[90%] max-h-[90%] object-contain rounded-[10%]"
                />
        </div>
        </NavLink>

        <div className="flex justify-between items-center p-4 bg-white text-left text-[0.9rem] font-bold text-[#667085]">
            {product.category}
            <div
                className="bg-transparent border-0 cursor-pointer text-[1.2rem] text-[#1dd070] transition-colors duration-300 ease-in-out hover:text-[#13153a]"
                
            >
                {isLoggedIn && <AddButton onClick={handleAddToCart}/>}
            </div>
        </div>

        <hr className="border-t border-t-[#ddd]" />

        <div className="p-4 text-left flex-grow">
            <h2 className="text-md font-bold text-[#11161a] pb-2">{trimTitle(product.title)}</h2>
            <p className="text-sm text-[#667085]">{trimDescription(product.description)}</p>
        </div>
        <NavLink to={`/productDetails/${product.id}`}>
        <div className="flex justify-between items-center p-4 bg-white text-left">
            <span className="text-xl font-bold text-[#11161a]">${product.price}</span>
            <div
                href="#"
                className="relative no-underline text-[#11161a] font-bold transition-colors duration-300 ease-in-out hover:text-[#e30715]"
            >
                {actionTitle}
            </div>
        </div>
        </NavLink>
    </div>
  )
}

export default ProductCard