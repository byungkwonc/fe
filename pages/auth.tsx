import React, { useState, useRef } from "react";
import { FaLock, FaLockOpen, FaGithub } from "react-icons/fa";
// import { supabase } from "../lib/supabase";
import classNames from "classnames";
// import { useFormFields, MessageProps, useMessage } from "../lib/utils";
import { useFormFields } from "../lib/utils";
import { useMessage } from "../lib/message";
import { useAuth } from "../lib/auth";

type FormFieldProps = {
  email: string;
  password: string;
};

// type SupabaseAuthPayload = FormFieldProps; // type alias

const FORM_VALUES: FormFieldProps = {
  email: "",
  password: "",
};

// const MESSAGE_VALUES: MessageProps = {
//   type: "default",
//   payload: "",
// };

const Auth: React.FC = (props) => {
    const [isSignIn, setIsSignIn] = useState(true);
    // const [loading, setLoading] = useState(false);
    const { loading, signIn, signUp, signInWithGithub } = useAuth();
  
    // const [message, handleMessage] = useMessage<MessageProps>(MESSAGE_VALUES);
    // const { messages, handleMessage } = useMessage();
    const { messages } = useMessage();
    const [values, handleChange, resetFormFields] = useFormFields<FormFieldProps>(FORM_VALUES);
/* 
    // sign-up a user with provided details
    const signUp = async (payload: SupabaseAuthPayload) => {
      try {
        setLoading(true);
        const { error } = await supabase.auth.signUp(payload);
        if (error) {
          console.log(error);
          // handleMessage({ payload: error.message, type: "error" });
          handleMessage({ message: error.message, type: "error" });
        } else {
          handleMessage({
            // payload: "Signup successful. Please check your inbox for a confirmation email!",
            message: "Signup successful. Please check your inbox for a confirmation email!",
            type: "success",
          });
        }
      } catch (error) {
        console.log(error);
        handleMessage({
          // payload: error.error_description || error,
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
          // handleMessage({ payload: error.message, type: "error" });
          handleMessage({ message: error.message, type: "error" });
        } else {
          handleMessage({
            // payload: "Log in successful. I'll redirect you once I'm done",
            message: "Log in successful. I'll redirect you once I'm done",
            type: "success",
          });
        }
      } catch (error) {
        console.log(error);
        handleMessage({
          // payload: error.error_description || error,
          message: error.error_description || error,
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    };
*/
    // Form submit handler to call the above function
    const handleSumbit = (event: React.FormEvent) => {
      event.preventDefault();
      isSignIn ? signIn(values) : signUp(values);
      resetFormFields();
    };

    return (
      // eslint-disable-next-line react/jsx-key
        <div className="container px-5 py-10 mx-auto w-2/3">
          <div className="w-full text-center mb-4 flex  flex-col place-items-center">
            {isSignIn ? (
              <FaLockOpen className="w-6 h-6" />
            ) : (
              <FaLock className="w-6 h-6" />
            )}
            <h1 className="text-2xl md:text-4xl text-gray-700 font-semibold">
              {isSignIn ? "Log In" : "Sign Up"}
            </h1>
          </div>
          {/* message.payload && ( */messages && messages.map((message, index) => (
            // eslint-disable-next-line react/jsx-key
            <div key={index}
              className={classNames(
                "shadow-md rounded px-3 py-2 text-shadow transition-all mt-2 text-center",
                message.type === "error"
                  ? "bg-red-500 text-white"
                  : message.type === "success"
                  ? "bg-green-300 text-gray-800"
                  : "bg-gray-100 text-gray-800"
              )}
            >
              {/* message?.payload */message.message}
            </div>
          ))}
          <form
            onSubmit={handleSumbit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <button
              onClick={signInWithGithub}
              className="flex-1 bg-gray-200 text-green-700 py-3 rounded w-full text-center shadow"
            >
              <FaGithub className="inline-block text-2xl" />{" "}
              {isSignIn ? "Log In" : "Sign Up"} with <strong>Github</strong>
            </button>
            <hr className="my-4" />
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                name="email"
                type="email"
                placeholder="Your Email"
                required
                value={values.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                name="password"
                type="password"
                placeholder="Your password"
                required
                value={values.password}
                onChange={handleChange}
              />
            </div>
            <div className="flex gap-2">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                {isSignIn ? "Log In" : "Sign Up"}
              </button>
              <div className="flex-1 text-right">
                <small className="block text-gray-600">
                  {isSignIn ? "Not a member yet?" : "Already a member?"}{" "}
                </small>
                <a
                  className="block font-semibold"
                  href=""
                  onClick={(e) => {
                    e.preventDefault();
                    setIsSignIn(!isSignIn);
                  }}
                >
                  {isSignIn ? "Sign Up" : "Log In"}
                </a>
              </div>
            </div>
          </form>
          {loading && (
            <div className="shadow-md rounded px-3 py-2 text-shadow transition-all mt-2 text-center">
              Loading...
            </div>
          )}
        </div>
      );

};

export default Auth;