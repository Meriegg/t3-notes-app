import { router } from "../trpc";
import { protectedProcedure } from "../trpc";
import { z } from "zod";

export const notesRouter = router({
  getNotes: protectedProcedure.query(async ({ ctx }) => {
    const notes = ctx.prisma.note.findMany({
      where: {
        userId: ctx.userId,
      },
    });

    return notes;
  }),
  createNote: protectedProcedure
    .input(z.object({ content: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { prisma, userId } = ctx;

      const newNote = prisma.note.create({
        data: {
          userId,
          content: input.content,
        },
      });

      return newNote;
    }),
  updateNote: protectedProcedure
    .input(z.object({ content: z.string(), noteId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;

      const updatedNote = prisma.note.update({
        data: {
          content: input.content,
          updatedAt: new Date(),
        },
        where: {
          id: input.noteId,
        },
      });

      return updatedNote;
    }),
  deleteNote: protectedProcedure
    .input(z.object({ noteId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;

      const deletedNote = prisma.note.delete({
        where: {
          id: input.noteId,
        },
      });

      return deletedNote;
    }),
});
