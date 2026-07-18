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
  }, [router]);

  function logout() {
    localStorage.removeItem("token");
    window.location.href = "/Ui-components/Pages/Login";
  }

  return (
    <div className="min-h-screen bg-[#f6f2ea] p-6 lg:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-(--second) to-[#9f082b] text-white rounded-3xl p-8 mb-8 flex flex-col lg:flex-row justify-between gap-6 shadow-[0_15px_40px_rgba(0,0,0,0.2)]">
          <div>
            <p className="text-sm text-[#f8d8e2] mb-2 tracking-[0.2em] uppercase">
              Welcome back admin
            </p>

            <h1 className="text-4xl md:text-5xl GolosText font-bold">
              Admin Dashboard
            </h1>

            <p className="text-[#f8d8e2] mt-3 Lufga">
              Manage products, orders, and store content with clear quick actions.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 h-fit">
            <button
              onClick={() => router.push("/")}
              className="border border-white/60 hover:bg-white hover:text-black text-white px-6 py-3 rounded-xl transition-all cursor-pointer"
            >
              Visit Store
            </button>

            <button
              onClick={logout}
              className="bg-black/70 hover:bg-black text-white px-6 py-3 rounded-xl h-fit transition-all cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-black/10 hover:shadow-md transition-all">
            <p className="text-gray-500 text-sm uppercase tracking-wider">Products</p>
            <h2 className="text-3xl font-bold mt-2 GolosText">Catalog</h2>
            <p className="text-gray-500 mt-1 Lufga">Add, edit, and organize store items</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-black/10 hover:shadow-md transition-all">
            <p className="text-gray-500 text-sm uppercase tracking-wider">Orders</p>
            <h2 className="text-3xl font-bold mt-2 GolosText">Fulfillment</h2>
            <p className="text-gray-500 mt-1 Lufga">Track and manage customer orders</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-black/10 hover:shadow-md transition-all">
            <p className="text-gray-500 text-sm uppercase tracking-wider">Workflow</p>
            <h2 className="text-3xl font-bold mt-2 GolosText">Admin Tools</h2>
            <p className="text-gray-500 mt-1 Lufga">Use quick actions for daily operations</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/admin/add-product"
            className="group bg-white rounded-3xl p-8 shadow-sm border border-black/10 hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            <div className="w-14 h-14 bg-(--second) text-white rounded-2xl flex items-center justify-center text-2xl mb-6">
              <i className="bi bi-plus-lg"></i>
            </div>

            <h3 className="text-2xl font-bold mb-2 GolosText group-hover:text-(--second) transition-colors">
              Add Product
            </h3>

            <p className="text-gray-500 Lufga">
              Create new products and publish them to the store.
            </p>
          </Link>

          <Link
            href="/admin/products"
            className="group bg-white rounded-3xl p-8 shadow-sm border border-black/10 hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            <div className="w-14 h-14 bg-(--second) text-white rounded-2xl flex items-center justify-center text-2xl mb-6">
              <i className="bi bi-bag-check"></i>
            </div>

            <h3 className="text-2xl font-bold mb-2 GolosText group-hover:text-(--second) transition-colors">
              View Products
            </h3>

            <p className="text-gray-500 Lufga">
              Edit prices, stock, images, and product details.
            </p>
          </Link>

          <Link
            href="/admin/orders"
            className="group bg-white rounded-3xl p-8 shadow-sm border border-black/10 hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            <div className="w-14 h-14 bg-(--second) text-white rounded-2xl flex items-center justify-center text-2xl mb-6">
              <i className="bi bi-box-seam"></i>
            </div>

            <h3 className="text-2xl font-bold mb-2 GolosText group-hover:text-(--second) transition-colors">
              Orders
            </h3>

            <p className="text-gray-500 Lufga">
              View customer orders and update order status.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
