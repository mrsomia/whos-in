"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  return (
    <div className="flex h-48 flex-col items-center justify-center gap-8">
      <button onClick={() => signIn("discord")}>Sign in with Discord</button>

      <div>
        <label htmlFor="email">email</label>
        <input
          type="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <button onClick={() => signIn("email", { email })}>
          Sign in with email
        </button>
      </div>
    </div>
  );
}
