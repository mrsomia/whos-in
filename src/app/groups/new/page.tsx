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
      <h1>This is the new events page</h1>
    </main>
  );
}
