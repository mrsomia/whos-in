"use client";

import DiscordLogo from "@/../public/discord-mark-white.png";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function OAuthButtons() {
  return (
    <>
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
    </>
  );
}
