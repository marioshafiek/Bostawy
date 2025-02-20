import React from "react";
//Redux
import { useDispatch } from "react-redux";
import { addToCart, removeOneFromCart, deleteFromCart } from "../../../store/cart/cartSlice";

const CartItem = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product.id));
  };

  const handleRemoveOneFromCart = () => {
    dispatch(removeOneFromCart(product.id));
  };

  const handleDeleteFromCart = () => {
    dispatch(deleteFromCart(product.id));
  };

  return (
    <div className="flex items-center p-4 mb-4 bg-white rounded-lg shadow-md transition-transform duration-200 ease-out hover:-translate-y-1 hover:shadow-lg">
      <img
        src={product.image}
        alt={product.title}
        className="w-[70px] h-[70px] object-cover rounded-[8px] mr-4"
      />
      <div className="flex-1 flex flex-col justify-between">
        <h3 className="text-lg font-semibold text-gray-800 m-0">{product.title}</h3>
        <p className="text-base text-gray-500 my-1">${product.price}</p>
        <div className="flex items-center mt-2">
          {/* Decrease Quantity */}
          <button
            onClick={handleRemoveOneFromCart}
            className="w-8 h-8 bg-gray-100 border border-gray-300 rounded-full text-lg font-bold text-gray-800 flex items-center justify-center transition-transform duration-200 hover:bg-gray-200 hover:scale-110"
          >
            -
          </button>
          <span className="mx-2 text-lg text-gray-600">{product.quantity}</span>
          {/* Increase Quantity */}
          <button
            onClick={handleAddToCart}
            className="w-8 h-8 bg-gray-100 border border-gray-300 rounded-full text-lg font-bold text-gray-800 flex items-center justify-center transition-transform duration-200 hover:bg-gray-200 hover:scale-110"
          >
            +
          </button>
        </div>
      </div>
      {/* Delete Button */}
      <button
        onClick={handleDeleteFromCart}
        className="ml-4 text-red-500 text-2xl transition-transform duration-200 hover:text-red-600 hover:scale-110"
      >
        &times;
      </button>
    </div>
  );
};

export default CartItem;
