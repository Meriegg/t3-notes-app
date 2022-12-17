import Input from "../Ui/Input";
import Button from "../Ui/Button";
import { useState } from "react";
import { z } from "zod";

const CreateNote = () => {
  const [inputVal, setInputVal] = useState("");
  const [inputError, setInputError] = useState<string | null>(null);

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
        <Button className="mt-2" variant={{ intent: "secondary" }}>
          Create Note!
        </Button>
        <Button
          disabled={!inputVal}
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
