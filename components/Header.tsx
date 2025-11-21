import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 text-white py-4 px-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold">E-Commerce</h1>
      <nav>
        <ul className="flex space-x-6">
          <li><Link href="/" className="font-bold">Home</Link></li>
          <li><Link href="/shop" className="font-bold">Shop</Link></li>
          <li><Link href="/contact" className="font-bold">Contact</Link></li>
          <li><Link href="/product" className="font-bold">Products</Link></li>
          <li><Link href="/login" className="font-bold">Login</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;