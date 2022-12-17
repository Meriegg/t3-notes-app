import Button from "../Ui/Button";
import { signOut } from "next-auth/react";
import { useState } from "react";

interface Props {
  profilePicture: string;
}

const ProfileDropdown = ({ profilePicture }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center rounded-full text-sm leading-none focus:ring focus:ring-blue-600"
      >
        <img
          src={profilePicture}
          alt="Profile Picture"
          className="h-10 w-10 rounded-full"
        />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-gray-800 p-4 shadow-lg">
          <p className="text-base font-medium tracking-tight">Settings</p>
          <div className="shadow-xs rounded-md py-1">
            <Button
              onClick={() => signOut()}
              variant={{
                intent: "danger",
                rounded: "sm",
              }}
              className={"mt-2 w-full"}
            >
              Sign out!
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
