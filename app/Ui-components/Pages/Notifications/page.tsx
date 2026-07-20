"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

type NotificationItem = {
  id: string;
  type: string;
  title: string;
  message: string;
  link?: string;
  read: boolean;
  createdAt: string;
};

const TYPE_LABELS: Record<string, string> = {
  payment: "Payment",
  order: "Order",
  complaint: "Complaint",
  account: "Account",
  general: "General",
};

export default function NotificationsPage() {
  const [items, setItems] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");

  const load = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    try {
      const raw = localStorage.getItem("loggedUser");
      const user = raw ? JSON.parse(raw) : null;
      if (!user?.email) {
        setEmail("");
        setItems([]);
        return;
      }
      setEmail(user.email);
      const { fetchNotifications } = await import("../../api/auth");
      const data = await fetchNotifications();
      setItems(data.notifications || []);
    } catch (err: unknown) {
      if (!silent) {
        toast.error(
          err instanceof Error ? err.message : "Failed to load notifications"
        );
      }
    } finally {
      if (!silent) setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load(false);

    const onFocus = () => void load(true);
    const onChange = () => void load(true);
    const timer = setInterval(() => void load(true), 15000);

    window.addEventListener("focus", onFocus);
    window.addEventListener("fashique-notifications-change", onChange);
    window.addEventListener("fashique-auth-change", onChange);

    return () => {
      clearInterval(timer);
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("fashique-notifications-change", onChange);
      window.removeEventListener("fashique-auth-change", onChange);
    };
  }, [load]);

  async function markRead(id: string) {
    try {
      const { markNotificationRead } = await import("../../api/auth");
      await markNotificationRead(id);
      setItems((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
      window.dispatchEvent(new Event("fashique-notifications-change"));
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed");
    }
  }

  async function markAll() {
    try {
      const { markAllNotificationsRead } = await import("../../api/auth");
      await markAllNotificationsRead();
      setItems((prev) => prev.map((n) => ({ ...n, read: true })));
      window.dispatchEvent(new Event("fashique-notifications-change"));
      toast.success("All notifications marked as read");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed");
    }
  }

  async function remove(id: string) {
    try {
      const { deleteNotification } = await import("../../api/auth");
      await deleteNotification(id);
      setItems((prev) => prev.filter((n) => n.id !== id));
      window.dispatchEvent(new Event("fashique-notifications-change"));
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed");
    }
  }

  if (!email && !loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className="text-4xl GolosText font-bold">Notifications</h1>
        <p className="text-gray-500 Lufga">
          Please login to see payment, order, and complaint updates.
        </p>
        <Link
          href="/Ui-components/Pages/Login"
          className="btn bg-black text-white px-6 py-3 rounded-xl"
        >
          Login
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="page-section flex justify-center items-center text-center">
        <div className="z-10 flex flex-col justify-center items-center text-center px-4">
          <h2 className="text-white text-5xl md:text-7xl GolosText font-semibold">
            Notifications
          </h2>
          <div className="flex mt-5 text-lg md:text-2xl items-center text-center flex-wrap justify-center gap-1">
            <Link href="/" className="hover:text-(--prim) text-white">
              Home
            </Link>
            <i className="ri-arrow-right-wide-line pt-1 px-2 text-white"></i>
            <span className="text-(--prim)">Notifications</span>
          </div>
        </div>
      </div>

      <div className="px-[8%] lg:px-[16%] py-14 md:py-20">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <div>
            <h3 className="text-3xl GolosText font-bold">Your updates</h3>
            <p className="text-gray-500 Lufga mt-1">
              Payments, orders, complaints, and account news
            </p>
          </div>
          {items.some((n) => !n.read) ? (
            <button
              type="button"
              onClick={markAll}
              className="btn bg-black text-white px-5 py-2.5 rounded-xl"
            >
              Mark all as read
            </button>
          ) : null}
        </div>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : !items.length ? (
          <div className="rounded-3xl border border-black/10 bg-white p-10 text-center">
            <p className="GolosText text-2xl font-bold mb-2">No notifications yet</p>
            <p className="text-gray-500 Lufga">
              Place an order or submit a complaint to get updates here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((n) => (
              <div
                key={n.id}
                className={`rounded-3xl border p-5 md:p-6 transition ${
                  n.read
                    ? "border-black/10 bg-white"
                    : "border-black/20 bg-[#fff7e8]"
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-xs uppercase tracking-wider px-2.5 py-1 rounded-full bg-black text-white">
                        {TYPE_LABELS[n.type] || n.type}
                      </span>
                      {!n.read ? (
                        <span className="text-xs font-semibold text-(--second)">
                          New
                        </span>
                      ) : null}
                    </div>
                    <h4 className="GolosText text-xl font-bold">{n.title}</h4>
                    <p className="text-gray-600 Lufga mt-2 whitespace-pre-wrap">
                      {n.message}
                    </p>
                    <p className="text-xs text-gray-400 mt-3">
                      {n.createdAt
                        ? new Date(n.createdAt).toLocaleString()
                        : ""}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {!n.read ? (
                      <button
                        type="button"
                        onClick={() => markRead(n.id)}
                        className="border border-black px-3 py-2 rounded-xl text-sm hover:bg-black hover:text-white transition"
                      >
                        Mark read
                      </button>
                    ) : null}
                    {n.link ? (
                      <Link
                        href={n.link}
                        className="border border-black px-3 py-2 rounded-xl text-sm hover:bg-black hover:text-white transition"
                      >
                        Open
                      </Link>
                    ) : null}
                    <button
                      type="button"
                      onClick={() => remove(n.id)}
                      className="border border-red-400 text-red-600 px-3 py-2 rounded-xl text-sm hover:bg-red-50 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
