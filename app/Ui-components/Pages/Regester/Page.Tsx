"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import toast, { Toaster } from "react-hot-toast";

import loginImg from "@/public/login-img.webp";

const registerSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters"),

  email: z
    .string()
    .email("Invalid email address"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

export default function Regester() {

  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleRegister(e: React.FormEvent) {

    e.preventDefault();

    // ZOD VALIDATION
    const result = registerSchema.safeParse({
      username,
      email,
      password,
    });

    if (!result.success) {

      toast.error(result.error.issues[0].message);

      return;
    }

    // save user
 const users = JSON.parse(
  localStorage.getItem("users") || "[]"
);

users.push({
  username,
  email,
  password,
});

localStorage.setItem(
  "users",
  JSON.stringify(users)
);

    toast.success("Account Created Successfully");

    router.push("/Ui-components/Pages/Login");
  }

  return (
    <>
      <div>

        <div className="flex flex-col lg:flex-row">

          {/* LEFT SIDE */}
          <div className="w-full lg:w-1/2 hidden lg:block bg-[#ffedd4]">

            <div className="absolute top-30 lg:top-50 left-10 z-10">

              <h2 className="text-black text-4xl GolosText font-semibold">
                Registration
              </h2>

              <div className="flex mt-5 text-2xl items-center text-black">

                <Link
                  href="/"
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

          {/* RIGHT SIDE */}
          <div className="w-full lg:w-1/2">

            <div className="flex items-center justify-center px-[8%] lg:px-[16%] py-15 min-h-screen">

              <div className="border w-[90%] max-w-xl p-10 border-black rounded-2xl">

                <h2 className="text-3xl Lufga font-bold text-center mb-3">
                  Registration Now
                </h2>

                <p className="text-gray-500 text-center mb-6">
                  Welcome please registration to your account
                </p>

                <form onSubmit={handleRegister}>

                  <div className="space-y-5">

                    {/* USERNAME */}
                    <div>

                      <label className="Lufga">
                        Username
                      </label>

                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-3 border border-black bg-white hover:border-(--second) rounded-lg focus:outline-none"
                        placeholder="Username"
                      />

                    </div>

                    {/* EMAIL */}
                    <div>

                      <label className="Lufga">
                        Email Address
                      </label>

                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 border border-black bg-white hover:border-(--second) rounded-lg focus:outline-none"
                        placeholder="Enter the Email Address"
                      />

                    </div>

                    {/* PASSWORD */}
                    <div>

                      <label className="Lufga">
                        Password
                      </label>

                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 border border-black bg-white hover:border-(--second) rounded-lg focus:outline-none"
                        placeholder="Enter the Password"
                      />

                    </div>

                  </div>

                  {/* REMEMBER */}
                  <div className="flex justify-between mb-8">

                    <label className="flex items-center gap-1 cursor-pointer mt-5">

                      <input type="checkbox" className="mt-1" />

                      <span className="text-gray-300">
                        Remember me
                      </span>

                    </label>

                  </div>

                  {/* BUTTONS */}
                  <div className="flex items-center justify-center gap-2 mt-5">

                    <button
                      type="submit"
                      className="btn bg-black text-white cursor-pointer GolosText px-4 py-2 rounded-md transition-all duration-300"
                    >
                      Register
                    </button>

                    <Link
                      href="/Ui-components/Pages/Login"
                      className="btn bg-black text-white cursor-pointer GolosText px-4 py-2 rounded-md transition-all duration-300"
                    >
                      SIGN IN
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