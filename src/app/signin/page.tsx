"use client";

import { signIn } from "next-auth/react";

export default function SignIn() {
  return (
    <div className="flex gap-8 h-48 flex-col items-center justify-center">
      <button onClick={() => signIn("discord")}>Sign in with Discord</button>
    </div>
  );
}
