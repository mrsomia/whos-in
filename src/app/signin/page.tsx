"use client";

import * as Form from "@radix-ui/react-form";
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
    <Form.Root>
      <div className="flex flex-col items-center justify-center gap-8">
        <button
          className="min-w-60 flex items-center justify-center gap-4 rounded-md bg-[#5865F2] p-4 px-8"
          onClick={() => signIn("discord")}
        >
          <div className="">
            <Image
              src={DiscordLogo}
              height={38}
              width={36}
              alt="discord logo"
            />
          </div>
          <div>
            <span className="font-semibold">Sign in with Discord</span>
          </div>
        </button>

        <div className="h-1 border-gray-100"></div>

        <div className="flex flex-col">
          <Form.Field name="email" className="m-4 flex flex-col gap-4">
            <Form.Label className="text-lg font-bold">Email</Form.Label>
            <Form.Message className="text-red-400" match="typeMismatch">
              Please provide a valid email
            </Form.Message>
            <Form.Control asChild>
              <input
                type="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="w-64 p-3 px-6 text-center text-black"
              />
            </Form.Control>
          </Form.Field>

          <Form.Submit asChild>
            <button
              className="m-4 rounded-xl bg-orange-600 p-2 hover:bg-orange-700"
              onClick={() => signIn("email", { email })}
            >
              Sign in with email
            </button>
          </Form.Submit>
        </div>
      </div>
    </Form.Root>
  );
}
