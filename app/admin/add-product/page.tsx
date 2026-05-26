"use client";

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function AddProductPage() {

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "cat-001",
    sizes: "",
    colors: "",
    stock: "",
    imageUrl: "",
  });

  async function handleSubmit(e: React.FormEvent) {

    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {

      toast.error("Please login as admin first");

      window.location.href =
        "/Ui-components/Pages/Login";

      return;
    }

    const productData = {
      name: form.name,
      description: form.description,
      price: Number(form.price),
      categoryId: form.categoryId,
      sizes: form.sizes
        .split(",")
        .map((s) => s.trim()),

      colors: form.colors
        .split(",")
        .map((c) => c.trim()),

      stock: Number(form.stock),

      imageUrl: form.imageUrl,
    };

    try {

      const response = await fetch(
        "http://localhost:3001/api/items",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify(
            productData
          ),
        }
      );

      const data =
        await response.json();

      if (
        response.status === 401 ||
        response.status === 403
      ) {

        localStorage.removeItem(
          "token"
        );

        toast.error(
          "Session expired, login again"
        );

        window.location.href =
          "/Ui-components/Pages/Login";

        return;
      }

      if (!response.ok) {

        throw new Error(
          data.error ||
          "Failed to add product"
        );

      }

      toast.success(
        "Product added successfully"
      );

      setForm({
        name: "",
        description: "",
        price: "",
        categoryId: "cat-001",
        sizes: "",
        colors: "",
        stock: "",
        imageUrl: "",
      });

    } catch (error: any) {

      toast.error(
        error.message
      );

    }
  }

  return (

    <div className="min-h-screen bg-[#f6f2ea] p-8">

      <Toaster position="top-right" />

      <div className="max-w-3xl mx-auto bg-white border border-black rounded-3xl p-8">

        <h1 className="text-3xl font-bold mb-6">
          Add Product
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {[
            ["name","Product Name"],
            ["description","Description"],
            ["price","Price"],
            ["sizes","Sizes مثل: S,M,L"],
            ["colors","Colors مثل: Red,Black"],
            ["stock","Stock"],
          ].map(([key,label]) => (

            <input
              key={key}
              placeholder={label}
              value={(form as any)[key]}
              onChange={(e)=>

                setForm({
                  ...form,
                  [key]:
                  e.target.value,
                })

              }

              className="w-full px-4 py-3 border border-black rounded-xl"
            />

          ))}

          {/* FILE INPUT */}

   <input
  type="file"
  accept="image/*"
  onChange={(e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setForm({
        ...form,
        imageUrl: reader.result as string,
      });
    };

    reader.readAsDataURL(file);
  }}
  className="w-full px-4 py-3 border border-black rounded-xl cursor-pointer"
/>


          <select
            value={form.categoryId}

            onChange={(e)=>

              setForm({
                ...form,
                categoryId:
                e.target.value,
              })

            }

            className="w-full px-4 py-3 border border-black rounded-xl"
          >

            <option value="cat-001">
              Shirts
            </option>

            <option value="cat-002">
              Pants
            </option>

            <option value="cat-003">
              Dresses
            </option>

            <option value="cat-004">
              Jackets
            </option>

            <option value="cat-005">
              Shoes
            </option>

          </select>

          <button
            type="submit"
            className="bg-black text-white px-6 py-3 rounded-xl"
          >
            Add Product
          </button>

        </form>

      </div>

    </div>

  );
}