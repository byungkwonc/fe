import React, { useState } from "react";
import { FaBars, FaBuffer, FaTimes } from "react-icons/fa";
import Link from 'next/link';
import { useAuth } from "../lib/auth";

const Navbar = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [menuToggle, setMenuToggle] = useState(false);
  const { user, loggedIn, signOut } = useAuth();

  let status = "not authenticated";
  return (
    //   navbar goes here
    <nav className="bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            {/* logo */}
            <div>
              <Link href={`/`} className="flex items-center py-5 px-2 text-gray-700">
                <FaBuffer className="w-6 h-6" />
                <span className="font-bold px-2">Home</span>
              </Link>
            </div>

            {/* primary nav */}
            <div className="hidden md:flex items-center space-x-1">
              {/* <Link href="/features" className="py-5 px-3 text-gray-700 hover:text-gray-900">Features</Link> */}
              <Link href="/profile" className="py-5 px-3 text-gray-700 hover:text-gray-900">Profile</Link>
              <Link href="#" className="py-5 px-3 text-gray-700 hover:text-gray-900">Pricing</Link>
            </div>
          </div>
          {/* secondary nav */}
          {/* {status === "authenticated" ? ( */}
          {loggedIn ? (
            <div className="hidden md:flex items-center space-x-1">
              ({user?.email})
              <button
                className="py-5 px-3"
                // onClick={(evt) => {
                //   evt.preventDefault();
                //   alert("Log out");
                // }}
                onClick={signOut}
              >
                Log out
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-1">
              {/* <Link href="/login" className="py-5 px-3">Login</Link> */}
              {/* <Link href="/signup" className="py-2 px-3 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 hover:text-yellow-800 rounded transition duration-300">Signup</Link> */}
              <Link href="/auth" className="py-5 px-3">Login</Link>
              <Link href="/auth" className="py-2 px-3 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 hover:text-yellow-800 rounded transition duration-300">Signup</Link>
            </div>
          )}
          {/* mobile menu */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMenuToggle(!menuToggle)}>
              {menuToggle ? (
                <FaTimes className="w-6 h-6" />
              ) : (
                <FaBars className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* mobile menu items */}
      <div className={`${!menuToggle ? "hidden" : ""} md:hidden`}>
        {/* <Link href="/features" className="block py-2 px-4 text-sm hover:bg-gray-200">Features</Link> */}
        <Link href="/profile" className="block py-2 px-4 text-sm hover:bg-gray-200">profile</Link>
        <Link href="#" className="block py-2 px-4 text-sm hover:bg-gray-200">Pricing</Link>

        {/* {status === "authenticated" ? ( */}
        {loggedIn ? (
          <button
            className="block py-2 px-4 text-sm hover:bg-gray-200"
            // onClick={(evt) => {
            //   evt.preventDefault();
            //   alert("Log out");
            // }}
            onClick={signOut}
          >
            Log out
          </button>
        ) : (
          <div>
            {/* <Link href="/login" className="block py-2 px-4 text-sm hover:bg-gray-200">Login</Link> */}
            {/* <Link href="/signup" className="block py-2 px-4 text-sm hover:bg-gray-200">Signup</Link> */}
            <Link href="/auth" className="block py-2 px-4 text-sm hover:bg-gray-200">Login</Link>
            <Link href="/auth" className="block py-2 px-4 text-sm hover:bg-gray-200">Signup</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;