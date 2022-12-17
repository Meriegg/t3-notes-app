import getServerSession from "@/server/common/get-server-session";
import Button from "@/Components/Ui/Button";
import { useRouter } from "next/router";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  type NextPage,
} from "next";
import { BuiltInProviderType, Provider } from "next-auth/providers";
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn,
} from "next-auth/react";
import { CurrentAuthProviders } from "@/types";

const SignIn: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ providers }) => {
  const router = useRouter();
  const { error } = router.query;

  if (!providers) {
    return (
      <div className="text-center">
        <h1>An Error Happened!</h1>
      </div>
    );
  }

  const providerBtnIcons: { [key: string]: string } = {
    Google:
      "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
  };

  return (
    <div className="flex w-full items-center justify-center">
      <div className="mt-32 flex flex-col items-center px-2">
        <h1 className="text-6xl font-extrabold tracking-tighter ">
          Sign in to continue!
        </h1>

        {error ? (
          <div className="mt-6 w-full rounded-md border-2 border-red-800 bg-red-700 py-4 text-center">
            <p className="text-base font-medium tracking-tight">{error}</p>
          </div>
        ) : null}

        {Object.values(providers).map((provider) => (
          <Button
            onClick={() => signIn(provider.id)}
            variant={{ size: "md" }}
            className="mt-6 flex gap-3 font-semibold"
          >
            <img
              alt={`${provider.name}`}
              src={providerBtnIcons[provider.name]}
            />
            Continue with {provider.name}
          </Button>
        ))}
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
