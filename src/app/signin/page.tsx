"use client"

import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { z } from 'zod'


export default function Page() {
  const router = useRouter()
  const [email, setEmail] = useState("")

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
   async function signIn() {
      try {
        const r = await fetch("/api/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        })

        if (r.status < 300) {
          const res =  await r.json()
          const id = z.string().parse(res.userId)
          router.push(`/signin/${id}`)
        } else {
          console.log(r)
          console.log(r.json())
          throw new Error("Fetch return a bad status")
        }
      } catch (e) {
        console.error("sign in page fetch call failed")
        console.error(e)
      }
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

