"use client";
import Avatar from "react-avatar";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import darkIcon from "@/public/icon-dark-theme.svg";
import lightIcon from "@/public/icon-light-theme.svg";
import React, { Dispatch, useState } from "react";
import { Switch } from "@headlessui/react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useBoardStore } from "@/store/BoardStore";
import  {useDarkMode, toggleDarkMode} from "@/store/useDarkMode";

const NavBar = () => {
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

 //const [colorTheme, setTheme] = useDarkMode();



// const toggleDarkMode = (checked) => {
//   setTheme(colorTheme);
//   setDarkSide(checked);
// };

// const [checked, setChecked] = useState(false);
//   const [colorTheme, setTheme] = useDarkMode();

//   const [darkSide, setDarkSide] = useState(
//     colorTheme === "light" ? true : false
//   );

//   const handleToggle = () => {
//     toggleDarkMode(checked, setTheme);
//     setChecked(!checked);
//   };
  
  

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
            {/* search box */}

            {/* <div className=" mx-2  p-4 relative space-x-2 bg-slate-100 dark:bg-[#20212c] flex justify-center items-center rounded-lg">
                  <img src={lightIcon} alt="sun indicating light mode" />

                  <Switch
                    checked={darkSide}
                    onChange={handleToggle}
                    className={`${
                      darkSide ? "bg-[#635fc7] !important " : "bg-gray-200 !important"
                    } relative inline-flex h-6 w-11 items-center rounded-full`}
                  >
                    <span
                      className={`${
                        darkSide ? "translate-x-6  " : "translate-x-1 "
                      } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                    />
                  </Switch>

                  <img src={darkIcon} alt="moon indicating dark mode" />
                </div> */}



            <form className="flex items-center space-x-4 bg-white rounded-md p-2 shadow-md flex-auto md:flex-initial">
              <MagnifyingGlassIcon className="h-6 w-6 text-red-400" />
              <input
                type="text"
                placeholder="Search"
                className="flex-1 outline-none p-3"
                value={searchText}
                onChange={(e)=>setSearch(e.target.value)}
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
