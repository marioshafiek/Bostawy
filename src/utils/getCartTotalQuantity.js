const getCartTotalQuantity = (cartItems) => {
    const totalQuantities = Object.values(cartItems).reduce(
      (total, quantity) => total + quantity,
      0
    );
    return totalQuantities;
  };
  
  export default getCartTotalQuantity;
  