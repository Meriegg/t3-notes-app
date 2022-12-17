import { trpc } from "@/utils/trpc";

const Notes = () => {
  const { data, isLoading } = trpc.notes.getNotes.useQuery();

  if (isLoading) {
    return (
      <div className="mt-4 w-full text-center">
        <p className="text-base font-medium tracking-tight">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <pre>{JSON.stringify(data, null, 4)}</pre>
    </div>
  );
};

export default Notes;
