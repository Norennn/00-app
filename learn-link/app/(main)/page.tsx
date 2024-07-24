import { auth } from "@/lib/nextauth";

import { Header } from "@/components/navigation/Header";

import { SignOutButton } from "../sign-out";

export default async function Home() {
  const user = await auth();

  return (
    <div className="">
      <Header />
      <div>{user?.name}</div>
      <SignOutButton />
    </div>
  );
}
