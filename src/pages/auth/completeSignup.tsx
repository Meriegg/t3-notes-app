import getServerSession from "@/server/common/get-server-session";
import Button from "@/Components/Ui/Button";
import Input from "@/Components/Ui/Input";
import Select from "@/Components/Ui/Select";
import reloadSession from "@/utils/reloadSession";
import { useRouter } from "next/router";
import { useState } from "react";
import { Formik } from "formik";
import {
  type GetServerSideProps,
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
  type NextPage,
} from "next";
import { Session } from "next-auth";
import { trpc } from "@/utils/trpc";
import * as yup from "yup";

const CompleteSignup: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ userSession }) => {
  const session = userSession;
  const router = useRouter();
  const completeSignup = trpc.user.completeSignup.useMutation({
    onSuccess: () => {
      reloadSession();
      router.push("/");
    },
  });
  const [didSubmit, setDidSubmit] = useState(false);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div
        className="glassmorphic mt-24 rounded-md p-8"
        style={{
          width: "min(500px, 100%)",
        }}
      >
        <h1 className="text-2xl font-extrabold tracking-tight">
          Complete your signup here!
        </h1>
        <p className="mt-3 text-base font-medium tracking-tight text-slate-300">
          We need a little more information about yourself
        </p>

        <Formik
          initialValues={{
            email: session.user.email || "",
            username: "",
            typeOfUser: "",
          }}
          validationSchema={yup.object().shape({
            username: yup.string().required(),
            email: yup.string().email(),
            typeOfUser: yup
              .mixed()
              .oneOf(["PERSONAL", "COMPANY", "NOT_SPECIFIED"]),
          })}
          validateOnChange={didSubmit}
          onSubmit={(submitValues) => {
            completeSignup.mutate({
              email: submitValues.email,
              typeOfUser: submitValues.typeOfUser as
                | "PERSONAL"
                | "COMPANY"
                | "NOT_SPECIFIED",
              username: submitValues.username,
            });
          }}
        >
          {({ handleSubmit, handleChange, values, errors, setFieldValue }) => (
            <form
              className="mt-4 flex flex-col gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                setDidSubmit(true);
                handleSubmit(e);
              }}
            >
              <Input
                placeholder={"Email"}
                value={values.email}
                prefix="Email"
                onChange={handleChange("email")}
                error={errors.email}
                disabled={!!session.user.email}
              />
              <Input
                placeholder={"Username"}
                value={values.username}
                prefix="Username*"
                error={errors.username}
                onChange={handleChange("username")}
              />
              <Select
                options={[
                  { key: "Company", value: "COMPANY" },
                  { key: "Personal", value: "PERSONAL" },
                ]}
                onChange={(value: string) => setFieldValue("typeOfUser", value)}
                value={values.typeOfUser}
              />
              <Button type="submit">Continue to application!</Button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<{
  userSession: Session;
}> = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerSession(ctx);

  if (!session || !session?.user) {
    return {
      redirect: {
        destination: "/auth/signIn",
        permanent: false,
      },
      props: {},
    };
  }

  if (session.user.fullSignupCompleted) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
      props: {},
    };
  }

  return {
    props: {
      userSession: session,
    },
  };
};

export default CompleteSignup;
