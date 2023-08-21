"use client";

import * as Form from "@radix-ui/react-form";
import { useState, type FormEvent } from "react";

export default function NewGroupForm() {
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
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
  return (
    <Form.Root
      className="my-4 flex w-4/5 flex-col items-center justify-between space-y-4"
      onSubmit={(e) => handleSubmit(e)}
    >
      <Form.Field className="flex w-full flex-col space-y-1" name="groupName">
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

      <Form.Field className="flex w-full flex-col space-y-1" name="description">
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
          <button className="rounded-xl bg-orange-500 px-6 py-2">Submit</button>
        </Form.Submit>
      </div>
    </Form.Root>
  );
}
