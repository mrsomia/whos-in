"use client"

import { useState } from 'react'


export default function Page() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
   async function signIn() {
      const r = await fetch("/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })
      console.log(r)
      console.log({ body: await r.json() })
    }
    signIn()
  }

  
  return (
    <main className="w-screen min-h-screen flex justify-center items-center">
      <div className="h-max flex flex-col justify-center">
        <form className="flex flex-col justify-center "
          onSubmit={(e) => handleSubmit(e)}
          >
          <label htmlFor="email" />
          <input className="border-black border-2" type="email" name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button>Sign In</button>
        </form>
      </div>

    </main>
  )
}

