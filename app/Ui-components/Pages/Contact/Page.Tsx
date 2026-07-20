"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    async function prefill() {
      try {
        const { getLoggedUser } = await import("../../api/session");
        const user = getLoggedUser();
        if (!user) return;
        setForm((prev) => ({
          ...prev,
          name: prev.name || user.username || "",
          email: prev.email || user.email || "",
        }));
      } catch {
        // ignore
      }
    }
    void prefill();
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone || !form.message) {
      toast.error("Please fill all fields");
      return;
    }

    setSending(true);
    setSent(false);
    try {
      const { sendContactMessage } = await import("../../api/auth");
      await sendContactMessage({
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim(),
        message: form.message.trim(),
        subject: "Contact Us",
      });
      setSent(true);
      toast.success("Message sent — our team will reply soon", {
        duration: 5000,
      });
      window.dispatchEvent(new Event("fashique-auth-change"));
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (error: unknown) {
      setSent(false);
      toast.error(
        error instanceof Error ? error.message : "Failed to send message"
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
            Contact Us
          </h2>
          <div className="flex mt-5 text-lg md:text-2xl items-center text-center flex-wrap justify-center gap-1">
            <Link href="/" className="hover:text-(--prim) text-white">
              Home
            </Link>
            <i className="ri-arrow-right-wide-line pt-1 px-2 text-white"></i>
            <span className="text-(--prim)">Contact</span>
          </div>
        </div>
      </div>

      <div className="px-[8%] lg:px-[16%] py-14 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-5 bg-black text-white rounded-3xl p-8 md:p-10">
            <p className="Lufga uppercase tracking-[0.18em] text-sm text-[#FEEB9D] mb-2">
              We are here for you
            </p>
            <h3 className="GolosText text-3xl md:text-4xl font-bold mb-4">
              Let&apos;s Talk About Your Style
            </h3>
            <p className="text-gray-300 mb-8 Lufga">
              Questions about orders, products, or anything else? Our team is
              ready to help you quickly.
            </p>

            <div className="space-y-4">
              <div className="bg-white/10 rounded-2xl p-4 flex items-center gap-4">
                <i className="bi bi-envelope-paper text-2xl text-[#FEEB9D]"></i>
                <div>
                  <p className="text-sm text-gray-300">Email</p>
                  <p className="font-semibold">support@fashique.com</p>
                </div>
              </div>

              <div className="bg-white/10 rounded-2xl p-4 flex items-center gap-4">
                <i className="bi bi-telephone text-2xl text-[#FEEB9D]"></i>
                <div>
                  <p className="text-sm text-gray-300">Phone</p>
                  <p className="font-semibold">+962 7 9000 0000</p>
                </div>
              </div>

              <div className="bg-white/10 rounded-2xl p-4 flex items-center gap-4">
                <i className="bi bi-geo-alt text-2xl text-[#FEEB9D]"></i>
                <div>
                  <p className="text-sm text-gray-300">Address</p>
                  <p className="font-semibold">Amman, Jordan</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white border border-black/10 rounded-3xl p-8 md:p-10 shadow-sm">
            <h2 className="text-3xl GolosText font-bold mb-2">Send Message</h2>
            <p className="text-gray-500 Lufga mb-7">
              Fill the form below and we will get back to you as soon as
              possible.
            </p>

            {sent ? (
              <div
                className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-emerald-900"
                role="status"
              >
                <p className="GolosText text-lg font-semibold">
                  Message received successfully
                </p>
                <p className="Lufga mt-1 text-sm text-emerald-800">
                  Your message was sent to our team. You can also check{" "}
                  <Link
                    href="/Ui-components/Pages/Notifications"
                    className="underline font-semibold hover:text-emerald-950"
                  >
                    Notifications
                  </Link>
                  .
                </p>
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="Lufga text-sm mb-2 block">Full Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 bg-white rounded-xl focus:outline-none focus:border-black transition-colors"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="Lufga text-sm mb-2 block">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 bg-white rounded-xl focus:outline-none focus:border-black transition-colors"
                    placeholder="you@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="Lufga text-sm mb-2 block">Phone Number</label>
                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 bg-white rounded-xl focus:outline-none focus:border-black transition-colors"
                  placeholder="Enter phone number"
                  required
                />
              </div>

              <div>
                <label className="Lufga text-sm mb-2 block">Message</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 bg-white rounded-xl focus:outline-none focus:border-black transition-colors"
                  placeholder="Write your message..."
                  rows={6}
                  maxLength={400}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="btn bg-black text-white cursor-pointer GolosText px-6 py-3 rounded-xl transition-all duration-300 w-full md:w-auto disabled:opacity-60"
              >
                {sending ? "Sending..." : "Submit Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
