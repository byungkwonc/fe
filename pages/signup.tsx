import React, { useState, useRef } from "react";
import { FaLock } from "react-icons/fa";
import { supabase } from "../lib/supabase";
import classNames from "classnames";
import { useFormFields, MessageProps, useMessage } from "../lib/utils_b4auth";

type SignUpFieldProps = {
  email: string;
  password: string;
};

type SupabaseSignupPayload = SignUpFieldProps; // type alias

const FORM_VALUES: SignUpFieldProps = { //초기값. useFormFields의 values 객체가 위 email, password 값을 가지는 react state객체가 됨
  email: "",
  password: "",
};

const MESSAGE_VALUES: MessageProps = { //초기값. useMessage 혹에서 리턴되는 message 객체가 type, plyload 값을 가지는 react state객체가 됨
  type: "default",
  payload: "",
};

const Signup: React.FC = (props) => {
  const [loading, setLoading] = useState(false);

  const [values, handleChange, resetFormFields] =
    useFormFields<SignUpFieldProps>(FORM_VALUES);

  const [message, handleMessage] = useMessage<MessageProps>(MESSAGE_VALUES);

  // sign-up a user with provided details
  const signUp = async (payload: SupabaseSignupPayload) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp(payload);
      if (error) {
        console.log(error);
        handleMessage({ payload: error.message, type: "error" });
      } else {
        handleMessage({
          payload: "Signup successful. Please check your inbox for a confirmation email!",
          type: "success",
        });
      }
    } catch (error) {
      console.log(error);
      handleMessage({
        payload: error.error_description || error,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // Form submit handler to call the above function
  const handleSumbit = (event: React.FormEvent) => {
    event.preventDefault();
    signUp(values);     //useFormFields 훅에서 리턴된 values 객체
    resetFormFields();  //useFormFields 훅에서 리턴되는 함수
  };

  return (
    <div className="container px-5 py-10 mx-auto w-2/3">
      <div className="w-full text-center mb-4 flex  flex-col place-items-center">
        <FaLock className="w-6 h-6" />
        <h1 className="text-2xl md:text-4xl text-gray-700 font-semibold">
          Sign Up
        </h1>
      </div>
      {message.payload && (
        <div
          className={classNames(
            "shadow-md rounded px-3 py-2 text-shadow transition-all mt-2 text-center",
            message.type === "error"
              ? "bg-red-500 text-white"
              : message.type === "success"
              ? "bg-green-300 text-gray-800"
              : "bg-gray-100 text-gray-800"
          )}
        >
          {message?.payload}
        </div>
      )}
      <form
        onSubmit={handleSumbit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
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
            value={values.email}    //useFormFields 훅의 values 객체를 참조
            onChange={handleChange} //useFormFields 부분의 handleChange 함수를 할당
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
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign Up
          </button>
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

export default Signup;