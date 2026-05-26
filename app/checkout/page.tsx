"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function CheckoutPage() {

  const [form, setForm] = useState({
    customerName: "",
    email: "",
    line1: "",
    city: "",
    country: "",
    zip: "",
  });

  async function handleCheckout(
    e: React.FormEvent
  ) {

    e.preventDefault();

    const token =
      localStorage.getItem("token");

    if (!token) {

      toast.error(
        "Please Login First"
      );

      return;
    }

    const cart = JSON.parse(
      localStorage.getItem("cart") ||
      "[]"
    );

    if (cart.length === 0) {

      toast.error(
        "Cart is empty"
      );

      return;
    }

    const sessionId =
      localStorage.getItem(
        "sessionId"
      ) ||
      crypto.randomUUID();

    localStorage.setItem(
      "sessionId",
      sessionId
    );

    try {

      const response =
        await fetch(
          "http://localhost:3001/api/orders",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              "X-Session-Id":
                sessionId,

              Authorization:
                `Bearer ${token}`,
            },

            body: JSON.stringify(
              {
                customerName:
                  form.customerName,

                email:
                  form.email,

                items:
                  cart.map(
                    (item: any) => ({
                      itemId:
                        item.id,

                      quantity:
                        item.qty,
                    })
                  ),

                shippingAddress:
                  {
                    line1:
                      form.line1,

                    city:
                      form.city,

                    country:
                      form.country,

                    zip:
                      form.zip,
                  },
              }
            ),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {

        throw new Error(
          data.error ||
            "Checkout Failed"
        );
      }

      toast.success(
        "Order Placed Successfully"
      );

      localStorage.removeItem(
        "cart"
      );

      setForm({
        customerName: "",
        email: "",
        line1: "",
        city: "",
        country: "",
        zip: "",
      });

    } catch (error: any) {

      toast.error(
        error.message
      );

    }
  }

  return (
    <div className="min-h-screen bg-[#f6f2ea] p-8">

      <div className="max-w-3xl mx-auto bg-white border border-black rounded-3xl p-8">

        <h1 className="text-3xl font-bold mb-6">
          Checkout
        </h1>

        <form
          onSubmit={
            handleCheckout
          }
          className="space-y-5"
        >

          <input
            placeholder="Customer Name"
            value={
              form.customerName
            }
            onChange={(e) =>
              setForm({
                ...form,
                customerName:
                  e.target.value,
              })
            }
            className="w-full px-4 py-3 border border-black rounded-xl"
          />

          <input
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email:
                  e.target.value,
              })
            }
            className="w-full px-4 py-3 border border-black rounded-xl"
          />

          <input
            placeholder="Address"
            value={form.line1}
            onChange={(e) =>
              setForm({
                ...form,
                line1:
                  e.target.value,
              })
            }
            className="w-full px-4 py-3 border border-black rounded-xl"
          />

          <input
            placeholder="City"
            value={form.city}
            onChange={(e) =>
              setForm({
                ...form,
                city:
                  e.target.value,
              })
            }
            className="w-full px-4 py-3 border border-black rounded-xl"
          />

          <input
            placeholder="Country"
            value={
              form.country
            }
            onChange={(e) =>
              setForm({
                ...form,
                country:
                  e.target.value,
              })
            }
            className="w-full px-4 py-3 border border-black rounded-xl"
          />

          <input
            placeholder="ZIP Code"
            value={form.zip}
            onChange={(e) =>
              setForm({
                ...form,
                zip:
                  e.target.value,
              })
            }
            className="w-full px-4 py-3 border border-black rounded-xl"
          />

          <button
            type="submit"
            className="bg-black text-white px-6 py-3 rounded-xl w-full cursor-pointer"
          >
            Place Order
          </button>

        </form>

      </div>

    </div>
  );
}