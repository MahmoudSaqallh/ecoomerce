"use client";

import Link from "next/dist/client/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  stock: number;
  imageUrl: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  async function getProducts() {
    const response = await fetch("http://localhost:3001/api/items");
    const data = await response.json();

    setProducts(data.items);
  }

  async function deleteProduct(id: string) {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:3001/api/items/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete");
      }

      toast.success("Product Deleted");

   
      getProducts();

    } catch (error: any) {

      toast.error(error.message);

    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="min-h-screen bg-[#f6f2ea] p-8">

      <h1 className="text-3xl font-bold mb-6">
        Products
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {products.map((product) => (

          <div
            key={product.id}
            className="bg-white border border-black rounded-2xl p-5"
          >

            <h2 className="text-xl font-bold">
              {product.name}
            </h2>

            <p className="text-gray-500 mt-2">
              {product.description}
            </p>

            <div className="mt-4 space-y-1">
              <p>Price: ${product.price}</p>
              <p>Stock: {product.stock}</p>
              <p>Category: {product.categoryId}</p>
            </div>

            <button
              onClick={() => deleteProduct(product.id)}
              className="mt-5 bg-red-600 hover:bg-red-700 transition-all text-white px-4 py-2 rounded-xl w-full"
            >
              Delete Product
            </button>

<Link
  href={`/admin/edit-product?id=${product.id}`}
  className="mt-3 block text-center bg-black text-white px-4 py-2 rounded-xl w-full"
>
  Edit Product
</Link>
            

          </div>

        ))}

      </div>

    </div>
  );
}