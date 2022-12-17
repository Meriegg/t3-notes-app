import ProfileDropdown from "./Account/ProfileDropdown";
import Link from "next/link";
import Button from "./Ui/Button";
import { useSession } from "next-auth/react";

const Header = () => {
  const { data } = useSession();

  return (
    <header className="flex items-center justify-between px-8 py-12 text-white xsm:px-4">
      <h1 className="ml-2 text-2xl font-extrabold tracking-tight">
        Hello {data?.user?.name || data?.user?.email || null}!
      </h1>
      {data ? (
        <ProfileDropdown profilePicture={data?.user?.image || ""} />
      ) : (
        <Link href="/auth/signIn">
          <Button
            variant={{
              intent: "secondary",
            }}
          >
            Sign In!
          </Button>
        </Link>
      )}
    </header>
  );
};

export default Header;
