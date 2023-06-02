// import { createContext, FunctionComponent, useState } from "react";
import { createContext, FunctionComponent, useState, useEffect } from "react";
import Router from "next/router";
// import { User } from "@supabase/supabase-js";
import { AuthChangeEvent, User, Session} from "@supabase/supabase-js";
import { supabase } from "../supabase";
import { useMessage, MessageProps } from "../message";
import { SupabaseAuthPayload } from "./auth.types";

export type AuthContextProps = {
  signUp: (payload: SupabaseAuthPayload) => void;
  signIn: (payload: SupabaseAuthPayload) => void;
  loading: boolean;
  user: User;
  signOut: () => void;
  loggedIn: boolean;
  userLoading: boolean;
  children: React.ReactNode;
};

export const AuthContext = createContext<Partial<AuthContextProps>>({});

export const AuthProvider: FunctionComponent<AuthContextProps> = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const { handleMessage } = useMessage();
  
    const [user, setUser] = useState<User>(null);
    const [userLoading, setUserLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);

    // sign-up a user with provided details
    const signUp = async (payload: SupabaseAuthPayload) => {
      try {
        setLoading(true);
        const { error } = await supabase.auth.signUp(payload);
        if (error) {
          console.log(error);
          handleMessage({ message: error.message, type: "error" });
        } else {
          handleMessage({
            message: "Signup successful. Please check your inbox for a confirmation email!",
            type: "success",
          });
        }
      } catch (error) {
        console.log(error);
        handleMessage({
          message: error.error_description || error,
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    };
  
    // sign-in a user with provided details
    const signIn = async (payload: SupabaseAuthPayload) => {
      try {
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword(payload);
        if (error) {
          console.log(error);
          handleMessage({ message: error.message, type: "error" });
        } else {
          handleMessage({
            message: "Log in successful. I'll redirect you once I'm done",
            type: "success",
          });
          handleMessage({ message: `Welcome, ${user.email}`, type: "success" });
        }
      } catch (error) {
        console.log(error);
        handleMessage({
          message: error.error_description || error,
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    // sign-out a user
    const signOut = async () => await supabase.auth.signOut();

    const setServerSession = async (event: AuthChangeEvent, session: Session) => {
      await fetch("/api/auth", {
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json" }),
        credentials: "same-origin",
        body: JSON.stringify({ event, session }),
      });
    };

  // 로그인한 유저의 액션에 따라서 페이지를 달리 보여줘야 하기 때문에 유저의 액션 상태를 항상 체크
  // supabase에서는 supabase.auth.onAuthStateChange(async(event, session) => {... }) 함수를 지원
  // event 파라미터는 'SIGNED_IN' | 'SIGNED_OUT' | 'USER_UPDATED' | 'PASSWORD_RECOVERY'
  // 유저가 로그인, 로그아웃, 유저 업데이트, 패스워드 리커버리가 됐을 때 onAuthStateChange 함수가 반응한다는 뜻입니다.
  // 리액트의 useEffect 함수를 이용해서 맨 처음 실행

  useEffect(() => {
      //const user = supabase.auth.user();
      //const user = supabase.auth.getSession();
  
      if (user) {
        setUser(user);
        setUserLoading(false);
        setLoggedIn(true);
        Router.push("/profile");
      } else {
        setUserLoading(false);
      }
  
      const { data: authListener } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          const user = session?.user! ?? null;
          setUserLoading(false);
          await setServerSession(event, session);
          if (user) {
            setUser(user);
            setLoggedIn(true);
            Router.push("/profile");
          } else {
            setUser(null);
            setLoading(false);
            setLoggedIn(false);
            Router.push("/auth");
          }
        }
      );
  
      return () => {
        authListener.subscription.unsubscribe;
      };
    }, []);

  return (
    <AuthContext.Provider value={{ signUp, signIn, loading, user, signOut, loggedIn, userLoading }}>
      {children}
    </AuthContext.Provider>
  );
};