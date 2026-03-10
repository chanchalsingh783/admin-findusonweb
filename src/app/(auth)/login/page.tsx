"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {

  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e:any) => {

    e.preventDefault()

    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password })
    })

    const data = await res.json()

    if (res.ok) {

      localStorage.setItem("token", data.token)

      router.push("/dashboard")

    } else {
      alert(data.message)
    }

  }

  return (

    <div className="flex items-center justify-center h-screen">

      <form
        onSubmit={handleLogin}
        className="p-6 border rounded w-[350px]"
      >

        <h2 className="text-xl mb-4">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-3"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-3"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button className="bg-blue-500 text-white w-full p-2">
          Login
        </button>

      </form>

    </div>

  )

}