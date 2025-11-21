
import React from "react";
import NotFound from "../not-found";
import { revalidatePath } from "next/cache";
import AddReviewForm from "./AddReviewForm";
import { cache } from "react";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
  description?: string;
}

interface Review {
  id: string;
  name: string;
  review: string;
  productId: string;
}


interface ProductDetailProps {
  params: { id: string };
}

interface ReviewData{
  name: string;
    review: string;
    id: string;
}



//  Dynamic Metadata for SEO
export async function generateMetadata({ params }: { params: { id: string } }) {
  
  const { id } =  params; 
    const res = await fetch(
    `https://68df5df0898434f4135779c3.mockapi.io/api/users/${id}`
  );

  if (!res.ok) {
    return {
      title: "Product Not Found",
      description: "The requested product does not exist.",
    };
  }
   const product: Product = await res.json();

  return {
    title: `${product.name} | MiHiR Store`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.imageUrl],
      type: "article",
    }
  };
}

async function addReview( formData: ReviewData) {
  "use server";

   const res = await fetch(`http://localhost:3000/api/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
      name: formData.name,
      review: formData.review,
      productId: formData.id
    }),
  });
   
  const data = await res.json();
  console.log("data addede success" ,data);
  
    // console.log(" New Review Submitted:", name, review, productId);
     // Refresh product page after posting
    revalidatePath(`/product/${formData.id}`);

return {message: "review posted successfully"};
  
}


export default async function ProductDetailPage({ params }: ProductDetailProps) {
  
  const { id } =await params;
   //const product = await getProduct(id);

  // Fetches single product data
  const res = await fetch(`https://68df5df0898434f4135779c3.mockapi.io/api/users/${id}`);
  
 const product: Product = await res.json();

  if(!product || product.id !== id) return NotFound();

   const revRes = await fetch(`http://localhost:3000/api/reviews`,
    { cache: "no-store" }
  );

  const reviews: Review[] = await revRes.json();


  

  return (
    <div className="flex flex-col items-center justify-center mt-12 px-4">
      <div className="max-w-3xl w-full bg-white rounded-xl shadow-lg p-6">
        <Image
          src={product.imageUrl}
                 alt={product.name}
                 width={300}
                 height={100}
          className="w-full h-72 object-contain rounded-lg mb-6"
        />
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <p className="text-gray-600 mb-4 capitalize">{product.category}</p>
        <p className="text-green-600 text-xl font-semibold mb-4">${product.price}</p>
         <p className="text-gray-700 leading-relaxed">{product.description }</p>

          <AddReviewForm action={addReview} productId={id}/>


        {/* Reviews List */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-2">Reviews</h2>

          {reviews.length === 0 ? (
            <p className="text-gray-500">No reviews yet.</p>
          ) : (
            <ul className="space-y-3">
              {reviews.map((r, index) => (
                <li key={index} className="border p-3 rounded-md bg-gray-50">
                  <p className="font-semibold">{r.name}</p>
                  <p className="text-gray-700">{r.review}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

         


      </div>
    </div>
  );
}
