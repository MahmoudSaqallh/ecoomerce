"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

type CartItem = {
  id: string;
  title: string;
  price: string;
  image: string;
  off?: string;
  qty: number;
};

type ShippingInfo = {
  customerName: string;
  email: string;
  line1: string;
  city: string;
  country: string;
  zip: string;
};

type PaymentMethod = "card" | "paypal" | "cod";

export default function PaymentPage() {
  const router = useRouter();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [shipping, setShipping] = useState<ShippingInfo | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [cardForm, setCardForm] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    cardName: "",
  });

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    const savedShipping = localStorage.getItem("shippingInfo");

    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }

    if (savedShipping) {
      setShipping(JSON.parse(savedShipping));
    }
  }, []);

  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      const price = parseFloat(item.price.replace("$", "")) || 0;
      return acc + price * (item.qty ?? 1);
    }, 0);
  }, [cartItems]);

  const shippingFee = subtotal > 0 ? 0 : 0;
  const total = subtotal + shippingFee;

  function formatCardNumber(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
  }

  function formatExpiry(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    if (digits.length <= 2) return digits;
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }

  function validateCard() {
    if (paymentMethod !== "card") return true;

    const cardDigits = cardForm.cardNumber.replace(/\s/g, "");

    if (cardDigits.length < 16) {
      toast.error("Please enter a valid card number");
      return false;
    }

    if (cardForm.expiry.length < 5) {
      toast.error("Please enter expiry date (MM/YY)");
      return false;
    }

    if (cardForm.cvv.length < 3) {
      toast.error("Please enter security code");
      return false;
    }

    if (!cardForm.cardName.trim()) {
      toast.error("Please enter name on card");
      return false;
    }

    return true;
  }

  async function handlePayment(e: React.FormEvent) {
    e.preventDefault();

    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    if (!shipping) {
      toast.error("Please complete shipping details first");
      router.push("/checkout");
      return;
    }

    if (!validateCard()) return;

    setIsSubmitting(true);

    const sessionId =
      localStorage.getItem("sessionId") || `session-${Date.now()}`;
    localStorage.setItem("sessionId", sessionId);

    try {
      const response = await fetch("http://localhost:3001/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Session-Id": sessionId,
        },
        body: JSON.stringify({
          customerName: shipping.customerName,
          email: shipping.email,
          shippingAddress: {
            line1: shipping.line1,
            city: shipping.city,
            country: shipping.country,
            zip: shipping.zip,
          },
          paymentMethod,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Payment failed");
      }

      localStorage.removeItem("cart");
      localStorage.removeItem("shippingInfo");
      setIsSuccess(true);
      toast.success("Payment completed successfully!");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 py-16 bg-[#fffaf3]">
        <div className="max-w-lg w-full text-center bg-white border border-black rounded-3xl p-10 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#FEEB9D] flex items-center justify-center">
            <i className="bi bi-check2-circle text-4xl text-(--second)"></i>
          </div>

          <h1 className="GolosText text-4xl font-bold mb-3">Payment Successful</h1>
          <p className="text-gray-600 Lufga mb-8">
            Thank you! Your order has been placed and is being processed.
          </p>

          <div className="flex flex-col gap-3">
            <Link
              href="/Ui-components/shop"
              className="btn bg-black text-white px-6 py-3 rounded-xl GolosText text-lg"
            >
              Continue Shopping
            </Link>
            <Link
              href="/"
              className="border border-black px-6 py-3 rounded-xl GolosText text-lg hover:bg-black hover:text-white transition-all"
            >
              Back To Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="page-section flex justify-center items-center text-center">
        <div className="z-10 flex flex-col justify-center items-center text-center px-4">
          <h2 className="text-white text-5xl md:text-7xl GolosText font-semibold">
            Payment
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
            <Link href="/checkout" className="hover:text-(--prim) text-white">
              Checkout
            </Link>
            <i className="ri-arrow-right-wide-line pt-1 px-2 text-white"></i>
            <span className="text-(--prim)">Payment</span>
          </div>
        </div>
      </div>

      <div className="px-[6%] lg:px-[12%] py-12 md:py-16">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            <div className="bg-white border border-black/10 rounded-3xl p-6 md:p-8 shadow-sm">
              <div className="flex items-center justify-between gap-4 mb-8">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-gray-500 Lufga">
                    Secure checkout
                  </p>
                  <h3 className="GolosText text-3xl md:text-4xl font-bold mt-1">
                    Payment Details
                  </h3>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-gray-500">
                  <i className="bi bi-shield-lock text-xl text-(--second)"></i>
                  <span className="Lufga text-sm">256-bit SSL</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
                {[
                  { id: "card" as const, label: "Card", icon: "bi-credit-card-2-front" },
                  { id: "paypal" as const, label: "PayPal", icon: "bi-paypal" },
                  { id: "cod" as const, label: "Cash", icon: "bi-cash-coin" },
                ].map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setPaymentMethod(method.id)}
                    className={`rounded-2xl border p-4 text-left transition-all duration-300 ${
                      paymentMethod === method.id
                        ? "border-black bg-[#FEEB9D] shadow-md scale-[1.02]"
                        : "border-gray-200 bg-[#fffaf3] hover:border-black/40"
                    }`}
                  >
                    <i className={`bi ${method.icon} text-2xl mb-2 block`}></i>
                    <span className="GolosText font-semibold">{method.label}</span>
                  </button>
                ))}
              </div>

              <form onSubmit={handlePayment} className="space-y-5">
                {paymentMethod === "card" && (
                  <div className="rounded-2xl border border-gray-200 p-5 md:p-6 bg-gradient-to-br from-[#fffaf3] to-white">
                    <div className="flex items-center justify-between mb-5">
                      <h4 className="GolosText text-xl font-semibold">Card Information</h4>
                      <div className="flex gap-2 text-2xl text-gray-500">
                        <i className="bi bi-credit-card"></i>
                        <i className="bi bi-wallet2"></i>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-gray-600 mb-2 Lufga">
                          Card Number
                        </label>
                        <input
                          type="text"
                          inputMode="numeric"
                          placeholder="1234 5678 9012 3456"
                          value={cardForm.cardNumber}
                          onChange={(e) =>
                            setCardForm({
                              ...cardForm,
                              cardNumber: formatCardNumber(e.target.value),
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-black transition-colors bg-white"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-gray-600 mb-2 Lufga">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            value={cardForm.expiry}
                            onChange={(e) =>
                              setCardForm({
                                ...cardForm,
                                expiry: formatExpiry(e.target.value),
                              })
                            }
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-black transition-colors bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 mb-2 Lufga">
                            Security Code
                          </label>
                          <input
                            type="password"
                            placeholder="CVV"
                            maxLength={4}
                            value={cardForm.cvv}
                            onChange={(e) =>
                              setCardForm({
                                ...cardForm,
                                cvv: e.target.value.replace(/\D/g, "").slice(0, 4),
                              })
                            }
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-black transition-colors bg-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm text-gray-600 mb-2 Lufga">
                          Name on Card
                        </label>
                        <input
                          type="text"
                          placeholder="Full name"
                          value={cardForm.cardName}
                          onChange={(e) =>
                            setCardForm({
                              ...cardForm,
                              cardName: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-black transition-colors bg-white"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "paypal" && (
                  <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6 text-center">
                    <i className="bi bi-paypal text-5xl text-blue-700 mb-3 block"></i>
                    <p className="GolosText text-lg font-semibold mb-2">
                      Pay with PayPal
                    </p>
                    <p className="text-gray-600 Lufga text-sm">
                      You will be redirected to PayPal to complete your purchase securely.
                    </p>
                  </div>
                )}

                {paymentMethod === "cod" && (
                  <div className="rounded-2xl border border-green-200 bg-green-50 p-6">
                    <div className="flex items-start gap-4">
                      <i className="bi bi-cash-stack text-3xl text-green-700"></i>
                      <div>
                        <p className="GolosText text-lg font-semibold mb-1">
                          Cash on Delivery
                        </p>
                        <p className="text-gray-600 Lufga text-sm">
                          Pay with cash when your order arrives at your doorstep.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {shipping && (
                  <div className="rounded-2xl border border-gray-200 p-5 bg-[#fffaf3]">
                    <h4 className="GolosText text-lg font-semibold mb-3">
                      Shipping To
                    </h4>
                    <div className="text-gray-700 Lufga text-sm space-y-1">
                      <p className="font-medium text-black">{shipping.customerName}</p>
                      <p>{shipping.email}</p>
                      <p>{shipping.line1}</p>
                      <p>
                        {shipping.city}, {shipping.zip}
                      </p>
                      <p>{shipping.country}</p>
                    </div>
                    <Link
                      href="/checkout"
                      className="inline-block mt-3 text-sm text-(--second) hover:underline"
                    >
                      Edit shipping details
                    </Link>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting || cartItems.length === 0}
                  className="btn w-full bg-black text-white GolosText text-xl px-6 py-4 rounded-2xl disabled:opacity-60 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <i className="bi bi-arrow-repeat animate-spin"></i>
                      Processing...
                    </span>
                  ) : (
                    <span>
                      <i className="bi bi-lock-fill me-2"></i>
                      Pay ${total.toFixed(2)}
                    </span>
                  )}
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="sticky top-28 bg-white border border-black/10 rounded-3xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#FEEB9D] flex items-center justify-center">
                  <i className="bi bi-bag-check text-2xl text-(--second)"></i>
                </div>
                <div>
                  <h3 className="GolosText text-2xl font-bold">Order Summary</h3>
                  <p className="text-gray-500 text-sm Lufga">
                    {cartItems.length} item{cartItems.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              <div className="space-y-4 max-h-[320px] overflow-y-auto pe-1">
                {cartItems.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-gray-300 p-6 text-center text-gray-500 Lufga">
                    No items in cart
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 p-3 rounded-2xl border border-gray-100 bg-[#fffaf3]"
                    >
                      <img
                        src={item.image || "/no-image.png"}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded-xl border"
                        onError={(e) => {
                          e.currentTarget.src = "/no-image.png";
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="GolosText font-semibold truncate">
                          {item.title}
                        </h4>
                        <p className="text-sm text-gray-500 Lufga">
                          Qty: {item.qty ?? 1}
                        </p>
                      </div>
                      <span className="GolosText font-bold whitespace-nowrap">
                        {item.price}
                      </span>
                    </div>
                  ))
                )}
              </div>

              <div className="border-t border-gray-200 mt-6 pt-5 space-y-3">
                <div className="flex justify-between Lufga text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between Lufga text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                  <span className="GolosText text-xl font-bold">Total</span>
                  <span className="GolosText text-2xl font-bold text-(--second)">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-2 text-center text-xs text-gray-500 Lufga">
                <div className="rounded-xl bg-[#fffaf3] p-3">
                  <i className="bi bi-truck text-lg block mb-1"></i>
                  Fast Delivery
                </div>
                <div className="rounded-xl bg-[#fffaf3] p-3">
                  <i className="bi bi-arrow-repeat text-lg block mb-1"></i>
                  Easy Returns
                </div>
                <div className="rounded-xl bg-[#fffaf3] p-3">
                  <i className="bi bi-shield-check text-lg block mb-1"></i>
                  Secure Pay
                </div>
              </div>

              <Link href="/Ui-components/Pages/Cart">
                <button
                  type="button"
                  className="w-full mt-5 border border-black rounded-xl py-3 GolosText hover:bg-black hover:text-white transition-all"
                >
                  Back to Cart
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
