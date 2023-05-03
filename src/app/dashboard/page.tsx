"use client";

import { useUser } from "$/hooks/auth";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const user = useUser();
  if (!user) {
    router.push("/signin");
    throw new Error("Should not reach hear as there is no user");
  }

  return (
    <main>
      <h1>signed in as: {user}</h1>
    </main>
  );
}
