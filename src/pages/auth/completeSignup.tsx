import getServerSession from "@/server/common/get-server-session";
import {
  type GetServerSideProps,
  type GetServerSidePropsContext,
  type NextPage,
} from "next";

const CompleteSignup: NextPage = () => {
  return <div></div>;
};

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const session = await getServerSession(ctx);

  if (session?.user?.fullSignupCompleted) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};

export default CompleteSignup;
