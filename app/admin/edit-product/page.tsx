"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function EditProductPage() {
  const router = useRouter();

  const [products, setProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });

  async function fetchProducts() {
    try {
      const response = await fetch("http://localhost:3001/api/items");
      const data = await response.json();

      setProducts(data.items || []);
    } catch (error) {
      toast.error("Failed to load products");
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  function handleSelectProduct(product: any) {
    setSelectedProduct(product);

    setForm({
      name: product.name || "",
      description: product.description || "",
      price: String(product.price || ""),
      stock: String(product.stock || ""),
    });
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login as admin first");
      return;
    }

    if (!selectedProduct) {
      toast.error("Please select a product first");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3001/api/items/${selectedProduct.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: form.name,
            description: form.description,
            price: Number(form.price),
            stock: Number(form.stock),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Update Failed");
      }

      toast.success("Product Updated Successfully");

      setSelectedProduct(null);

      setForm({
        name: "",
        description: "",
        price: "",
        stock: "",
      });

      fetchProducts();
    } catch (error: any) {
      toast.error(error.message || "Failed to update product");
    }
  }

  return (
    <div className="min-h-screen bg-[#f6f2ea] p-8">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-3xl border border-black">
        <h1 className="text-3xl font-bold mb-6">
          Edit Product
        </h1>

        <h2 className="text-xl font-bold mb-4">
          Select Product
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {products.map((product) => (
            <button
              key={product.id}
              type="button"
              onClick={() =>
                handleSelectProduct(product)
              }
              className={`border border-black rounded-2xl p-4 text-left cursor-pointer ${
                selectedProduct?.id ===
                product.id
                  ? "bg-black text-white"
                  : "bg-white text-black"
              }`}
            >
              {product.imageUrl && (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-xl mb-3"
                />
              )}

              <h3 className="font-bold">
                {product.name}
              </h3>

              <p>{product.description}</p>

              <p className="font-bold mt-2">
                ${product.price}
              </p>

              <p>
                Stock: {product.stock}
              </p>
            </button>
          ))}
        </div>

        <form
          onSubmit={handleUpdate}
          className="space-y-5"
        >
          <input
            placeholder="Product Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            className="w-full px-4 py-3 border border-black rounded-xl"
          />

          <input
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description:
                  e.target.value,
              })
            }
            className="w-full px-4 py-3 border border-black rounded-xl"
          />

          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) =>
              setForm({
                ...form,
                price: e.target.value,
              })
            }
            className="w-full px-4 py-3 border border-black rounded-xl"
          />

          <input
            type="number"
            placeholder="Stock"
            value={form.stock}
            onChange={(e) =>
              setForm({
                ...form,
                stock: e.target.value,
              })
            }
            className="w-full px-4 py-3 border border-black rounded-xl"
          />

          <button
            type="submit"
            className="bg-black text-white px-6 py-3 rounded-xl w-full cursor-pointer"
          >
            Update Product
          </button>

          <button
            type="button"
            onClick={() =>
              router.push("/admin")
            }
            className="bg-gray-700 text-white px-6 py-3 rounded-xl w-full cursor-pointer"
          >
            Back To Admin Panel
          </button>
        </form>
      </div>
    </div>
  );
}