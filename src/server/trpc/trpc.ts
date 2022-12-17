import { type Context } from "./context";
import { initTRPC, TRPCError } from "@trpc/server";
import { type User } from "next-auth";
import { type AdapterUser } from "next-auth/adapters";
import superjson from "superjson";

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

const isAuthed = t.middleware(async ({ next, ctx }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
    });
  }

  const dbUser = await ctx.prisma.user.findUnique({
    where: {
      email: ctx.session.user.email || "",
    },
  });
  if (!dbUser || !dbUser?.id) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "We were not able to find your data!",
    });
  }

  return next({
    ctx: {
      // Infers the `session` as non-nullable
      session: ctx.session,
      userId: dbUser.id,
    },
  });
});

export const middleware = t.middleware;
export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);
