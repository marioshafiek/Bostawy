import React from "react";

const HeaderFilter = ({ categories, selectedCategory, onCategoryChange, onSortChange }) => {
  return (
    <div className="w-full bg-gray-100 p-4 rounded mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      {/* Category Filter */}
      <div className="flex items-center gap-2">
        <label className="text-gray-700 font-medium">Category:</label>
        <div className="relative w-48">
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="block w-full appearance-none  bg-white border border-gray-300 text-gray-700 py-2.5 px-4 pr-8 rounded-lg shadow-sm leading-tight focus:outline-none focus:ring-1 focus:ring-[#e30715] transition duration-450 ease-in-out"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Sort Buttons */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => onSortChange("asc")}
          className="px-4 py-2 border rounded-lg hover:bg-[#e30715] hover:text-white transition duration-250 ease-in-out"
        >
          Price Low → High
        </button>
        <button
          onClick={() => onSortChange("desc")}
          className="px-4 py-2 border rounded-lg hover:bg-[#e30715] hover:text-white transition duration-250 ease-in-out"
        >
          Price High → Low
        </button>
      </div>
    </div>
  );
};

export default HeaderFilter;
