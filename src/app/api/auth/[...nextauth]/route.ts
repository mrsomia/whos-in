import { authOptions } from "$/lib/auth";
import NextAuth from "next-auth/next";

const handler = NextAuth(authOptions);

// export async function GET(request: Request) {
//   console.log(request.url);
//   console.log(request);
//   return await handler(request);
// }

// export async function POST(request: Request) {
//   console.log(request.url);
//   console.log(request);
//   return await handler(request);
// }

export { handler as GET, handler as POST };
