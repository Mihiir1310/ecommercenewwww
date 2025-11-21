"use client"
import React, { useState, ChangeEvent } from "react";

const ProductFilter = () => {
  
  const products = [
    { id: 1, name: "Laptop", category: "electronics" },
    { id: 2, name: "Headphones", category: "electronics" },
    { id: 3, name: "T-Shirt", category: "fashion" },
    { id: 4, name: "Shoes", category: "fashion" },
    { id: 5, name: "Novel - Atomic Habits", category: "books" },
    { id: 6, name: "Enola Homes", category: "books"},
  ];

   // Dropdown options in label-value pair
  const categories = [
    { label: "All Categories", value: "" },
    { label: "Electronics", value: "electronics" },
    { label: "Fashion", value: "fashion" },
    { label: "Books", value: "books" },
  ];

   //Single state object for both fields
  const [filters, setFilters] = useState({
    search: "",
    category: "",
  });

  // Single event handler for both input and select
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,          // Keep previous state 
      [name]: value,    // Update only the changed field
    }));
  };

  // to Filter the products
  const filteredProducts = products.filter((product) => {
    const matchSearch = product.name.toLowerCase().includes(filters.search.toLowerCase());

    const matchCategory = filters.category === "" || product.category === filters.category;
    
    return matchSearch && matchCategory;
  });

  return (
    <div className="flex flex-col items-center space-y-4 p-6 border rounded-lg shadow-md w-96 bg-white ">
      <h2 className="text-xl font-semibold">Product Filter</h2>

      
      <input
        type="text"
        name="search"
        placeholder="Search products..."
        value={filters.search}
        onChange={handleChange}
        className="border px-3 py-2 w-full rounded-md"/>

      

      <select
        name="category"
        value={filters.category}
        onChange={handleChange}
        className="border px-3 py-2 w-full rounded-md">

        {categories.map((cat) => (
          <option key={cat.value} value={cat.value}>
            {cat.label}
          </option>
        ))}
      </select>

      

      <div className="mt-4 w-full">
        <h3 className="font-semibold mb-2">Results:</h3>
        {filteredProducts.length > 0 ? (
          <ul className="list-disc pl-5 text-gray-700">
            {filteredProducts.map((p) => (
              <li key={p.id}>
                {p.name} <span className="text-sm text-gray-500">({p.category})</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductFilter;

