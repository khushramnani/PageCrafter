"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";

const Navbar = () => {
  const { data: session } = useSession();
  const [showdropdown, setShowdropdown] = useState(false);

  return (
    <>
      <nav className=" text-white w-full p-4 flex items-center justify-between">
        <Image
          className="w-12"
          src="/assets"
          width={500}
          height={500}
          alt="logo"
        />

        <div className="flex pr-4 gap-8">
          {!session && <button>Docs</button>}
          {session && (
            <>
              <div className="relative">
                <button
                  onClick={() => setShowdropdown(!showdropdown)}
                  onBlur={() => {
                    setTimeout(() => {
                      setShowdropdown(false);
                    }, 100);
                  }}
                  id="dropdownDefaultButton"
                  data-dropdown-toggle="dropdown"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  type="button"
                >
                  Welcome {session.user.name}{" "}
                  <svg
                    className="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      stroke-width="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>

                <div
                  id="dropdown"
                  className={`z-10 ${
                    showdropdown ? "" : "hidden"
                  } left-8 mt-1 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
                >
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownDefaultButton"
                  >
                    <li>
                      <Link
                        rel="stylesheet"
                        href={"/dashboard"}
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={() => signOut()}
                        rel="stylesheet"
                        href={"/"}
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Sign out
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          )}

          {!session && (
            <Link rel="stylesheet" href={"/signup"}>
              {" "}
              <button>Signup</button>{" "}
            </Link>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
