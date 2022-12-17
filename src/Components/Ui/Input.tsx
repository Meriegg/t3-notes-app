import { DetailedHTMLProps, InputHTMLAttributes } from "react";

type Props = {
  prefix?: string;
  suffix?: string;
  error?: string | null;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Input = ({ className, prefix, suffix, error, ...props }: Props) => {
  return (
    <div className="flex rounded-md border border-gray-700 px-1 shadow-sm focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
      {prefix ? (
        <div className="flex items-center pl-2 text-gray-400 sm:text-sm">
          {prefix}
        </div>
      ) : null}
      <input
        {...props}
        type="text"
        className="block w-full rounded-md border-0 bg-transparent px-2 py-2 transition-none focus:outline-none focus:ring-0 sm:text-sm"
      />
      {error ? (
        <div className="flex items-center pr-2 text-red-600 sm:text-sm">
          {error}
        </div>
      ) : null}
      {suffix ? (
        <div className="flex items-center pr-2 text-gray-400 sm:text-sm">
          {suffix}
        </div>
      ) : null}
    </div>
  );
};

export default Input;
