import React from "react"; 
import Button from "../components/Button"; 
import Wrapper from "../components/Wrapper"; 
import ProductFilter from "@/components/ProductFilter"; 
//import ProductList from "./product/ProductList";

export default function Page() {
  return (
    <div
      className="h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: "url('/10631434.jpg')" }}
    >
      <div className="min-h-screen bg-white/40 flex flex-col items-center justify-start py-10">
        <h1 className="text-4xl font-bold text-black mb-8">
          Welcome to E-Commerce
        </h1>

        <Wrapper title="Reusable Components Demo" className="text-center w-96">
          <p className="text-gray-700 text-center">Click the button below:</p>
          <div className="flex justify-center p-1.5">
            <Button name="Click Me" />
          </div>
        </Wrapper>

        <ProductFilter />
      </div>
    </div>
  );
}
