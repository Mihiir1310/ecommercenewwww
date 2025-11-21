// "use client";
// import React, { useRef, useState, useEffect, ChangeEvent, useReducer } from "react";
// //import { useFetch } from "@/hooks/useFetch";
// import { useFilter } from "@/context/FilterContext";

// interface Product {
//   id: number;
//   title: string;
//   price: number;
//   category: string;
//   image: string;
// }

// interface ProductListProps {
//   products: Product[];
// }


// const ProductList: React.FC<ProductListProps> = ({products}) => {
  

//   const { state, dispatch } = useFilter();
//   const inputRef = useRef<HTMLInputElement>(null);

//   // Auto focus on input
//   useEffect(() => {
//     inputRef.current?.focus();
//   }, []);

//   // Handle input change
//   const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
//     dispatch({type:"SET_TEXT", payload: e.target.value});
//   };

//   // Filter products
//     const filteredProducts = products.filter((p) =>
//     p.title.toLowerCase().includes(state.text.toLowerCase())
//   ) || [];

//  //console.log("Products received:", products);

//   return (
//     <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md mt-8">
//       <h2 className="text-2xl font-bold mb-4 text-center">Product Filter</h2>

//      <div className="flex gap-2 mb-4">
//       <input
//         ref={inputRef}
//         type="text"
//         value={state.text}
//         onChange={handleFilterChange}
//         className="border w-full p-2 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />

//        <button
//           onClick={() => dispatch({ type: "CLEAR" })}
//           className="h-full px-5 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
//         >
//           Clear
//         </button>
//       </div>

//       {filteredProducts.length === 0 ? (
//         <p className="text-center text-gray-500">No matching products found.</p>
//       ) : (
//         <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredProducts.map((product) => (
//             <li
//               key={product.id}
//               className="border rounded-xl p-4 shadow-md bg-gray-50 hover:shadow-lg transition"
//             >
//               <img
//                 src={product.image}
//                 alt={product.title}
//                 className="w-full h-32 object-contain mb-3"
//               />
//               <h3 className="font-semibold text-lg mb-1">{product.title}</h3>
//               <p className="text-gray-600">{product.category}</p>
//               <p className="text-green-600 font-medium mt-2">
//                 ${product.price}
//               </p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
  
//   );
// };

// export default ProductList;






"use client";
import React, { useEffect, useState, ChangeEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
}

interface ProductListProps {
  products: Product[];
  
  query:string;
}

const ProductList: React.FC<ProductListProps> =({ products, query }) => {
   const router = useRouter();
  const [search, setSearch] = useState(query);
   const searchParams =useSearchParams();

   console.log("products" , products);

 useEffect(() => {

      const currentQuery =  searchParams.get("query");
      if (search !== currentQuery) {
        // updates the URL, triggers server component re-render
        router.replace(`?query=${search}`);
      }
 

    
  }, [search, router, searchParams]);



  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md">
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          name="query"
          placeholder="Search by name..."
          value={search}
          onChange={handleChange}
          className="border w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      

    </div>
  );
};

export default ProductList;

