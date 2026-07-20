"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import toast, { Toaster } from "react-hot-toast";

import loginImg from "@/public/login-img.webp";
import { registerCustomer } from "../../api/auth";

const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Regester() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

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
      const data = await registerCustomer({ username, email, password });
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
      toast.success("Account created — welcome!");
      router.replace("/");
    } catch (error: unknown) {
      toast.error(
        error instanceof Error ? error.message : "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div>
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 hidden lg:block bg-[#ffedd4]">
            <div className="absolute top-30 lg:top-50 left-10 z-10">
              <h2 className="text-black text-4xl GolosText font-semibold">
                Registration
              </h2>

              <div className="flex mt-5 text-2xl items-center text-black">
                <Link
                  href="/Ui-components/Pages/Login"
                  className="font-semibold hover:text-(--second) transition-all duration-300"
                >
                  Home
                </Link>

                <i className="ri-arrow-right-wide-line pt-2 px-2"></i>

                <span>Registration</span>
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
                  Create Account
                </h2>

                <p className="text-gray-500 text-center mb-6">
                  Join FashiQue and start shopping
                </p>

                <form onSubmit={handleRegister}>
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
                      <label className="Lufga">Email</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 border border-black bg-white hover:border-(--second) rounded-lg focus:outline-none"
                        placeholder="Enter Email"
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

                  <div className="flex items-center justify-center gap-2 mt-8">
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn bg-black text-white cursor-pointer GolosText px-4 py-2 rounded-md transition-all duration-300 disabled:opacity-60"
                    >
                      {loading ? "Creating..." : "REGISTER"}
                    </button>

                    <Link
                      href="/Ui-components/Pages/Login"
                      className="btn bg-black text-white cursor-pointer GolosText px-4 py-2 rounded-md transition-all duration-300"
                    >
                      Login
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
