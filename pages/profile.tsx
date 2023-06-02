import Link from "next/link";
import { useAuth } from "../lib/auth";

// client side 보안 적용
// import { useEffect } from "react";
// import Router from "next/router";

// server side 보안 적용
import { GetServerSideProps } from "next";
import { supabase } from "../lib/supabase";
import { User } from "@supabase/supabase-js";

const ProfilePage = ({ user }) => {
  // 보안 없음
  // const { user, loading, signOut } = useAuth();

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // client side 보안 적용
/*
  const { user, signOut, userLoading, loggedIn } = useAuth();
  useEffect(() => {
    if (!userLoading && !loggedIn) {
      Router.push("/auth");
    }
  }, [userLoading, loggedIn]);
*/
  
  // server side 보안 적용
  const { signOut } = useAuth();

  return (
    <div className="flex flex-col items-center justify-start py-36 min-h-screen">
      <h2 className="text-4xl my-4">
        Hello, {user && user.email ? user.email : "Supabase User!"}
      </h2>
      {!user && (
        <div>
          You have landed on a protected page.
          <br />
          Please{"  "}
          <Link href="/auth" className="font-bold text-blue-500">Log In</Link>{" "}
          to view the page&apos;s full content.
        </div>
      )}
      {user && (
        <div>
          <button
            className="border bg-gray-500 border-gray-600 text-white px-3 py-2 rounded w-full text-center transition duration-150 shadow-lg"
            onClick={signOut}
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;

// server side 보안 적용
// export type NextAppPageUserProps = {
//   props: {
//     user: User;
//     loggedIn: boolean;
//   };
// };

// export type NextAppPageRedirProps = {
//   redirect: {
//     destination: string;
//     permanent: boolean;
//   };
// };

// export type NextAppPageServerSideProps =
//   | NextAppPageUserProps
//   | NextAppPageRedirProps;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  // Check if we have a session
  const session = async () => await supabase.auth.getSession();
 
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: session.name,
      loggedIn: !!session.name,
    },
  };
};