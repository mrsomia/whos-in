"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/signin");
    },
  });

  if (status === "loading") {
    return (
      <main className="w-100 flex justify-center">
        <h1>Loading</h1>
      </main>
    );
  }
  return (
    <main className="w-100 flex justify-center">
      <h1>signed in </h1>
    </main>
  );
}
