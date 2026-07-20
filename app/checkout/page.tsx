"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    customerName: "",
    email: "",
    line1: "",
    city: "",
    country: "",
    zip: "",
  });

  function handleCheckout(e: React.FormEvent) {
    e.preventDefault();

    if (
      !form.customerName ||
      !form.email ||
      !form.line1 ||
      !form.city ||
      !form.country ||
      !form.zip
    ) {
      toast.error("Please fill all fields");
      return;
    }

    import("../Ui-components/api/session").then(
      ({ setShippingInfo, getSessionId }) => {
        getSessionId();
        setShippingInfo(form);
        toast.success("Shipping details saved");
        router.push("/Ui-components/Pages/Payment");
      }
    );
  }

  return (
    <div className="min-h-screen bg-[#fffaf3]">
      <div className="page-section flex justify-center items-center text-center">
        <div className="z-10 flex flex-col justify-center items-center text-center px-4">
          <h2 className="text-white text-5xl md:text-7xl GolosText font-semibold">
            Checkout
          </h2>
          <div className="flex mt-5 text-lg md:text-2xl items-center text-center flex-wrap justify-center gap-1">
            <Link href="/" className="hover:text-(--prim) text-white">
              Home
            </Link>
            <i className="ri-arrow-right-wide-line pt-1 px-2 text-white"></i>
            <Link
              href="/Ui-components/Pages/Cart"
              className="hover:text-(--prim) text-white"
            >
              Cart
            </Link>
            <i className="ri-arrow-right-wide-line pt-1 px-2 text-white"></i>
            <span className="text-(--prim)">Checkout</span>
          </div>
        </div>
      </div>

      <div className="px-[6%] lg:px-[12%] py-12 md:py-16">
        <div className="max-w-3xl mx-auto bg-white border border-black/10 rounded-3xl p-6 md:p-10 shadow-sm">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.2em] text-gray-500 Lufga">
              Step 1 of 2
            </p>
            <h1 className="GolosText text-3xl md:text-4xl font-bold mt-1">
              Shipping Information
            </h1>
            <p className="text-gray-600 Lufga mt-2">
              Enter your details to continue to secure payment.
            </p>
          </div>

          <form onSubmit={handleCheckout} className="space-y-5">
            <input
              type="text"
              placeholder="Customer Name"
              value={form.customerName}
              onChange={(e) =>
                setForm({ ...form, customerName: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-black transition-colors"
            />

            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-black transition-colors"
            />

            <input
              type="text"
              placeholder="Address"
              value={form.line1}
              onChange={(e) =>
                setForm({ ...form, line1: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-black transition-colors"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="City"
                value={form.city}
                onChange={(e) =>
                  setForm({ ...form, city: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-black transition-colors"
              />

              <input
                type="text"
                placeholder="ZIP Code"
                value={form.zip}
                onChange={(e) =>
                  setForm({ ...form, zip: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-black transition-colors"
              />
            </div>

            <input
              type="text"
              placeholder="Country"
              value={form.country}
              onChange={(e) =>
                setForm({ ...form, country: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-black transition-colors"
            />

            <button
              type="submit"
              className="btn bg-black text-white px-6 py-4 rounded-2xl w-full cursor-pointer GolosText text-xl"
            >
              Continue to Payment
            </button>

            <Link href="/Ui-components/Pages/Cart">
              <button
                type="button"
                className="w-full border border-black rounded-2xl py-3 GolosText hover:bg-black hover:text-white transition-all"
              >
                Back to Cart
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}