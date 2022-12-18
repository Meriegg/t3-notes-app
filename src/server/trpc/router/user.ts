import { router } from "../trpc";
import { protectedProcedure } from "../trpc";
import { z } from "zod";

export const userRouter = router({
  me: protectedProcedure.query(async ({ ctx }) => {
    return ctx.session.user;
  }),
  completeSignup: protectedProcedure
    .input(
      z.object({
        email: z.string().email(),
        username: z.string(),
        typeOfUser: z.enum(["NOT_SPECIFIED", "PERSONAL", "COMPANY"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma, session } = ctx;

      const updatedUser = await prisma.user.update({
        where: {
          id: session.user.id,
        },
        data: {
          ...input,
          fullSignupCompleted: true,
        },
      });

      return updatedUser;
    }),
});
