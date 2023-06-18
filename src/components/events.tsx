"use client";

import { z } from "zod";

const eventSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  location: z.string(),
  date: z.date(),
});

export type EventSchema = z.infer<typeof eventSchema>;

export default function Event({ event }: { event: EventSchema }) {
  return (
    <div className="my-4">
      <div className="w-100 flex justify-between py-2">
        <div>
          <h4 className="inline font-semibold">{event.title}</h4>
          <p>{event.location}</p>
        </div>
        <span>{event.date.toLocaleDateString()}</span>
      </div>
      <p>{event.description}</p>
    </div>
  );
}
