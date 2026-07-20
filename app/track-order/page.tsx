"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

type TrackedOrder = {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  status: string;
  paymentStatus: string;
  paymentMethod: string;
  totalAmount: number;
  createdAt: string;
  items: Array<{ name: string; quantity: number; price: number }>;
};

const STATUS_STEPS = [
  { key: "new", label: "Order Placed" },
  { key: "preparing", label: "Preparing" },
  { key: "ready_to_ship", label: "Ready to Ship" },
  { key: "shipped", label: "Shipped" },
  { key: "delivered", label: "Delivered" },
];

const STATUS_LABELS: Record<string, string> = {
  new: "New",
  preparing: "Preparing",
  ready_to_ship: "Ready to Ship",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
  returned: "Returned",
};

function statusIndex(status: string) {
  const idx = STATUS_STEPS.findIndex((s) => s.key === status);
  if (status === "cancelled" || status === "returned") return -1;
  return idx >= 0 ? idx : 0;
}

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<TrackedOrder | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!orderId.trim()) {
      toast.error("Please enter your order number");
      return;
    }
    if (!email.trim() && !phone.trim()) {
      toast.error("Please enter your email or phone");
      return;
    }

    setLoading(true);
    setOrder(null);
    try {
      const { trackOrder } = await import("../Ui-components/api/auth");
      const result = await trackOrder({
        orderId: orderId.trim(),
        email: email.trim(),
        phone: phone.trim(),
      });
      setOrder(result);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Order not found");
    } finally {
      setLoading(false);
    }
  }

  const currentStep = order ? statusIndex(order.status) : -1;
  const isTerminal =
    order?.status === "cancelled" || order?.status === "returned";

  return (
    <>
      <div className="page-section flex justify-center items-center text-center">
        <div className="z-10 flex flex-col justify-center items-center text-center px-4">
          <h2 className="text-white text-5xl md:text-7xl GolosText font-semibold">
            Track Order
          </h2>
          <div className="flex mt-5 text-lg md:text-2xl items-center text-center flex-wrap justify-center gap-1">
            <Link href="/" className="hover:text-(--prim) text-white">
              Home
            </Link>
            <i className="ri-arrow-right-wide-line pt-1 px-2 text-white"></i>
            <span className="text-(--prim)">Track Order</span>
          </div>
        </div>
      </div>

      <div className="px-[6%] lg:px-[12%] py-12 md:py-16 max-w-3xl mx-auto">
        <div className="bg-white border border-black/10 rounded-3xl p-6 md:p-8 shadow-sm">
          <h3 className="GolosText text-2xl font-bold mb-2">Where is my order?</h3>
          <p className="text-gray-600 Lufga text-sm mb-6">
            Enter your order number and the email or phone used at checkout.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2 Lufga">
                Order Number
              </label>
              <input
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="e.g. ord-abc123"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-black bg-white"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2 Lufga">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-black bg-white"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2 Lufga">
                Phone (optional if email provided)
              </label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+966..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-black bg-white"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn w-full bg-black text-white GolosText text-lg px-6 py-3 rounded-xl disabled:opacity-60"
            >
              {loading ? "Searching..." : "Track Order"}
            </button>
          </form>
        </div>

        {order && (
          <div className="mt-8 bg-white border border-black/10 rounded-3xl p-6 md:p-8 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-500 Lufga">Order</p>
                <h4 className="GolosText text-xl font-bold">{order.id}</h4>
                <p className="text-sm text-gray-500 Lufga mt-1">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <span
                  className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold Lufga ${
                    isTerminal
                      ? "bg-red-100 text-red-700"
                      : "bg-[#FEEB9D] text-black"
                  }`}
                >
                  {STATUS_LABELS[order.status] || order.status}
                </span>
                <p className="GolosText text-2xl font-bold text-(--second) mt-2">
                  ${Number(order.totalAmount).toFixed(2)}
                </p>
              </div>
            </div>

            {!isTerminal && (
              <div className="mb-8">
                <div className="flex justify-between relative">
                  <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 -z-0" />
                  <div
                    className="absolute top-4 left-0 h-0.5 bg-(--second) -z-0 transition-all"
                    style={{
                      width:
                        currentStep >= 0
                          ? `${(currentStep / (STATUS_STEPS.length - 1)) * 100}%`
                          : "0%",
                    }}
                  />
                  {STATUS_STEPS.map((step, idx) => (
                    <div
                      key={step.key}
                      className="flex flex-col items-center z-10 flex-1"
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                          idx <= currentStep
                            ? "bg-(--second) text-white"
                            : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        {idx + 1}
                      </div>
                      <p
                        className={`text-xs mt-2 text-center Lufga hidden sm:block ${
                          idx <= currentStep ? "text-black font-medium" : "text-gray-400"
                        }`}
                      >
                        {step.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="border-t border-gray-100 pt-5">
              <h5 className="GolosText font-semibold mb-3">Items</h5>
              <ul className="space-y-2">
                {(order.items || []).map((item, idx) => (
                  <li
                    key={idx}
                    className="flex justify-between text-sm Lufga text-gray-700"
                  >
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-4 text-sm text-gray-500 Lufga">
              Payment: {order.paymentMethod} ({order.paymentStatus})
            </p>
          </div>
        )}
      </div>
    </>
  );
}
