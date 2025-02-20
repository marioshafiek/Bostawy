import React, { useEffect, useState } from "react";
import axios from "axios";
//Components
import CreateProductForm from "../../componentes/forms/ProductForm";
import Loader from "../../componentes/shared/Loader";

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [errorCategories, setErrorCategories] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const response = await axios.get("https://fakestoreapi.com/products/categories");
        setCategories(response.data);
      } catch (error) {
        setErrorCategories("Error fetching categories");
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  if (loadingCategories) {
    return (
      <div className="flex items-center justify-center min-h-[550px]">
        <Loader />
      </div>
    );
  }

  if (errorCategories) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-600">
        {errorCategories}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Create New Product</h1>
      <CreateProductForm categories={categories} />
    </div>
  );
};

export default AddProduct;
