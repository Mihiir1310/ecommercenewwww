"use client";
import React from "react";

interface WrapperProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const Wrapper: React.FC<WrapperProps> = ({ title, children, className = "" }) => {
  return (
    <div className={`border rounded-xl p-6 shadow-md ${className}`}>
      {title && <h2 className="text-xl font-bold mb-3">{title}</h2>}
      {children}
    </div>
  );
};

export default Wrapper;


