"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import toast, { Toaster } from "react-hot-toast";

import loginImg from "@/public/login-img.webp";
import { customerLogin } from "../../api/auth";
import { useLanguage } from "@/app/i18n/LanguageContext";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";

const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Login() {
  const router = useRouter();
  const { t, dir } = useLanguage();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const result = loginSchema.safeParse({ username, password });

    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }

    setLoading(true);

    try {
      const data = (await customerLogin(username.trim(), password)) as {
        token?: string;
        customer?: {
          id?: string | number;
          name?: string;
          email?: string;
          phone?: string;
        };
      };

      const { setLoggedUser } = await import("../../api/session");

      setLoggedUser(
        {
          id: data.customer?.id,
          username: data.customer?.name || username,
          email: data.customer?.email,
          phone: data.customer?.phone || "",
        },
        data.token
      );

      toast.success(t.login.success);

      const params =
        typeof window !== "undefined"
          ? new URLSearchParams(window.location.search)
          : null;
      const rawNext = params?.get("next") || "/";
      const next =
        rawNext.startsWith("/") && !rawNext.startsWith("//") ? rawNext : "/";

      router.replace(next);
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : t.login.failed);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#ffedd4] flex items-center justify-center overflow-hidden relative">
        <div className="absolute w-72 h-72 bg-white/40 rounded-full blur-3xl top-20 left-20"></div>
        <div className="absolute w-72 h-72 bg-(--second)/30 rounded-full blur-3xl bottom-20 right-20"></div>

        <div className="relative bg-white/70 backdrop-blur-xl border border-white rounded-3xl shadow-2xl px-14 py-12 flex flex-col items-center">
          <h1 className="text-6xl font-bold Audiowide text-black">
            Fashi <span className="text-(--second)">Que</span>
          </h1>

          <p className="mt-4 text-gray-600 GolosText">
            {t.common.loading}
          </p>

          <div className="flex gap-3 mt-8">
            <span className="w-4 h-4 bg-black rounded-full animate-bounce"></span>
            <span className="w-4 h-4 bg-(--second) rounded-full animate-bounce [animation-delay:0.15s]"></span>
            <span className="w-4 h-4 bg-black rounded-full animate-bounce [animation-delay:0.3s]"></span>
          </div>

          <div className="mt-8 w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full w-1/2 bg-(--second) rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div dir={dir}>
        <div className="absolute top-4 end-4 z-20">
          <LanguageSwitcher />
        </div>
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 hidden lg:block bg-[#ffedd4]">
            <div className="absolute top-30 lg:top-50 start-10 z-10 login-hero-copy">
              <h2 className="text-black text-4xl GolosText font-semibold">
                {t.common.login}
              </h2>

              <div className="flex mt-5 text-2xl items-center text-black">
                <span className="font-semibold text-(--second)">FashiQue</span>

                <i className="ri-arrow-right-wide-line pt-2 px-2 i18n-flip"></i>

                <span>{t.common.login}</span>
              </div>
            </div>

            <div className="login-image relative ps-20">
              <Image src={loginImg} alt="loginImg" />
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="flex items-center justify-center px-[8%] lg:px-[16%] py-15 min-h-screen">
              <div className="border w-[90%] max-w-xl p-10 border-black rounded-2xl">
                <h2 className="text-3xl Lufga font-bold text-center mb-3">
                  {t.common.login}
                </h2>

                <p className="text-gray-500 text-center mb-6">
                  {t.login.welcome}
                </p>

                <form onSubmit={handleLogin}>
                  <div className="space-y-5">
                    <div>
                      <label className="Lufga">{t.login.username}</label>

                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-3 border border-black bg-white hover:border-(--second) rounded-lg focus:outline-none"
                        placeholder={t.login.username}
                      />
                    </div>

                    <div>
                      <label className="Lufga">{t.login.password}</label>

                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 border border-black bg-white hover:border-(--second) rounded-lg focus:outline-none"
                        placeholder={t.login.password}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-2 mt-8">
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn bg-black text-white cursor-pointer GolosText px-4 py-2 rounded-md transition-all duration-300 disabled:opacity-60"
                    >
                      {t.login.signIn}
                    </button>

                    <Link
                      href="/Ui-components/Pages/Regester"
                      className="btn bg-black text-white cursor-pointer GolosText px-4 py-2 rounded-md transition-all duration-300"
                    >
                      {t.common.register}
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Toaster position="top-right" />
    </>
  );
}
