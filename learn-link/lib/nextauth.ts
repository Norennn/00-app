import bcrypt from "bcrypt";
import { NextAuthOptions, getServerSession } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";

import { db } from "@/lib/prisma";
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/store/user";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        const validatedField = LoginSchema.safeParse(credentials);

        if (!validatedField.success) {
          return null;
        }

        const { email, password } = validatedField.data;

        const user = await getUserByEmail(email);
        if (!user) return null;

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) return user;

        return null;
      },
    }),
  ],
  adapter: PrismaAdapter(db),
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/login",
  },
} satisfies NextAuthOptions;

export const auth = async () => {
  const session = await getServerSession(authOptions);

  return session?.user;
};
