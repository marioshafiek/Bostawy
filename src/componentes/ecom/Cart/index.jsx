import React, { useState, useEffect } from "react";
//Components
import CartItemList from "./CartItemList";
import CartTotalPrice from "./CartTotalPrice";
// Redux
import actGetProductsById from "../../../store/cart/actions/actGetProductsById";
import { useDispatch, useSelector } from "react-redux";
import {  deleteAllFromCart } from "../../../store/cart/cartSlice";

const Cart = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { items, productFullInfo } = useSelector((state) => state.cart);

  // Handler to clear all items from cart
  const handleDeleteAllFromCart = () => {
    dispatch(deleteAllFromCart());
  };

  // Fetch full product info based on cart items
  useEffect(() => {
    dispatch(actGetProductsById());
  }, [dispatch, items]);

  // Merge product details with quantities from the cart
  const products = productFullInfo.map((el) => ({
    ...el,
    quantity: items[el.id] || 0,
  }));

  // state for drawer visibility
  const [visible, setVisible] = useState(isOpen);
  useEffect(() => {
    setVisible(isOpen);
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      {visible && (
        <div
          className="fixed inset-0 z-40"
          onClick={onClose}
        ></div>
      )}
      {/* Drawer */}
      <div
        className={`fixed top-0 ${
          isOpen ? "right-0" : "-right-full"
        } w-full max-w-[400px] h-full bg-white shadow-md transition-all duration-400 ease-out z-50 rounded-l-lg md:rounded-l-lg lg:max-w-[600px] lg:w-[30%]`}
      >
        <div className="relative h-full p-5 overflow-y-auto">
          {/* Close Button */}
          <button
            className="absolute top-2 right-5 text-2xl bg-transparent border-none cursor-pointer"
            onClick={onClose}
          >
            &times;
          </button>
          {/* Title */}
          <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
          {Object.keys(items).length > 0 ? (
            <>
              <CartItemList products={products} />
              <CartTotalPrice products={products} />
              <button
                onClick={handleDeleteAllFromCart}
                className="bg-red-500 cursor-pointer hover:bg-red-600 text-white font-bold py-2 px-4 rounded w-full mt-5 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Clear Cart
              </button>
            </>
          ) : (
            <div>Empty</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
