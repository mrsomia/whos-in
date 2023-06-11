"use client";

import {
  Card,
  CardBody,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/Card";
import Spinner from "@/components/Spinner";
import { useSession } from "next-auth/react";
import Link from "next/link";
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
    <main className="flex w-screen flex-col items-center justify-center">
      <h1>signed in as {session.data.user?.email}</h1>
      <Card title="Upcoming events">
        <CardHeader>
          <Link href="/events">
            <CardTitle>Upcoming events</CardTitle>
          </Link>
          <CardDescription>Lorem psum dolor sit amet.</CardDescription>
        </CardHeader>
        <CardBody>
          <div>
            <h5>Event title</h5>
          </div>
          <div>
            <h5>Event title</h5>
          </div>
        </CardBody>
      </Card>
      <Card title="Upcoming events">
        <CardHeader>
          <Link href="/groups">
            <CardTitle>Groups</CardTitle>
          </Link>
        </CardHeader>
        <CardBody>
          <div>
            <h5>No Groups found</h5>
          </div>
        </CardBody>
      </Card>
    </main>
  );
}
