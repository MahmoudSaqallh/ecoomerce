"use client";

import Link from "next/link";

export default function AdminPage() {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  if (!token) {
    return (
      <div className="p-10">
        <h1 className="text-2xl font-bold">Unauthorized</h1>
        <Link href="/Ui-components/Pages/Login">Go to Login</Link>
      </div>
    );
  }

  function logout() {
    localStorage.removeItem("token");
    window.location.href = "/Ui-components/Pages/Login";
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="flex gap-4 flex-wrap">
        <Link href="/admin/add-product" className="bg-black text-white px-4 py-2 rounded">
          Add Product
        </Link>

        <Link href="/admin/products" className="bg-black text-white px-4 py-2 rounded">
          View Products
        </Link>

        <Link href="/admin/orders" className="bg-black text-white px-4 py-2 rounded">
          Orders
        </Link>

        <button onClick={logout} className="bg-red-600 text-white px-4 py-2 rounded">
          Logout
        </button>
      </div>
    </div>
  );
}