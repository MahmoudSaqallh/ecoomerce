"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

type Order = {
  id: string;
  customerName: string;
  email: string;
  totalAmount: number;
  status: string;
};

type StatusFilter =
  | "all"
  | "pending"
  | "processing"
  | "shipped"
  | "delivered";

const ALLOWED_STATUSES = [
  "pending",
  "processing",
  "shipped",
  "delivered",
] as const;

function normalizeStatus(status: string) {
  return String(status || "").toLowerCase().trim();
}

function getStatusLabel(status: string) {
  const s = normalizeStatus(status);
  if (s === "pending") return "Pending";
  if (s === "processing") return "Processing";
  if (s === "shipped") return "Shipped";
  if (s === "delivered") return "Delivered";
  return status;
}

function getStatusPillClasses(status: string) {
  const s = normalizeStatus(status);

  switch (s) {
    case "pending":
      return "bg-[#FEF3C7] border-[#FDE68A] text-[#92400E]";
    case "processing":
      return "bg-[#DBEAFE] border-[#BFDBFE] text-[#1D4ED8]";
    case "shipped":
      return "bg-[#E9D5FF] border-[#D8B4FE] text-[#6D28D9]";
    case "delivered":
      return "bg-[#DCFCE7] border-[#BBF7D0] text-[#15803D]";
    default:
      return "bg-white border-black/10 text-black";
  }
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<StatusFilter>("all");
  const [draftStatuses, setDraftStatuses] = useState<Record<string, string>>(
    {}
  );
  const [updatingIds, setUpdatingIds] = useState<Record<string, boolean>>(
    {}
  );

  async function getOrders() {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:3001/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      const nextOrders: Order[] = data.orders || [];

      setOrders(nextOrders);

      setDraftStatuses((prev) => {
        const next = { ...prev };
        for (const o of nextOrders) {
          next[o.id] = normalizeStatus(o.status);
        }
        return next;
      });
    } catch (error) {
      toast.error("Failed to load orders");
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }

  async function updateOrderStatus(orderId: string, nextStatus: string) {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login as admin first");
      return;
    }

    setUpdatingIds((prev) => ({ ...prev, [orderId]: true }));

    const body = JSON.stringify({ status: nextStatus });
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    try {
      // Backend might support PATCH or PUT; we try PATCH first, then fallback.
      const patchResponse = await fetch(
        `http://localhost:3001/api/orders/${orderId}`,
        {
          method: "PATCH",
          headers,
          body,
        }
      );

      let response = patchResponse;

      if (!patchResponse.ok) {
        response = await fetch(
          `http://localhost:3001/api/orders/${orderId}`,
          {
            method: "PUT",
            headers,
            body,
          }
        );
      }

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          data?.error || data?.message || "Failed to update status"
        );
      }

      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: nextStatus } : o))
      );

      setDraftStatuses((prev) => ({ ...prev, [orderId]: nextStatus }));

      toast.success("Order status updated");
    } catch (error: any) {
      toast.error(error?.message || "Failed to update status");
    } finally {
      setUpdatingIds((prev) => ({ ...prev, [orderId]: false }));
    }
  }

  useEffect(() => {
    getOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredOrders = useMemo(() => {
    if (filter === "all") return orders;
    return orders.filter((o) => normalizeStatus(o.status) === filter);
  }, [filter, orders]);

  const counts = useMemo(() => {
    const c: Record<StatusFilter, number> = {
      all: orders.length,
      pending: 0,
      processing: 0,
      shipped: 0,
      delivered: 0,
    };

    for (const o of orders) {
      const s = normalizeStatus(o.status) as StatusFilter;
      if (s in c) c[s] += 1;
    }

    return c;
  }, [orders]);

  return (
    <div className="min-h-screen bg-[#f6f2ea] p-6 lg:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-[#CC0D39] to-[#9f082b] text-white rounded-3xl p-8 mb-8 flex flex-col lg:flex-row justify-between gap-6 shadow-[0_15px_40px_rgba(0,0,0,0.2)]">
          <div>
            <p className="text-sm text-[#f8d8e2] mb-2 tracking-[0.2em] uppercase">
              Orders
            </p>
            <h1 className="text-4xl md:text-5xl GolosText font-bold">
              Manage Orders
            </h1>
            <p className="text-[#f8d8e2] mt-3 Lufga">
              Update status and keep everything organized.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 h-fit">
            <Link
              href="/admin"
              className="border border-white/60 hover:bg-white hover:text-black text-white px-6 py-3 rounded-xl transition-all cursor-pointer"
            >
              Back to Admin
            </Link>

            <button
              type="button"
              onClick={getOrders}
              className="bg-black/70 hover:bg-black text-white px-6 py-3 rounded-xl h-fit transition-all cursor-pointer"
            >
              Refresh
            </button>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            {(
              [
                { key: "all" as const, label: "All" },
                { key: "pending" as const, label: "Pending" },
                { key: "processing" as const, label: "Processing" },
                { key: "shipped" as const, label: "Shipped" },
                { key: "delivered" as const, label: "Delivered" },
              ] as const
            ).map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => setFilter(item.key)}
                className={`px-4 py-2 rounded-xl border transition-all cursor-pointer ${
                  filter === item.key
                    ? "bg-black text-white border-black"
                    : "bg-white text-black border-black/10 hover:border-black/30"
                }`}
              >
                <span className="Lufga font-medium">{item.label}</span>
                <span className="ml-2 text-sm opacity-70">
                  {counts[item.key]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-3xl border border-black/10 p-10 text-center">
            <p className="GolosText text-2xl font-bold mb-2">
              No orders found
            </p>
            <p className="text-gray-500 Lufga">
              Try another filter or refresh the list.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredOrders.map((order) => {
              const selectedStatus =
                draftStatuses[order.id] ?? normalizeStatus(order.status);
              const selectedNormalized = normalizeStatus(selectedStatus);
              const currentNormalized = normalizeStatus(order.status);
              const hasUnknownCurrent = !ALLOWED_STATUSES.includes(
                currentNormalized as any
              );

              return (
                <div
                  key={order.id}
                  className="bg-white border border-black/10 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-gray-500 Lufga mb-1">
                        Order #{order.id}
                      </p>
                      <h2 className="GolosText text-xl font-bold">
                        {order.customerName}
                      </h2>
                      <p className="text-gray-500 mt-1">{order.email}</p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm text-gray-500 Lufga mb-1">
                        Total
                      </p>
                      <p className="GolosText text-xl font-bold text-[#CC0D39]">
                        ${order.totalAmount}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1 rounded-full border text-sm font-semibold ${getStatusPillClasses(
                          order.status
                        )}`}
                      >
                        {getStatusLabel(order.status)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={selectedNormalized}
                        onChange={(e) => {
                          const v = e.target.value;
                          setDraftStatuses((prev) => ({
                            ...prev,
                            [order.id]: v,
                          }));
                        }}
                        disabled={!!updatingIds[order.id]}
                        className="border border-black/20 rounded-xl px-3 py-2 outline-none bg-white"
                      >
                        {hasUnknownCurrent && (
                          <option value={currentNormalized}>
                            {getStatusLabel(order.status)}
                          </option>
                        )}
                        {ALLOWED_STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {getStatusLabel(s)}
                          </option>
                        ))}
                      </select>

                      <button
                        type="button"
                        onClick={() =>
                          updateOrderStatus(order.id, selectedNormalized)
                        }
                        disabled={!!updatingIds[order.id]}
                        className="bg-black text-white px-4 py-2 rounded-xl cursor-pointer disabled:opacity-60"
                      >
                        {updatingIds[order.id]
                          ? "Updating..."
                          : "Update"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
