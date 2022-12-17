import { router } from "../trpc";
import { protectedProcedure } from "../trpc";

export const userRouter = router({
  me: protectedProcedure.query(async ({ ctx }) => {
    return ctx.session.user;
  }),
});
