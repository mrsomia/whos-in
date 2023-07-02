"use client";

import Spinner from "@/components/Spinner";
import * as Form from "@radix-ui/react-form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const session = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/signin");
    },
  });

  if (session.status === "loading") {
    return <Spinner />;
  }

  return (
    <main className="flex flex-col items-center">
      <div className="m-4 w-[360px] rounded-lg border border-gray-500 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold md:text-2xl">New Event</h1>
        </div>
        <div>
          <Form.Root className="my-4 flex flex-col items-center justify-between">
            <Form.Field className="min-w-full" name="eventName">
              <div className="flex items-baseline justify-between">
                <Form.Label className="">Name</Form.Label>
                <Form.Message className="" match="valueMissing">
                  Please enter an event name
                </Form.Message>
              </div>
              <Form.Control asChild>
                <input type="text" />
              </Form.Control>
            </Form.Field>
            <Form.Field className="" name="date">
              <div className="flex items-baseline justify-between">
                <Form.Label>Date</Form.Label>
                <Form.Message className="" match="valueMissing">
                  Please enter an event date
                </Form.Message>
              </div>
              <Form.Control asChild>
                <input type="datetime-local" />
              </Form.Control>
            </Form.Field>
            <Form.Field className="" name="location">
              <div className="flex items-baseline justify-between">
                <Form.Label>Location</Form.Label>
                <Form.Message match="valueMissing">
                  Please enter an event location
                </Form.Message>
              </div>
              <Form.Control asChild>
                <input type="text" />
              </Form.Control>
            </Form.Field>
            <Form.Field name="description">
              <div className="flex items-baseline justify-between">
                <Form.Label>Description</Form.Label>
              </div>
              <Form.Control asChild>
                <textarea />
              </Form.Control>
            </Form.Field>
            <Form.Submit asChild>
              <button className="mt-6 rounded-xl bg-orange-500 p-4">
                Submit
              </button>
            </Form.Submit>
          </Form.Root>
        </div>
      </div>
    </main>
  );
}
