"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

const COMPLAINT_TYPES = [
  { value: "product", label: "Product quality / issue" },
  { value: "order", label: "Order problem" },
  { value: "delivery", label: "Delivery / shipping" },
  { value: "payment", label: "Payment issue" },
  { value: "service", label: "Customer service" },
  { value: "other", label: "Other" },
];

export default function ComplaintsPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    orderId: "",
    type: "product",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("loggedUser");
      const user = raw ? JSON.parse(raw) : null;
      if (user?.email) {
        setIsLoggedIn(true);
        setForm((prev) => ({
          ...prev,
          name: user.username || user.name || prev.name,
          email: String(user.email).toLowerCase().trim(),
          phone: user.phone || prev.phone,
        }));
      } else {
        setIsLoggedIn(false);
      }
    } catch {
      setIsLoggedIn(false);
    }
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!isLoggedIn || !form.email) {
      toast.error("Please login first so updates reach your notifications");
      return;
    }

    if (!form.name || !form.subject || !form.message) {
      toast.error("Please fill all required fields");
      return;
    }

    setSending(true);
    try {
      const { submitComplaint } = await import("../../api/auth");
      await submitComplaint({
        name: form.name,
        email: form.email,
        phone: form.phone,
        orderId: form.orderId,
        type: form.type,
        subject: form.subject,
        message: form.message,
      });
      toast.success("Complaint submitted — check Notifications for updates");
      window.dispatchEvent(new Event("fashique-notifications-change"));
      setForm((prev) => ({
        ...prev,
        orderId: "",
        type: "product",
        subject: "",
        message: "",
      }));
    } catch (error: unknown) {
      toast.error(
        error instanceof Error ? error.message : "Failed to submit complaint"
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <div className="page-section flex justify-center items-center text-center">
        <div className="z-10 flex flex-col justify-center items-center text-center px-4">
          <h2 className="text-white text-5xl md:text-7xl GolosText font-semibold">
            Complaints
          </h2>
          <div className="flex mt-5 text-lg md:text-2xl items-center text-center flex-wrap justify-center gap-1">
            <Link href="/" className="hover:text-(--prim) text-white">
              Home
            </Link>
            <i className="ri-arrow-right-wide-line pt-1 px-2 text-white"></i>
            <span className="text-(--prim)">Complaints</span>
          </div>
        </div>
      </div>

      <div className="px-[8%] lg:px-[16%] py-14 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-5 bg-black text-white rounded-3xl p-8 md:p-10">
            <p className="Lufga uppercase tracking-[0.18em] text-sm text-[#FEEB9D] mb-2">
              We listen
            </p>
            <h3 className="GolosText text-3xl md:text-4xl font-bold mb-4">
              Tell us what went wrong
            </h3>
            <p className="text-gray-300 mb-8 Lufga">
              Submit a complaint about an order, product, delivery, or service.
              Our team will review it from the admin dashboard and follow up.
            </p>

            <div className="space-y-4">
              <div className="bg-white/10 rounded-2xl p-4">
                <p className="text-sm text-gray-300">Response time</p>
                <p className="font-semibold">Usually within 24–48 hours</p>
              </div>
              <div className="bg-white/10 rounded-2xl p-4">
                <p className="text-sm text-gray-300">Need quick help?</p>
                <p className="font-semibold">
                  Use Contact Us for general questions
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white border border-black/10 rounded-3xl p-8 md:p-10 shadow-sm">
            <h2 className="text-3xl GolosText font-bold mb-2">
              Submit a Complaint
            </h2>
            <p className="text-gray-500 Lufga mb-7">
              Updates (resolved / rejected) appear in your Notifications using
              your account email.
            </p>

            {!isLoggedIn ? (
              <div className="rounded-2xl border border-black/10 bg-[#fff7e8] p-6 text-center">
                <p className="GolosText text-xl font-bold mb-2">Login required</p>
                <p className="text-gray-600 Lufga mb-5">
                  Sign in first so complaint updates reach your account
                  notifications.
                </p>
                <Link
                  href="/Ui-components/Pages/Login"
                  className="btn inline-block bg-black text-white px-6 py-3 rounded-xl"
                >
                  Login
                </Link>
              </div>
            ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="Lufga text-sm mb-2 block">Full Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 bg-white rounded-xl focus:outline-none focus:border-black transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="Lufga text-sm mb-2 block">
                    Account Email *
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    readOnly
                    className="w-full px-4 py-3 border border-gray-300 bg-gray-50 rounded-xl text-gray-700 cursor-not-allowed"
                    placeholder="you@email.com"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Locked to your login email — notifications go here
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="Lufga text-sm mb-2 block">Phone</label>
                  <input
                    type="text"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 bg-white rounded-xl focus:outline-none focus:border-black transition-colors"
                    placeholder="Phone number"
                  />
                </div>
                <div>
                  <label className="Lufga text-sm mb-2 block">
                    Order ID (optional)
                  </label>
                  <input
                    type="text"
                    value={form.orderId}
                    onChange={(e) =>
                      setForm({ ...form, orderId: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 bg-white rounded-xl focus:outline-none focus:border-black transition-colors"
                    placeholder="e.g. ord-xxxx"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="Lufga text-sm mb-2 block">
                    Complaint type *
                  </label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 bg-white rounded-xl focus:outline-none focus:border-black transition-colors"
                  >
                    {COMPLAINT_TYPES.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="Lufga text-sm mb-2 block">Subject *</label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(e) =>
                      setForm({ ...form, subject: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 bg-white rounded-xl focus:outline-none focus:border-black transition-colors"
                    placeholder="Short summary"
                  />
                </div>
              </div>

              <div>
                <label className="Lufga text-sm mb-2 block">Details *</label>
                <textarea
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 bg-white rounded-xl focus:outline-none focus:border-black transition-colors"
                  placeholder="Describe the issue clearly..."
                  rows={6}
                  maxLength={1000}
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="btn bg-black text-white cursor-pointer GolosText px-6 py-3 rounded-xl transition-all duration-300 w-full md:w-auto disabled:opacity-60"
              >
                {sending ? "Submitting..." : "Submit Complaint"}
              </button>
            </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
