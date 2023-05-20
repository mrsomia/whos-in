"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Nav() {
  const { status } = useSession();
  return (
    <nav className="w-100 m-auto my-8">
      <ul className=" w-100 mx-8 my-12 flex list-none justify-between md:mx-auto md:max-w-2xl">
        <li>Home</li>
        {status === "unauthenticated" ? (
          <li>
            <button className="rounded-xl bg-orange-600 p-4 px-10 hover:bg-orange-700">
              <Link href="/signin">Sign In</Link>
            </button>
          </li>
        ) : (
          <li>
            {" "}
            <button onClick={() => signOut()}>Sign out</button>
          </li>
        )}
      </ul>
    </nav>
  );
}
