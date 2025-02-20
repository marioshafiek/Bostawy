import React from "react";
//Components
import CartItem from "./CartItem";

const CartItemList = ({ products }) => {  
  return (
    <div>
      {products.map((product) => (
        <CartItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default CartItemList;
