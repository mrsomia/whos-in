import Group from "@/components/Group";
import { getGroupsForSession } from "@/db/groups";
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

  const groups = await getGroupsForSession(session);

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
          {groups.length > 0 ? (
            groups.map((group) => <Group group={group} key={group.id} />)
          ) : (
            <p>You are not in any groups, join one or create one</p>
          )}
        </div>
      </div>
    </main>
  );
}
