import { authOptions } from "@/lib/auth";
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
        <div className="m-2 flex items-center justify-between">
          <h1 className="text-xl font-bold md:text-2xl">Groups</h1>
          <Link href="/groups/new">
            <button className="rounded-md bg-orange-600 p-2">
              <Plus />
            </button>
          </Link>
        </div>
        <div className="">
          {/* Text for when no groups are found */}
          <p>You are not in any groups, join one or create one</p>
        </div>
      </div>
    </main>
  );
}
