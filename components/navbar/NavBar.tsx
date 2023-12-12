"use client";
import Avatar from "react-avatar";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useBoardStore } from "@/store/BoardStore";

const NavBar = () => {
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { currentBoardName, setBoardName } = useBoardStore();

  useEffect(() => {
    console.log("currentBoardName   ",  currentBoardName);
    setBoardName(currentBoardName);
  }, [currentBoardName, setBoardName]);

  useEffect(() => {
    console.log("NavBar component rerendered");
  }, [currentBoardName]);

  const handleAvatarClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    await signOut(); // Perform the logout action using NextAuth.js
  };
  const [searchText, setSearch] = useBoardStore((state) => [
    state.searchText,
    state.setSearch,
  ]);

  return (
    <header>
      <div className="flex flex-col md:flex-row items-center p-3 bg-gray-500/10 rounded-b-2xl">
        <Image
          src="/logo.png"
          alt="Dev_Plan_Pro_logo"
          width={100}
          height={100}
        />
        {session ? (
          <div className="flex items-center space-x-10 flex-1 justify-end">
            <div className="flex items-center">
              {currentBoardName !==" " ? (
                <h3 className="max-w-[400px] text-2xl font-extrabold ml-20 font-serif">
                  {currentBoardName}
                </h3>
              ) : (
                <h3 className="max-w-[400px] text-2xl font-extrabold ml-20 font-serif">
                  Dev Plan Pro
                </h3>
              )}
            </div>

            <form className="flex items-center space-x-4 bg-white rounded-md p-2 shadow-md flex-auto md:flex-initial">
              <MagnifyingGlassIcon className="h-6 w-6 text-red-400" />
              <input
                type="text"
                placeholder="Search"
                className="flex-1 outline-none p-3"
                value={searchText}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button type="submit" hidden>
                Search
              </button>
            </form>
            <div className="relative" onClick={handleAvatarClick}>
              <Avatar
                name={session?.user?.name ?? ""}
                color="#FF9933"
                round
                size="60"
              />
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg">
                  <div className="p-2">
                    <span className="font-bold">Name:</span>{" "}
                    {session?.user?.name}
                  </div>
                  <div className="p-2">
                    <span className="font-bold">Email:</span>{" "}
                    {session?.user?.email}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="block w-full p-4 bg-red-500 text-white font-bold"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
};

export default NavBar;
