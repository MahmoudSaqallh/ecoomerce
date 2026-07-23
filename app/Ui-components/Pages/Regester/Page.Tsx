"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import toast, { Toaster } from "react-hot-toast";

import loginImg from "@/public/login-img.webp";
import { registerCustomer } from "../../api/auth";
import { useLanguage } from "@/app/i18n/LanguageContext";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";

export default function Regester() {
  const router = useRouter();
  const { t, dir } = useLanguage();
  const r = t.pages.register;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const registerSchema = z.object({
    username: z.string().min(3, r.userMin),
    email: z.string().email(r.emailInvalid),
    password: z.string().min(6, r.passMin),
  });

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    const result = registerSchema.safeParse({
      username,
      email,
      password,
    });

    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }

    setLoading(true);
    try {
      const data = (await registerCustomer({
        username,
        email,
        password,
        phone: "",
      })) as {
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
          email: data.customer?.email || email,
          phone: data.customer?.phone || "",
        },
        data.token
      );
      toast.success(r.success);
      router.replace("/");
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : r.failed);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div dir={dir}>
        <div className="absolute top-4 end-4 z-20">
          <LanguageSwitcher />
        </div>
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 hidden lg:block bg-[#ffedd4]">
            <div className="absolute top-30 lg:top-50 start-10 z-10">
              <h2 className="text-black text-4xl GolosText font-semibold">
                {r.title}
              </h2>

              <div className="flex mt-5 text-2xl items-center text-black">
                <Link
                  href="/Ui-components/Pages/Login"
                  className="font-semibold hover:text-(--second) transition-all duration-300"
                >
                  {r.home}
                </Link>

                <i className="ri-arrow-right-wide-line pt-2 px-2 i18n-flip"></i>

                <span>{r.title}</span>
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
                  {r.createAccount}
                </h2>

                <p className="text-gray-500 text-center mb-6">
                  {r.joinHint}
                </p>

                <form onSubmit={handleRegister}>
                  <div className="space-y-5">
                    <div>
                      <label className="Lufga">{r.username}</label>
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-3 border border-black bg-white hover:border-(--second) rounded-lg focus:outline-none"
                        placeholder={r.usernamePh}
                      />
                    </div>

                    <div>
                      <label className="Lufga">{r.email}</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 border border-black bg-white hover:border-(--second) rounded-lg focus:outline-none"
                        placeholder={r.emailPh}
                      />
                    </div>

                    <div>
                      <label className="Lufga">{r.password}</label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 border border-black bg-white hover:border-(--second) rounded-lg focus:outline-none"
                        placeholder={r.passwordPh}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-2 mt-8">
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn bg-black text-white cursor-pointer GolosText px-4 py-2 rounded-md transition-all duration-300 disabled:opacity-60"
                    >
                      {loading ? r.creating : r.registerBtn}
                    </button>

                    <Link
                      href="/Ui-components/Pages/Login"
                      className="btn bg-black text-white cursor-pointer GolosText px-4 py-2 rounded-md transition-all duration-300"
                    >
                      {t.common.login}
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
