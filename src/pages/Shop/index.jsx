import React, { useEffect, useState } from "react";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../store/products/actions/actGetProducts";
import { setCategoryFilter, setSortOrder } from "../../store/products/productsSlice";
// Components
import ProductCard from "./ProductdCard";
import HeaderFilter from "../../componentes/shared/HeaderFilter";
import Loader from "../../componentes/shared/Loader";

const PRODUCTS_LIMIT = 8;

const Shop = () => {
  const dispatch = useDispatch();
  const { products, loading, error, categories, selectedCategory, sortOrder } =
  useSelector((state) => state.products);

  // Local pagination state
  const [currentPage, setCurrentPage] = useState(0);

  // Calculate total pages from full product list
  const totalPages = Math.ceil(products.length / PRODUCTS_LIMIT);

  // which products to display on the current page
  const paginatedProducts = products.slice(
    currentPage * PRODUCTS_LIMIT,
    currentPage * PRODUCTS_LIMIT + PRODUCTS_LIMIT
  );

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchAllProducts({ selectedCategory, sortOrder }));
    }
  }, [dispatch, selectedCategory, sortOrder, products.length]);

  const handlePageChange = (page) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  };

  const handleCategoryChange = (category) => {
    if(categories === selectedCategory)
    {
      return;
    }
    dispatch(setCategoryFilter(category));
    setCurrentPage(0);
    dispatch(fetchAllProducts({ selectedCategory: category, sortOrder }));
  };

  const handleSortChange = (order) => {
    if(order === sortOrder)
    {
      return;
    }
    dispatch(setSortOrder(order));
    dispatch(fetchAllProducts({ selectedCategory, sortOrder: order }));
  };

  const containerClasses = "flex flex-col items-center justify-center min-h-[450px]";

  if (loading === "loading") return <div className={containerClasses}><Loader /></div>;
  if (error) return <div className={containerClasses}>Error: {error}</div>;
  if (products.length === 0)
    return <div className={containerClasses}>No products available.</div>;

  return (
    <div className="px-[20px] flex flex-col items-center">
      <HeaderFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        onSortChange={handleSortChange}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-[30px] justify-items-center">
        {paginatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} actionTitle={"View Details"} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-center mt-8 gap-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0 || loading === "loading"}
          className="px-4 py-2 border rounded disabled:opacity-50 hover:bg-[#e30715] hover:text-white"
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index)}
            className={`px-4 py-2 border rounded ${
              index === currentPage
                ? "bg-[#e30715] text-white"
                : "bg-white text-[#e30715]"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages - 1 || loading === "loading"}
          className="px-4 py-2 border rounded disabled:opacity-50 hover:bg-[#e30715] hover:text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Shop;
