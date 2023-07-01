"use client";

import Spinner from "@/components/Spinner";
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
          <form>
            <div>
              <label htmlFor="eventName">Name</label>
              <input id="eventName" type="text" />
            </div>
            <div>
              <label htmlFor="date">date</label>
              <input id="date" type="date" />
            </div>
            <div>
              {/* Not sure if this is needed */}
              <label htmlFor="time">time</label>
              <input id="time" type="time" />
            </div>
            <div>
              <label htmlFor="location">location</label>
              <input id="location" type="text" />
            </div>
            <div>
              <label htmlFor="description">description</label>
              <textarea id="description" />
            </div>
            <button>Submit</button>
          </form>
        </div>
      </div>
    </main>
  );
}
