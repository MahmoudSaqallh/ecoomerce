"use client";

import { useEffect, useState } from "react";

type Order = {
  id: string;
  customerName: string;
  email: string;
  totalAmount: number;
  status: string;
};

export default function OrdersPage() {

  const [orders, setOrders] = useState<Order[]>([]);

  async function getOrders() {

    const token = localStorage.getItem("token");

    try {

      const response = await fetch(
        "http://localhost:3001/api/orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      setOrders(data.orders || []);

    } catch (error) {

      console.log(error);

    }
  }

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="min-h-screen bg-[#f6f2ea] p-8">

      <h1 className="text-3xl font-bold mb-6">
        Orders
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {orders.map((order) => (

          <div
            key={order.id}
            className="bg-white border border-black rounded-2xl p-5"
          >

            <h2 className="text-xl font-bold">
              {order.customerName}
            </h2>

            <p className="text-gray-500 mt-2">
              {order.email}
            </p>

            <div className="mt-4 space-y-1">
              <p>Total: ${order.totalAmount}</p>
              <p>Status: {order.status}</p>
            </div>

          </div>

        ))}

      </div>

    </div>
  );
}