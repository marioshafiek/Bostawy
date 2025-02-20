import React from "react";

const CartTotalPrice = ({ products }) => {
  const totalPrice = products.reduce((total, product) => {
    const price = product.price || 0;
    const quantity = product.quantity || 0;
    return total + price * quantity;
  }, 0);

  return (
    <div className="flex justify-between items-center p-[15px] bg-[#f8f9fa] rounded-[10px] shadow-[0_4px_10px_rgba(0,0,0,0.1)] mt-5 font-semibold">
      <div className="text-[1.1rem] text-[#333] font-cairo">
        Total Price:
      </div>
      <div className="text-[1.3rem] text-[#28a745] font-cairo">
        ${totalPrice.toFixed(2)}
      </div>
    </div>
  );
};

export default CartTotalPrice;
