import Button from "./Button";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { clsx } from "clsx";
import { useState } from "react";

interface Props {
  options: { key: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const Select = ({ options, disabled = false, value, onChange }: Props) => {
  const [isOpen, setOpen] = useState(false);
  const [parentRef] = useAutoAnimate<HTMLDivElement>();

  return (
    <div ref={parentRef} className="relative w-full">
      <button
        onClick={() => setOpen(!isOpen)}
        disabled={disabled}
        className={clsx(
          "flex w-full cursor-pointer items-center justify-between rounded-md border border-gray-700 p-2 pl-4 shadow-sm focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-70",
          !value.trim() && "text-gray-400",
          isOpen && "!text-white"
        )}
      >
        {value || "Select An Option"}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={clsx(
            "h-6 w-6 stroke-white",
            !value.trim() && "!stroke-gray-400",
            isOpen && "rotate-[180deg] transform !stroke-white"
          )}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 15.75l7.5-7.5 7.5 7.5"
          />
        </svg>
      </button>

      {isOpen ? (
        <div className="absolute top-[120%] z-10 flex w-full flex-col gap-2 rounded-md bg-gray-800 px-2 py-2">
          {options.map((option, optionIdx) => (
            <Button
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              variant={{
                intent: "ghost",
                size: "xsm",
                textPos: "left",
              }}
              key={optionIdx}
              value={option.value}
            >
              {option.key}
            </Button>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Select;
