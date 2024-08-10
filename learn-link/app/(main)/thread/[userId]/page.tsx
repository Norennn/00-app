import React from "react";
import { redirect } from "next/navigation";

import { auth } from "@/lib/nextauth";
import { getSafeUserById } from "@/store/user";
import { getOrCreateThread } from "@/store/thread";
import { LOGIN_REQUIRE_REDIRECT, LOGIN_SUCCESS_REDIRECT } from "@/routes";

type MessagePageProps = {
  params: { userId: string };
};

const MessagePage = async ({ params }: MessagePageProps) => {
  const currentUser = await auth();
  if (!currentUser) {
    redirect(LOGIN_REQUIRE_REDIRECT);
  }

  const otherUserId = params.userId;

  const otherUser = await getSafeUserById(otherUserId);
  if (!otherUser) {
    redirect(LOGIN_SUCCESS_REDIRECT);
  }

  const thread = await getOrCreateThread(currentUser.id, otherUser.id);

  return (
    <div className="flex flex-col h-full">
      <div className="p-8">
        <div>currentUser: {currentUser.name}</div>
        <div>otherUser: {otherUser.name}</div>
        <div>thread: {thread.id}</div>
      </div>
    </div>
  );
};

export default MessagePage;
