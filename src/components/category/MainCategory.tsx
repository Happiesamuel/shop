"use client";
import React, { useState } from "react";
import useGetCategory from "../hooks/useGetCategory";
import Product from "../layout/Product";
import ProductLoader from "../loaders/ProductLoader";

export default function MainCategory() {
  const { category, status } = useGetCategory();
  const [active, setActive] = useState<number | null>(null);
  if (status === "pending")
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 w-full gap-y-6 gap-4 place-items-center pt-2 pb-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <ProductLoader key={i + 1} />
        ))}
      </div>
    );

  return (
    <div className="py-1 lg:py-6">
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 w-full gap-y-6 gap-4 place-items-center pt-2 pb-4">
        {category.products.map((product: Product) => (
          <Product
            product={product}
            key={product.id}
            active={active}
            setActive={setActive}
          />
        ))}
      </div>
    </div>
  );
}
