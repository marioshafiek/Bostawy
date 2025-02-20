import React, { useEffect } from "react";
//Router
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails } from "../../store/products/actions/actGetProductDetails";
import { addToCart } from "../../store/cart/cartSlice"; 
//Components
import Loader from "../../componentes/shared/Loader";


const ProductDetails = () => {
  const { prefix } = useParams(); 
  const dispatch = useDispatch();
  const { productDetails, loading, error } = useSelector((state) => state.products);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (prefix) {
      dispatch(fetchProductDetails(prefix));
    }
  }, [dispatch, prefix]);

  const containerClasses = "flex flex-col items-center justify-center min-h-[450px]";

  if (loading === "loading") return <div className={containerClasses}><Loader /></div>;
  if (error) return <div className={containerClasses}>Error: {error}</div>;
  if (!productDetails) return <div className={containerClasses}>No product found.</div>;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addToCart(productDetails.id));
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Link to='/shop'>
      <div className="pb-10">
        <button
          type="submit"
          className="flex items-center gap-3 px-6 py-2 bg-[#e30715] cursor-pointer text-white font-semibold rounded hover:bg-[#80cad1] transition-colors duration-300"
        >
          <img width="20" height="20" src="https://img.icons8.com/ios-filled/50/back.png" alt="back"  className="w-5 h-5 filter brightness-0 invert"/>
          <div>Back To Shop</div>
        </button>
      </div>
      </Link>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left: Product Image */}
        <div className="md:w-1/2 max-w-[450px] flex border border-gray-200 p-4 rounded">
          <img
            src={productDetails.image}
            alt={productDetails.title}
            className="w-full object-contain max-w-[400px] max-h-[350px] mx-auto"
          />
        </div>

        {/* Right: Product Info */}
        <div className="md:w-1/2 flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-gray-800">{productDetails.title}</h1>
          <div>
            <span className="inline-block bg-[#80cad1] text-white text-xs font-semibold px-2 py-1 rounded">
              {productDetails.category}
            </span>
          </div>
          <p className="text-gray-600">{productDetails.description}</p>

          {/* Add to Cart Form */}
          {isLoggedIn&&
              <button
                onClick={handleSubmit}
                type="submit"
                className="px-6 py-2 bg-[#e30715] cursor-pointer text-white font-semibold rounded hover:bg-[#80cad1] transition-colors duration-300"
              >
                Add to Cart
              </button>
          } 
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
