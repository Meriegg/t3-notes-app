import { router } from "../trpc";
import { notesRouter } from "./notes";
import { userRouter } from "./user";

export const appRouter = router({
  user: userRouter,
  notes: notesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
