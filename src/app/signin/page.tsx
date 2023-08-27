import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import EmailSignInForm from "./EmailSignInForm";
import DiscordButton from "./OAuthButtons";

export default async function SignIn() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-[65vh] items-center justify-center md:my-16 md:min-h-full">
      <div className="flex flex-col items-center justify-center gap-4">
        <DiscordButton />
        <hr className="w-100 m-8 h-1 border-t border-white bg-white" />

        <EmailSignInForm />
      </div>
    </main>
  );
}
