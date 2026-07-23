"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useLanguage } from "@/app/i18n/LanguageContext";

export default function ComplaintsPage() {
  const { t, dir } = useLanguage();
  const c = t.pages.complaints;

  const COMPLAINT_TYPES = useMemo(
    () => [
      { value: "product", label: c.types.product },
      { value: "order", label: c.types.order },
      { value: "delivery", label: c.types.delivery },
      { value: "payment", label: c.types.payment },
      { value: "service", label: c.types.service },
      { value: "other", label: c.types.other },
    ],
    [t]
  );

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
      toast.error(c.needLogin);
      return;
    }

    if (!form.name || !form.subject || !form.message) {
      toast.error(c.fillRequired);
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
      toast.success(c.success);
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
        error instanceof Error ? error.message : c.fail
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
            {c.title}
          </h2>
          <div className="flex mt-5 text-lg md:text-2xl items-center text-center flex-wrap justify-center gap-1">
            <Link href="/" className="hover:text-(--prim) text-white">
              {c.home}
            </Link>
            <i className="ri-arrow-right-wide-line pt-1 px-2 text-white i18n-flip"></i>
            <span className="text-(--prim)">{c.crumb}</span>
          </div>
        </div>
      </div>

      <div className="px-[8%] lg:px-[16%] py-14 md:py-20" dir={dir}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-5 bg-black text-white rounded-3xl p-8 md:p-10">
            <p className="Lufga uppercase tracking-[0.18em] text-sm text-[#FEEB9D] mb-2">
              {c.weListen}
            </p>
            <h3 className="GolosText text-3xl md:text-4xl font-bold mb-4">
              {c.tellWrong}
            </h3>
            <p className="text-gray-300 mb-8 Lufga">
              {c.tellBody}
            </p>

            <div className="space-y-4">
              <div className="bg-white/10 rounded-2xl p-4">
                <p className="text-sm text-gray-300">{c.responseTime}</p>
                <p className="font-semibold">{c.responseValue}</p>
              </div>
              <div className="bg-white/10 rounded-2xl p-4">
                <p className="text-sm text-gray-300">{c.quickHelp}</p>
                <p className="font-semibold">
                  {c.quickHelpValue}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white border border-black/10 rounded-3xl p-8 md:p-10 shadow-sm">
            <h2 className="text-3xl GolosText font-bold mb-2">
              {c.submitTitle}
            </h2>
            <p className="text-gray-500 Lufga mb-7">
              {c.submitHint}
            </p>

            {!isLoggedIn ? (
              <div className="rounded-2xl border border-black/10 bg-[#fff7e8] p-6 text-center">
                <p className="GolosText text-xl font-bold mb-2">{c.loginRequired}</p>
                <p className="text-gray-600 Lufga mb-5">
                  {c.loginHint}
                </p>
                <Link
                  href="/Ui-components/Pages/Login"
                  className="btn inline-block bg-black text-white px-6 py-3 rounded-xl"
                >
                  {c.login}
                </Link>
              </div>
            ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="Lufga text-sm mb-2 block">{c.fullName}</label>
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
                    {c.accountEmail}
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    readOnly
                    className="w-full px-4 py-3 border border-gray-300 bg-gray-50 rounded-xl text-gray-700 cursor-not-allowed"
                    placeholder="you@email.com"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    {c.emailLocked}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="Lufga text-sm mb-2 block">{c.phone}</label>
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
                    {c.orderId}
                  </label>
                  <input
                    type="text"
                    value={form.orderId}
                    onChange={(e) =>
                      setForm({ ...form, orderId: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 bg-white rounded-xl focus:outline-none focus:border-black transition-colors"
                    placeholder={c.orderIdPh}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="Lufga text-sm mb-2 block">
                    {c.type}
                  </label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 bg-white rounded-xl focus:outline-none focus:border-black transition-colors"
                  >
                    {COMPLAINT_TYPES.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="Lufga text-sm mb-2 block">{c.subject}</label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(e) =>
                      setForm({ ...form, subject: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 bg-white rounded-xl focus:outline-none focus:border-black transition-colors"
                    placeholder={c.subjectPh}
                  />
                </div>
              </div>

              <div>
                <label className="Lufga text-sm mb-2 block">{c.details}</label>
                <textarea
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 bg-white rounded-xl focus:outline-none focus:border-black transition-colors"
                  placeholder={c.detailsPh}
                  rows={6}
                  maxLength={1000}
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="btn bg-black text-white cursor-pointer GolosText px-6 py-3 rounded-xl transition-all duration-300 w-full md:w-auto disabled:opacity-60"
              >
                {sending ? c.submitting : c.submitBtn}
              </button>
            </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
