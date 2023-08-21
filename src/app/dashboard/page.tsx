import {
  Card,
  CardBody,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/Card";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/signin");
  }
  return (
    <main className="flex w-screen flex-col items-center justify-center">
      <h1>signed in as {session.user?.email}</h1>
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
