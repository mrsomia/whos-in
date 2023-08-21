import Event from "@/components/events";
import { authOptions } from "@/lib/auth";
import { events } from "@/mocks/events";
import { Plus } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/signin");
  }

  return (
    <main className="flex flex-col items-center">
      <div className="m-4 w-[360px] rounded-lg border border-gray-500 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold md:text-2xl">Events</h1>
          <Link href="/events/new">
            <button className="rounded-md bg-orange-600 p-2">
              <Plus />
            </button>
          </Link>
        </div>
        <div className="flex flex-col space-y-2">
          {/* Text for when no new events are present */}
          {events ? (
            events.map((event) => <Event key={event.id} event={event} />)
          ) : (
            <p>No new events</p>
          )}
        </div>
      </div>
    </main>
  );
}
