"use client";

import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import DiscordLogo from "../../../public/discord-mark-white.png";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const { status } = useSession();
  if (status === "authenticated") {
    router.push("/dashboard");
  }
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <button
        className="min-w-60 flex items-center justify-center gap-4 rounded-md bg-[#5865F2] p-4 px-8"
        onClick={() => signIn("discord")}
      >
        <div className="">
          <Image src={DiscordLogo} height={38} width={36} alt="discord logo" />
        </div>
        <div>
          <span className="font-semibold">Sign in with Discord</span>
        </div>
      </button>

      <div className="h-1 border-gray-100"></div>

      <div className="flex flex-col text-center">
        <label htmlFor="email" className="text-lg font-bold">
          Email
        </label>
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
