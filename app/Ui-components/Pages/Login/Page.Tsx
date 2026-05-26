"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import toast, { Toaster } from "react-hot-toast";

import loginImg from "@/public/login-img.webp";
import { login } from "../../api/auth";

const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Login() {
  const router = useRouter();

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
      const users = JSON.parse(localStorage.getItem("users") || "[]");

      const user = users.find(
        (u: any) => u.username === username && u.password === password
      );

      if (user) {
        localStorage.removeItem("cart");
        localStorage.removeItem("wishlist");
        localStorage.removeItem("orders");
        localStorage.removeItem("sessionId");

        localStorage.setItem("loggedUser", JSON.stringify(user));

        toast.success("User Login Success");

        setTimeout(() => {
          router.push("/");
        }, 1200);

        return;
      }

      const data = await login(username, password);

      localStorage.setItem("token", data.token);

      toast.success("Admin Login Success");

      setTimeout(() => {
        router.push("/admin");
      }, 1200);
    } catch (error: any) {
      toast.error(error.message);
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
            Preparing your experience...
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
      <div>
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 hidden lg:block bg-[#ffedd4]">
            <div className="absolute top-30 lg:top-50 left-10 z-10">
              <h2 className="text-black text-4xl GolosText font-semibold">
                Login
              </h2>

              <div className="flex mt-5 text-2xl items-center text-black">
                <Link
                  href="/"
                  className="font-semibold hover:text-(--second) transition-all duration-300"
                >
                  Home
                </Link>

                <i className="ri-arrow-right-wide-line pt-2 px-2"></i>

                <span>Login</span>
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
                  Login
                </h2>

                <p className="text-gray-500 text-center mb-6">
                  welcome please login to your account
                </p>

                <form onSubmit={handleLogin}>
                  <div className="space-y-5">
                    <div>
                      <label className="Lufga">Username</label>

                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-3 border border-black bg-white hover:border-(--second) rounded-lg focus:outline-none"
                        placeholder="Enter Username"
                      />
                    </div>

                    <div>
                      <label className="Lufga">Password</label>

                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 border border-black bg-white hover:border-(--second) rounded-lg focus:outline-none"
                        placeholder="Enter Password"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between mb-8">
                    <label className="flex items-center gap-1 cursor-pointer mt-5">
                      <input type="checkbox" className="mt-1" />
                      <span className="text-gray-400">Remember me</span>
                    </label>
                  </div>

                  <div className="flex items-center justify-center gap-2 mt-5">
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn bg-black text-white cursor-pointer GolosText px-4 py-2 rounded-md transition-all duration-300 disabled:opacity-60"
                    >
                      SIGN IN
                    </button>

                    <Link
                      href="/Ui-components/Pages/Regester"
                      className="btn bg-black text-white cursor-pointer GolosText px-4 py-2 rounded-md transition-all duration-300"
                    >
                      Register
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