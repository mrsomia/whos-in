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
      <main>
        <h1>Loading or not authenticated...</h1>
      </main>
    );
  }
  return (
    <main>
      <h1>signed in </h1>
    </main>
  );
}
