"use client";

import Spinner from "@/components/Spinner";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
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
        <div className="flex justify-between ">
          <h1 className="text-xl font-bold md:text-2xl">Groups</h1>
          <Link href="/groups/new">
            <button className="rounded-md bg-orange-600 p-2">
              <Plus />
            </button>
          </Link>
        </div>
        <div>
          {/* Text for when no groups are found */}
          <p>You are not in any groups, join one or create one</p>
        </div>
      </div>
    </main>
  );
}
