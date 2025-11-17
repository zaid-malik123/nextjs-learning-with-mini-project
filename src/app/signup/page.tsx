"use client"
import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import axios from "axios"
import { useRouter } from "next/navigation";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleRegister = async (e:React.FormEvent)=>{
  e.preventDefault()  
  try {
    const res = await axios.post("/api/auth/register",{userName, email, password})
    console.log(res)
  } catch (error) {
    console.log(error)
  }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-50 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-2">Create your account</h2>
          <p className="text-sm text-gray-500 mb-6">Join us — just a few details and you’re in.</p>

          <form onSubmit={(e)=> handleRegister(e)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="username">Username</label>
              <input
                onChange={(e)=> setUserName(e.target.value)}
                value={userName}
                id="username"
                name="username"
                type="text"
                placeholder="Your username"
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email</label>
              <input
                onChange={(e)=> setEmail(e.target.value)}
                value={email}
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-gray-700" htmlFor="password">Password</label>
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="text-xs text-indigo-600 hover:underline focus:outline-none"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              <input
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition shadow-sm"
            >
              Sign up
            </button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <button
              type="button"
              className="w-full inline-flex items-center justify-center gap-3 px-4 py-2 rounded-lg border border-gray-200 bg-white hover:shadow-sm focus:outline-none transition"
            >
              <FaGoogle className="h-5 w-5" />
              <span className="text-sm font-medium text-gray-700">Continue with Google</span>
            </button>

            <p className="text-xs text-gray-500 mt-3 text-center">By creating an account you agree to our <span className="text-indigo-600">Terms</span> and <span className="text-indigo-600">Privacy Policy</span>.</p>
          </form>
        </div>

        <div className="bg-gray-50 p-4 text-center text-sm text-gray-600">Already have an account? <a onClick={()=> router.push("/login")} className="text-indigo-600 font-medium cursor-pointer">Sign in</a></div>
      </div>
    </div>
  );
}
