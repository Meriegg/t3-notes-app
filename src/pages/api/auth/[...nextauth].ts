import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { prisma } from "@/server/db/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type AdapterUser } from "next-auth/adapters";
import { type AuthOptions, type User } from "next-auth";

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
    // ...add more providers here
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/auth/signIn",
    error: "/auth/signIn",
  },
  callbacks: {
    session: async ({ session, user, token }) => {
      if (!session.user) {
        return session;
      }

      (session.user as (User | AdapterUser) & { id: string }).id = user.id;
      return session;
    },
  },
};

export default NextAuth(authOptions);
