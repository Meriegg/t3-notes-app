import Notes from "@/Components/App/Notes";
import CreateNote from "@/Components/App/CreateNote";
import getServerSession from "@/server/common/get-server-session";
import { signOut } from "next-auth/react";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  type NextPage,
} from "next";

const Home: NextPage = () => {
  return (
    <div className="px-12 py-12 md:px-6 xsm:px-4">
      <CreateNote />
      <Notes />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const session = await getServerSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signIn",
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

export default Home;
