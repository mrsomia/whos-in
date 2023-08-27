import Provider from "@/components/provider";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

type SignInLayoutProps = {
  children: JSX.Element;
};

export default async function layout({ children }: SignInLayoutProps) {
  const session = await getServerSession(authOptions);
  return <Provider session={session}>{children}</Provider>;
}
