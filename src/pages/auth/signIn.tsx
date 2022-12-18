import getServerSession from "@/server/common/get-server-session";
import Button from "@/Components/Ui/Button";
import GithubLogo from "@/../public/icons/github-mark.svg";
import { useRouter } from "next/router";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useState, useEffect } from "react";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  type NextPage,
} from "next";
import { BuiltInProviderType } from "next-auth/providers";
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn,
} from "next-auth/react";

const SignIn: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ providers }) => {
  const router = useRouter();
  const { error } = router.query;
  const [parent] = useAutoAnimate<HTMLDivElement>();
  const [currentError, setCurrentError] = useState<string | string[] | null>(
    null
  );

  useEffect(() => {
    setCurrentError(error || null);
  }, []);

  const getErrorCause = (errorMessage: string | string[]) => {
    switch (errorMessage) {
      case "OAuthAccountNotLinked":
        return "This account's email most likely uses another OAuth Provider!";

      default:
        return errorMessage;
    }
  };

  if (!providers) {
    return (
      <div className="text-center">
        <h1>An Error Happened!</h1>
      </div>
    );
  }

  return (
    <div className="flex w-full items-center justify-center">
      <div className="mt-32 flex flex-col items-center px-2" ref={parent}>
        <h1 className="text-center text-6xl font-extrabold tracking-tighter">
          Sign in to continue!
        </h1>

        {currentError ? (
          <div className="mt-6 flex w-full items-center justify-between gap-2 rounded-md border-2 border-red-800 bg-red-700 py-4 pl-5 pr-1 text-center">
            <p className="text-base font-medium tracking-tight">
              {getErrorCause(currentError)}
            </p>
            <Button
              onClick={() => setCurrentError(null)}
              variant={{
                size: "xsm",
                intent: "ghost",
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Button>
          </div>
        ) : null}

        <div className="mt-8 grid w-full grid-cols-2 gap-6 md:grid-cols-1">
          <Button
            onClick={() => signIn(providers["google"].id)}
            variant={{ size: "md", intent: "secondary" }}
            className="flex items-center justify-center gap-3 font-semibold"
          >
            <img
              alt={"Google logo"}
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            />
            Continue with Google
          </Button>
          <Button
            onClick={() => signIn(providers["github"].id)}
            variant={{ size: "md", intent: "dark" }}
            className="flex items-center justify-center gap-3 font-semibold"
          >
            <div
              className="h-6 w-6"
              style={{
                backgroundImage: `url(${GithubLogo.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            Continue with Github
          </Button>
        </div>
      </div>
    </div>
  );
};

type ProvidersType = Record<
  LiteralUnion<BuiltInProviderType, string>,
  ClientSafeProvider
> | null;

export const getServerSideProps: GetServerSideProps<{
  providers: ProvidersType;
}> = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerSession(ctx);
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const providers = await getProviders();

  return {
    props: { providers },
  };
};

export default SignIn;
