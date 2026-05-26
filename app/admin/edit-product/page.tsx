"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function EditProductPage() {

  const [form, setForm] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    stock: "",
  });

  async function handleUpdate(e: any) {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {

      const response = await fetch(
        `http://localhost:3001/api/items/${form.id}`,
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

      // تفريغ الفورم
      setForm({
        id: "",
        name: "",
        description: "",
        price: "",
        stock: "",
      });

    } catch (error: any) {

      toast.error(error.message);

    }
  }

  return (
    <div className="min-h-screen bg-[#f6f2ea] p-8">

      <div className="max-w-3xl mx-auto bg-white p-8 rounded-3xl border border-black">

        <h1 className="text-3xl font-bold mb-6">
          Edit Product
        </h1>

        <form onSubmit={handleUpdate} className="space-y-5">

          <input
            placeholder="Product ID"
            value={form.id}
            onChange={(e) =>
              setForm({ ...form, id: e.target.value })
            }
            className="w-full px-4 py-3 border border-black rounded-xl"
          />

          <input
            placeholder="New Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            className="w-full px-4 py-3 border border-black rounded-xl"
          />

          <input
            placeholder="New Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            className="w-full px-4 py-3 border border-black rounded-xl"
          />

          <input
            placeholder="New Price"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: e.target.value })
            }
            className="w-full px-4 py-3 border border-black rounded-xl"
          />

          <input
            placeholder="New Stock"
            value={form.stock}
            onChange={(e) =>
              setForm({ ...form, stock: e.target.value })
            }
            className="w-full px-4 py-3 border border-black rounded-xl"
          />

          <button
            type="submit"
            className="bg-black text-white px-6 py-3 rounded-xl w-full cursor-pointer"
          >
            Update Product
          </button>

        </form>

      </div>

    </div>
  );
}