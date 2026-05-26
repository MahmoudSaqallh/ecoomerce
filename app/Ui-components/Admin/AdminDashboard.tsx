"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {

  const router = useRouter();

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/Ui-components/Pages/Login");
    }

  }, []);

  function logout() {
    localStorage.removeItem("token");
    window.location.href = "/Ui-components/Pages/Login";
  }

  return (
    <div className="min-h-screen bg-[#f6f2ea] p-6 lg:p-10">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="bg-(--second) text-white rounded-3xl p-8 mb-8 flex flex-col lg:flex-row justify-between gap-6">

          <div>
            <p className="text-sm text-gray-300 mb-2">
              Welcome back
            </p>

            <h1 className="text-4xl font-bold">
              Admin Dashboard
            </h1>

            <p className="text-gray-300 mt-3">
              Manage products, orders, and store content.
            </p>
          </div>

          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl h-fit transition-all"
          >
            Logout
          </button>

        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <p className="text-gray-500">
              Products
            </p>

            <h2 className="text-3xl font-bold mt-2">
              Manage
            </h2>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <p className="text-gray-500">
              Orders
            </p>

            <h2 className="text-3xl font-bold mt-2">
              Track
            </h2>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <p className="text-gray-500">
              Categories
            </p>

            <h2 className="text-3xl font-bold mt-2">
              Control
            </h2>
          </div>

        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <Link
            href="/admin/add-product"
            className="group bg-white rounded-3xl p-8 shadow-sm border hover:shadow-xl hover:-translate-y-1 transition-all"
          >

            <div className="w-14 h-14 bg-(--second) text-white rounded-2xl flex items-center justify-center text-2xl mb-6">
              +
            </div>

            <h3 className="text-2xl font-bold mb-2">
              Add Product
            </h3>

            <p className="text-gray-500">
              Create new products and publish them to the store.
            </p>

          </Link>

          <Link
            href="/admin/products"
            className="group bg-white rounded-3xl p-8 shadow-sm border hover:shadow-xl hover:-translate-y-1 transition-all"
          >

            <div className="w-14 h-14 bg-(--second) text-white rounded-2xl flex items-center justify-center text-2xl mb-6">
              🛍️
            </div>

            <h3 className="text-2xl font-bold mb-2">
              View Products
            </h3>

            <p className="text-gray-500">
              Edit prices, stock, images, and product details.
            </p>

          </Link>

          <Link
            href="/admin/orders"
            className="group bg-white rounded-3xl p-8 shadow-sm border hover:shadow-xl hover:-translate-y-1 transition-all"
          >

            <div className="w-14 h-14 bg-(--second) text-white rounded-2xl flex items-center justify-center text-2xl mb-6">
              📦
            </div>

            <h3 className="text-2xl font-bold mb-2">
              Orders
            </h3>

            <p className="text-gray-500">
              View customer orders and update order status.
            </p>

          </Link>

        </div>

      </div>

    </div>
  );
}