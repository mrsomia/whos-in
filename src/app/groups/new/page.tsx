import NewGroupForm from "@/components/NewGroupForm";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
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
          <h1 className="text-xl font-bold md:text-2xl">New Group</h1>
        </div>
        <div className="mt-4">
          <div className="flex w-full flex-col items-center">
            <NewGroupForm />
          </div>
        </div>
      </div>
    </main>
  );
}
