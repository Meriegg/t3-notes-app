import Note from "./Note";
import { trpc } from "@/utils/trpc";

const Notes = () => {
  const { data, isLoading } = trpc.notes.getNotes.useQuery();

  if (!data || isLoading) {
    return (
      <div className="mt-4 w-full text-center">
        <p className="text-base font-medium tracking-tight">Loading...</p>
      </div>
    );
  }

  return (
    <div className="mt-10 flex flex-wrap justify-evenly gap-6">
      {data.map((note) => (
        <Note key={note.id} note={note} />
      ))}
    </div>
  );
};

export default Notes;
