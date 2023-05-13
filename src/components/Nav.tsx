"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Nav() {
  const session = useSession();
  return (
    <nav className="m-auto my-8 w-max">
      <ul className="flex w-max max-w-6xl list-none justify-between gap-8">
        <li>Home</li>
        {session ? (
          <li>
            {" "}
            <button onClick={() => signOut()}>Sign out</button>
          </li>
        ) : (
          <li>
            <Link href="/signin">Sign In</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
