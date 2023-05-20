"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const { status } = useSession();
  if (status === "authenticated") {
    router.push("/dashboard");
  }
  return (
    <div className="flex h-48 flex-col items-center justify-center gap-8">
      <button onClick={() => signIn("discord")}>Sign in with Discord</button>

      <div className="flex flex-col gap-4">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="m-4 w-64 p-3 px-6 text-center text-black"
        />
        <button onClick={() => signIn("email", { email })}>
          Sign in with email
        </button>
      </div>
    </div>
  );
}
