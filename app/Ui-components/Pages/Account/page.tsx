"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

type OrderItem = {
  productId?: string;
  name?: string;
  quantity?: number;
  price?: number;
};

type Order = {
  id: string;
  customerName: string;
  email: string;
  phone?: string;
  status: string;
  paymentMethod: string;
  paymentStatus: string;
  totalAmount: number;
  items: OrderItem[];
  createdAt: string;
};

const STATUS_LABELS: Record<string, string> = {
  new: "New",
  preparing: "Preparing",
  ready_to_ship: "Ready to ship",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
  returned: "Returned",
};

export default function AccountPage() {
  const [user, setUser] = useState<{
    username?: string;
    email?: string;
    phone?: string;
  } | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const raw = localStorage.getItem("loggedUser");
      const parsed = raw ? JSON.parse(raw) : null;
      setUser(parsed);
      if (!parsed?.email) {
        setOrders([]);
        return;
      }
      const { fetchMyOrders } = await import("../../api/auth");
      const list = await fetchMyOrders();
      setOrders(list);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to load account");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const selected = orders.find((o) => o.id === selectedId) || null;

  return (
    <>
      <div className="page-section flex justify-center items-center text-center">
        <div className="z-10 flex flex-col justify-center items-center text-center px-4">
          <h2 className="text-white text-5xl md:text-7xl GolosText font-semibold">
            My Account
          </h2>
          <div className="flex mt-5 text-lg md:text-2xl items-center text-center flex-wrap justify-center gap-1">
            <Link href="/" className="hover:text-(--prim) text-white">
              Home
            </Link>
            <i className="ri-arrow-right-wide-line pt-1 px-2 text-white"></i>
            <span className="text-(--prim)">Account</span>
          </div>
        </div>
      </div>

      <div className="px-[8%] lg:px-[16%] py-14 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 rounded-3xl border border-black/10 bg-white p-6 md:p-8">
            <h3 className="GolosText text-2xl font-bold mb-4">Profile</h3>
            {user ? (
              <div className="space-y-3 Lufga text-gray-700">
                <p>
                  <span className="text-gray-400 text-sm block">Name</span>
                  {user.username || "—"}
                </p>
                <p>
                  <span className="text-gray-400 text-sm block">Email</span>
                  {user.email || "—"}
                </p>
                <p>
                  <span className="text-gray-400 text-sm block">Phone</span>
                  {user.phone || "—"}
                </p>
                <div className="pt-4 flex flex-col gap-2">
                  <Link
                    href="/Ui-components/Pages/Notifications"
                    className="border border-black px-4 py-2.5 rounded-xl text-center hover:bg-black hover:text-white transition"
                  >
                    Notifications
                  </Link>
                  <Link
                    href="/Ui-components/Pages/Complaints"
                    className="border border-black px-4 py-2.5 rounded-xl text-center hover:bg-black hover:text-white transition"
                  >
                    Complaints
                  </Link>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">Please login.</p>
            )}
          </div>

          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-6 gap-3 flex-wrap">
              <div>
                <h3 className="GolosText text-3xl font-bold">My Orders</h3>
                <p className="text-gray-500 Lufga mt-1">
                  Track status and payment for each order
                </p>
              </div>
              <button
                type="button"
                onClick={() => void load()}
                className="border border-black px-4 py-2 rounded-xl text-sm hover:bg-black hover:text-white transition"
              >
                Refresh
              </button>
            </div>

            {loading ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-24 rounded-3xl bg-gray-100 animate-pulse"
                  />
                ))}
              </div>
            ) : !orders.length ? (
              <div className="rounded-3xl border border-black/10 bg-white p-10 text-center">
                <p className="GolosText text-2xl font-bold mb-2">No orders yet</p>
                <p className="text-gray-500 Lufga mb-5">
                  When you place an order it will show up here.
                </p>
                <Link
                  href="/Ui-components/shop"
                  className="btn inline-block bg-black text-white px-6 py-3 rounded-xl"
                >
                  Browse shop
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((o) => (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() =>
                      setSelectedId((prev) => (prev === o.id ? null : o.id))
                    }
                    className={`w-full text-left rounded-3xl border p-5 md:p-6 transition ${
                      selectedId === o.id
                        ? "border-black bg-[#fff7e8]"
                        : "border-black/10 bg-white hover:border-black/30"
                    }`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="GolosText font-bold text-lg">{o.id}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          {o.createdAt
                            ? new Date(o.createdAt).toLocaleString()
                            : ""}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          ${Number(o.totalAmount || 0).toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {STATUS_LABELS[o.status] || o.status} ·{" "}
                          {o.paymentStatus}
                        </p>
                      </div>
                    </div>

                    {selectedId === o.id && selected ? (
                      <div className="mt-4 border-t border-black/10 pt-4 space-y-2">
                        <p className="text-sm text-gray-600">
                          Payment: {selected.paymentMethod} (
                          {selected.paymentStatus})
                        </p>
                        {(selected.items || []).map((item, idx) => (
                          <div
                            key={`${selected.id}-${idx}`}
                            className="flex justify-between text-sm"
                          >
                            <span>
                              {item.name || item.productId} ×{" "}
                              {item.quantity || 1}
                            </span>
                            <span>
                              $
                              {(
                                Number(item.price || 0) *
                                Number(item.quantity || 1)
                              ).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
