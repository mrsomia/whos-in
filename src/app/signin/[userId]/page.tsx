// eslint-disable-next-line prettier/prettier
"use client"

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Page({ params }: { params: { userId: string } }) {
  const router = useRouter();
  const [code, setCode] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    async function signIn() {
      try {
        const r = await fetch(`/api/signin/${params.userId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: params.userId, code }),
        });

        if (r.status < 300) {
          // const res = await r.json();
          console.log("sign in successful");
          console.log(r);
        } else {
          console.log(r);
          console.log(r.json());
          throw new Error("Fetch return a bad status");
        }
      } catch (e) {
        console.error("sign in page fetch call failed");
        console.error(e);
      }
    }
    signIn();
  };

  return (
    <main className="flex flex-col items-center">
      <h2 className="p-8 text-4xl">Sign in</h2>
      <p className="p-4">Sign in for {params.userId}</p>
      <form
        className="flex flex-col items-center justify-center gap-2"
        onSubmit={(e) => handleSubmit(e)}
      >
        <label htmlFor="code">Enter Code:</label>
        <input
          className="border-2 border-black"
          type="text"
          maxLength={6}
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button>Submit</button>
      </form>
    </main>
  );
}
