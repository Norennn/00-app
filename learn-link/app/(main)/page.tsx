import { auth } from "@/lib/nextauth";

import { SignOutButton } from "./sign-out";

export default async function Home() {
  const user = await auth();

  return (
    <div className="">
      <div>{user?.name}</div>
      <SignOutButton />
    </div>
  );
}
