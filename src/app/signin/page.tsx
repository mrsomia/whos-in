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
    <main className="flex min-h-[65vh] items-center justify-center md:my-16 md:min-h-full">
      <div className="flex flex-col items-center justify-center gap-4">
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

        <hr className="w-100 m-8 h-1 border-t border-white bg-white" />

        <Form.Root>
          <div className="flex flex-col">
            <Form.Field name="email" className="m-4 flex flex-col gap-4">
              <div className="w-100 flex gap-4">
                <Form.Label className="text-lg font-semibold">Email</Form.Label>
                <Form.Message className="text-red-400" match="typeMismatch">
                  Please provide a valid email
                </Form.Message>
              </div>
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
        </Form.Root>
      </div>
    </main>
  );
}
