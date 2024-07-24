"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";

type AuthContextProps = {
  children: React.ReactNode;
};

export const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
