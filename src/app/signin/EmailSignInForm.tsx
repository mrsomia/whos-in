"use client";
import * as Form from "@radix-ui/react-form";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function EmailSignInForm() {
  const [email, setEmail] = useState("");
  return (
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
  );
}
