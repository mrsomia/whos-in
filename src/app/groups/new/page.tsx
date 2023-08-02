"use client";

import Spinner from "@/components/Spinner";
import * as Form from "@radix-ui/react-form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export default function Page() {
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();
  const session = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/signin");
    },
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      console.log("Sending payload");
      const r = await fetch("/api/group", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          groupName,
          description,
        }),
      });
    } catch (e) {
      console.error(`Error creating new group:\n${e}`);
    }
  };

  if (session.status === "loading") {
    return <Spinner />;
  }

  return (
    <main className="flex flex-col items-center">
      <div className="m-4 w-[360px] rounded-lg border border-gray-500 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold md:text-2xl">New Group</h1>
        </div>
        <div className="mt-4">
          <div className="flex w-full flex-col items-center">
            <Form.Root
              className="my-4 flex w-4/5 flex-col items-center justify-between space-y-4"
              onSubmit={(e) => handleSubmit(e)}
            >
              <Form.Field
                className="flex w-full flex-col space-y-1"
                name="groupName"
              >
                <div className="flex items-baseline justify-between">
                  <Form.Label className="">Name</Form.Label>
                  <Form.Message className="text-red-400" match="valueMissing">
                    Please enter a group name
                  </Form.Message>
                </div>
                <Form.Control asChild>
                  <input
                    type="text"
                    required
                    className="w-full rounded-s p-2 text-black"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                  />
                </Form.Control>
              </Form.Field>

              <Form.Field
                className="flex w-full flex-col space-y-1"
                name="description"
              >
                <div className="flex items-baseline justify-between">
                  <Form.Label>Description</Form.Label>
                </div>
                <Form.Control asChild>
                  <textarea
                    className="rounded-s p-2 text-black"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.Control>
              </Form.Field>

              <div className="pt-6">
                <Form.Submit asChild>
                  <button className="rounded-xl bg-orange-500 px-6 py-2">
                    Submit
                  </button>
                </Form.Submit>
              </div>
            </Form.Root>
          </div>
        </div>
      </div>
    </main>
  );
}
