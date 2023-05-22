"use client";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { Home, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Nav() {
  const { status } = useSession();
  return (
    <NavigationMenu.Root className="w-100 m-auto my-8">
      <NavigationMenu.List className=" w-100 mx-8 my-12 flex list-none justify-between md:mx-auto md:max-w-2xl">
        <NavigationMenu.Item>
          <NavigationMenu.Link asChild>
            <Link href={status === "unauthenticated" ? "/" : "/dashboard"}>
              <Home />
            </Link>
          </NavigationMenu.Link>
        </NavigationMenu.Item>
        {status === "unauthenticated" ? (
          <NavigationMenu.Item className="rounded-xl bg-orange-600 p-2 px-6 hover:bg-orange-700">
            <NavigationMenu.Link asChild>
              <Link href="/signin">Sign In</Link>
            </NavigationMenu.Link>
          </NavigationMenu.Item>
        ) : (
          <NavigationMenu.Item>
            <LogOut
              onClick={() => signOut()}
              // className="rounded-xl border-2 border-orange-600 p-2 px-6 hover:border-orange-700"
              color="white"
            />
          </NavigationMenu.Item>
        )}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}
