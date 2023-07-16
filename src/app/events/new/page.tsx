"use client";

import Spinner from "@/components/Spinner";
import * as Form from "@radix-ui/react-form";
import * as Select from "@radix-ui/react-select";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const groups = [
  { id: 1, name: "Poker night" },
  { id: 2, name: "Fifa tournament" },
  { id: 3, name: "Games night" },
];

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
        <div className="mt-4">
          <div className="flex w-full flex-col items-center">
            <Form.Root className="my-4 flex w-4/5 flex-col items-center justify-between space-y-4">
              <Form.Field
                className="flex w-full flex-col space-y-1"
                name="eventName"
              >
                <div className="flex items-baseline justify-between">
                  <Form.Label className="">Name</Form.Label>
                  <Form.Message className="text-red-400" match="valueMissing">
                    Please enter an event name
                  </Form.Message>
                </div>
                <Form.Control asChild>
                  <input
                    type="text"
                    required
                    className="w-full rounded-s p-2 text-black"
                  />
                </Form.Control>
              </Form.Field>

              <Form.Field
                className="flex w-full flex-col space-y-1"
                name="date"
              >
                <div className="flex items-baseline justify-between">
                  <Form.Label>Date</Form.Label>
                  <Form.Message className="text-red-400" match="valueMissing">
                    Please enter an event date
                  </Form.Message>
                </div>
                <Form.Control asChild>
                  <input
                    type="datetime-local"
                    required
                    className="w-full rounded-s p-2 text-black"
                  />
                </Form.Control>
              </Form.Field>

              <Form.Field
                name="repeat"
                className="flex w-full flex-col space-y-2"
                aria-required="true"
              >
                <div className="flex items-baseline justify-between">
                  <Form.Label>Repeat Frequency</Form.Label>
                </div>
                <Form.Control asChild>
                  <Select.Root defaultValue="None">
                    <Select.Trigger
                      className="bg-white py-2 text-black"
                      aria-label="Repeat"
                    >
                      <Select.Value placeholder="None" className="" />
                      <Select.Icon className="text-black"></Select.Icon>
                    </Select.Trigger>

                    <Select.Portal>
                      <Select.Content
                        side="bottom"
                        position="popper"
                        className="w-[262px] rounded-s bg-slate-700 p-2"
                      >
                        <Select.Viewport className="p-2">
                          <Select.Item value="None" className="p-1 py-2">
                            <Select.ItemText>None</Select.ItemText>
                          </Select.Item>
                          <Select.Item value="Daily" className="p-1 py-2">
                            <Select.ItemText>Daily</Select.ItemText>
                          </Select.Item>
                          <Select.Item value="Weekly" className="p-1 py-2">
                            <Select.ItemText>Weekly</Select.ItemText>
                          </Select.Item>
                          <Select.Item
                            value="Every 2 Weeks"
                            className="p-1 py-2"
                          >
                            <Select.ItemText>Every 2 Weeks</Select.ItemText>
                          </Select.Item>
                          <Select.Item value="Monthly" className="p-1 py-2">
                            <Select.ItemText>Monthly</Select.ItemText>
                          </Select.Item>
                        </Select.Viewport>
                      </Select.Content>
                    </Select.Portal>
                  </Select.Root>
                </Form.Control>
              </Form.Field>

              <Form.Field
                name="group"
                className="flex w-full flex-col space-y-2"
                aria-required="true"
              >
                <div className="flex items-baseline justify-between">
                  <Form.Label>Group</Form.Label>
                </div>
                <Form.Control asChild required>
                  <Select.Root>
                    <Select.Trigger
                      className="bg-white py-2 text-black"
                      aria-label="Group"
                    >
                      <Select.Value placeholder="" />
                      <Select.Icon className="text-black"></Select.Icon>
                    </Select.Trigger>

                    <Select.Portal>
                      <Select.Content
                        side="bottom"
                        position="popper"
                        className="w-[262px] rounded-s bg-slate-700 p-2"
                      >
                        <Select.Viewport className="p-2">
                          {groups.map((group) => (
                            <Select.Item
                              key={group.id}
                              value={group.id.toString()}
                              className="p-1 py-2"
                            >
                              <Select.ItemText>{group.name}</Select.ItemText>
                            </Select.Item>
                          ))}
                        </Select.Viewport>
                      </Select.Content>
                    </Select.Portal>
                  </Select.Root>
                </Form.Control>
              </Form.Field>

              <Form.Field
                className="flex w-full flex-col space-y-1"
                name="location"
              >
                <div className="flex items-baseline justify-between">
                  <Form.Label>Location</Form.Label>
                  <Form.Message className="text-red-400" match="valueMissing">
                    Please enter an event location
                  </Form.Message>
                </div>
                <Form.Control asChild>
                  <input
                    type="text"
                    required
                    className="w-full rounded-s p-2 text-black"
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
                  <textarea className="rounded-s p-2 text-black" />
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
