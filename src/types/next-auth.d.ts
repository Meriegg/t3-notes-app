import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      fullSignupCompleted: boolean;
      username?: string;
      typeOfUser: "NOT_SPECIFIED" | "COMPANY" | "PERSONAL";
    } & DefaultSession["user"];
  }
}
