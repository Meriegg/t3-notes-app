import Button from "../Ui/Button";
import timeAgo from "@/utils/timeAgo";
import { useState, useEffect, useRef } from "react";
import { trpc } from "@/utils/trpc";
import { type NoteType } from "@/types";

interface Props {
  note: NoteType;
}

const Note = ({ note }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editInputVal, setEditInputVal] = useState(note.content);
  const ctx = trpc.useContext();
  const deleteNote = trpc.notes.deleteNote.useMutation({
    onSuccess: () => {
      ctx.notes.getNotes.invalidate();
    },
  });
  const updateNote = trpc.notes.updateNote.useMutation({
    onSuccess: () => {
      ctx.notes.getNotes.invalidate();
      setIsEditing(false);
    },
  });

  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      editInputRef.current?.focus();
    }

    setEditInputVal(note.content);
  }, [isEditing]);

  return (
    <div className="flex h-fit w-fit min-w-[400px] max-w-[750px] flex-col gap-4 rounded-md border-2 border-slate-700 bg-slate-800 px-8 pb-4 pt-6">
      {isEditing ? (
        <input
          ref={editInputRef}
          type="text"
          value={editInputVal}
          onChange={(e) => setEditInputVal(e.target.value)}
          className="bg-transparent text-2xl font-extrabold tracking-tight text-white"
          tabIndex={-1}
        />
      ) : (
        <p className="break-all text-2xl font-extrabold tracking-tight">
          {note.content}
        </p>
      )}
      <div className="flex flex-wrap items-center justify-between gap-8">
        <p className="text-sm font-medium text-gray-200">
          Created: {timeAgo(note.createdAt)}
        </p>
        {note.updatedAt ? (
          <p className="text-sm font-medium text-gray-200">
            Updated: {timeAgo(note.updatedAt)}
          </p>
        ) : null}
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={() => setIsEditing(!isEditing)}
          variant={{
            intent: "ghost",
            size: "xsm",
          }}
        >
          {isEditing ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          )}
        </Button>
        <Button
          onClick={() => {
            if (!confirm("Are you sure you want to delete note?")) return;

            deleteNote.mutate({ noteId: note.id });
          }}
          variant={{
            intent: "ghost",
            size: "xsm",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </Button>
        {isEditing ? (
          <Button
            onClick={() =>
              updateNote.mutate({ noteId: note.id, content: editInputVal })
            }
            variant={{
              size: "xsm",
            }}
            disabled={editInputVal === note.content || !editInputVal.trim()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default Note;
