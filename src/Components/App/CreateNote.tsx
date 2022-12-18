import Input from "../Ui/Input";
import Button from "../Ui/Button";
import { trpc } from "@/utils/trpc";
import { useState } from "react";

const CreateNote = () => {
  const ctx = trpc.useContext();
  const createNote = trpc.notes.createNote.useMutation({
    onSuccess: () => {
      ctx.notes.getNotes.invalidate();
    },
  });
  const [inputVal, setInputVal] = useState("");
  const [inputError, setInputError] = useState<string | null>(null);

  const submit = () => {
    if (!inputVal.trim()) {
      setInputError("This must not be empty");
      return;
    }

    createNote.mutate({ content: inputVal });
    setInputVal("");
    setInputError(null);
  };

  return (
    <div
      className="rounded-md bg-gray-800 p-4"
      style={{
        width: "min(650px, 100%)",
      }}
    >
      <Input
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
        type="text"
        placeholder="placeholder"
        error={inputError}
      />
      <div className="mt-2 flex w-full justify-between">
        <Button
          onClick={() => submit()}
          className="mt-2"
          variant={{ intent: "secondary" }}
        >
          Create Note!
        </Button>
        <Button
          disabled={!inputVal}
          onClick={() => setInputVal("")}
          variant={{
            intent: "danger",
          }}
        >
          Clear input
        </Button>
      </div>
    </div>
  );
};

export default CreateNote;
