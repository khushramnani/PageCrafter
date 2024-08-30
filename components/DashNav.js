"use client";
import React from "react";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
// import { doCredentialLogin } from '../api/actions';


const DashNav = () => {
  const { data: session } = useSession();

  const username = session.user.name
  const userimg = session.user.image
  
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <>
      <nav className="bg-[#021526] text-white w-full p-4 flex items-center justify-between border-b-2 border-gray-600 ">

        <div className="logo flex ">
        {/* <Image
          className="w-12"
          src="/assets"
          width={500}
          height={500}
          alt="logo"
        /> */}
        <Image src="/assets/Nav-logo.png" width={100} height={100} alt="logo"  />
        </div>

        <div className="flex pr-4 gap-8">
          {/* {session && ( */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              onBlur={() => {
                setTimeout(() => {
                  setShowDropdown(false);
                }, 100);
              }}

            >
              {/* Welcome {" "} */}
              <img
                alt={username}
                src={userimg || "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg"}
                class="relative inline-block bg-cover object-cover object-center w-12 h-12 rounded-full cursor-pointer"
                
              />
            </button>

            <div
              id="dropdown"
              className={`z-10 ${
                showDropdown ? "" : "hidden"
              } right-0 mt-1  absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-28 dark:bg-gray-700`}
            >
              <div
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefaultButton"
              >

                <li>
                    <span>{username}</span>
                </li>
              <hr />
                
                  <Link href="/page.js">
                    <button
                      onClick={() => {
                        "/page.js";
                      }}
                      
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                     Home
                    </button>
                  </Link>
                
                
                  <button
                    onClick={() => signOut()}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Sign out
                  </button>
                
              </div>
            </div>
          </div>
          
        </div>
      </nav>
    </>
  );
};

export default DashNav;
