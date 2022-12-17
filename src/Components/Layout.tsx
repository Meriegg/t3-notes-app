import Head from "next/head";
import Header from "./Header";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Head>
        <title>T3 Notes app</title>
      </Head>
      <Header />
      <>{children}</>
    </>
  );
};

export default Layout;
