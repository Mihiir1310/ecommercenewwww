// import ProductList from "@/components/ProductList";
// import React from "react";

// async function getProducts() {
//   const res = await fetch("https://fakestoreapi.com/products?limit=12", {
//     cache: "no-store", //gets fresh data on every request
//   });

//   if (!res.ok) {
//     throw new Error("Failed to fetch products");
//   }

//   return res.json();
// }

// const page = async () => {
//   const products = await getProducts();
//   return (
  
//   <div className="mt-10 flex flex-col items-center justify-center w-full">
//     <div className="w-full max-w-4xl px-4">
//       <h2 className="text-2xl font-semibold mb-6 text-center"> Product List</h2>

      
//       <ProductList products={products} />
//     </div>
//   </div>
// );
// }

// export default page;

import React from "react";
import ProductList from "@/components/ProductList";
import Link from "next/link";
import Image from "next/image";


interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
}

interface Props{
  searchParams?: { query?: string };

}


export default async function ProductsPage({ searchParams }: Props) {
 const params = await searchParams;
  const query = params?.query || "";

  //  Fetch data from MockAPI 
  const url = query
    ? `https://68df5df0898434f4135779c3.mockapi.io/api/users?search=${query}`
    : `https://68df5df0898434f4135779c3.mockapi.io/api/users`;


const fetchProducts = async () => {
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch initial products");
    return await res.json();
  } catch (err : unknown) {

    const message = err instanceof Error? err.message: "Something went wrong"
    return [message]
  }
};

    const products: Product[] = await fetchProducts();

 const filtered = query 
  ? products.filter(p =>
      p.name?.toLowerCase().includes(query.toLowerCase())
    )
  : products;

      

 // console.log(products)


  return (

    
    <div className="mt-10 flex flex-col items-center justify-center w-full">
      <div className="w-full max-w-4xl px-4">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Product List 
        </h2>

        <ProductList products={products} query={query}  />

         {filtered.length === 0 ? (
          <p className="text-center text-gray-500 mt-4">
            No matching products found.
          </p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {filtered.map((p) => (
              <li
                key={p.id}
                className="border rounded-xl p-4 shadow-md bg-gray-50 hover:shadow-lg"
              >
                <Link href={`/product/${p.id}`}>
                <Image
                 src={p.imageUrl}
                 alt={p.name}
                 width={300}
                 height={100}
                />
                <h3 className="font-semibold text-lg mb-1">{p.name}</h3>
                <p className="text-gray-600">{p.category}</p>
                <p className="text-green-600 font-medium mt-2">${p.price}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
