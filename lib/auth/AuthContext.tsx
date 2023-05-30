import { createContext, FunctionComponent, useState } from "react";
import { supabase } from "../supabase";
import { useMessage, MessageProps } from "../message";
import { SupabaseAuthPayload } from "./auth.types";

export type AuthContextProps = {
  signUp: (payload: SupabaseAuthPayload) => void;
  signIn: (payload: SupabaseAuthPayload) => void;
  loading: boolean;
};

export const AuthContext = createContext<Partial<AuthContextProps>>({});

export const AuthProvider: FunctionComponent = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState(false);
    const { handleMessage } = useMessage();
  
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
            message:
              "Signup successful. Please check your inbox for a confirmation email!",
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

  return (
    <AuthContext.Provider
      value={{
        signUp,
        signIn,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};