// Redux
import { useSelector } from "react-redux";
//Images
import Cart from "../../../assets/svg/Cart.svg?react";
//Util
import getCartTotalQuantity from "../../../utils/getCartTotalQuantity";

const HeaderBaskt = ({onClick}) => {
    const cartItems = useSelector((state) => state.cart.items);
    // Calculate total quantity
    const total = getCartTotalQuantity(cartItems);
  return (
   <>
   <div className="relative cursor-pointer" onClick={onClick}>

        <div className="text-[#e30715]">
            <Cart className={"w-9 h-9 fill-current"}/>
        </div>
        <div
            className="
            bg-[#94cad1] h-[21px] w-[18px] rounded-[10px] text-center
            absolute top-[-2px] right-[-5px] text-[12px] pt-[2px]
            "
        >
            {total}
        </div>
    </div>  
   </>
  )
}

export default HeaderBaskt