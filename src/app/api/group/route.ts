import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function GET(request: Request) {
  return new Response("Hello, Next.js!");
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  console.log(session);
  let body;
  getServerSession(authOptions);
  try {
    body = await request.json();
    console.log(body);
  } catch (e) {
    console.error(`Unable to parse request json:\n${e}`);
  }
  return new Response("This worked");
}
