import React from "react";
import BoardList from "../BoardList/BoardList";
import { useBoardStore } from "@/store/BoardStore";
import hideSidebarIcon from "@/public/icon-hide-sidebar.svg";
import showSidebarIcon from "@/public/icon-show-sidebar.svg";
import Image from "next/image";

const SideBar: React.FC = () => {
  const [isSidePanelOpen, setIsSidePanelOpen] = useBoardStore((state) => [
    state.isSidePanelOpen,
    state.setIsSidePanelOpen,
  ]);

  const toggleSidePanel = () => {
    setIsSidePanelOpen(!isSidePanelOpen);
  };

  return (
    <div>
      <div
        className={`flex items-center space-x-2 p-4 rounded-r-full duration-500 ease-in-out cursor-pointer text-[#635fc7] hover:bg-[#635fc71a] hover:text-[#635fc7] dark:hover:bg-white ${
          isSidePanelOpen
            ? `min-w-[261px] bg-white dark:bg-[#2b2c37]  fixed top-[150px] h-200 py-10  items-center left-0 z-20`
            : ` bg-[#635FC7] dark:bg-[#2b2c37] dark:hover:bg-[#635FC7] top-auto bottom-10 justify-center items-center hover:opacity-80 cursor-pointer  p-0 transition duration-300 transform fixed felx w-[50px] h-[50px] rounded-r-full`
        }`}
        onClick={toggleSidePanel}
      >
        <Image
          src={isSidePanelOpen ? hideSidebarIcon : showSidebarIcon}
          alt={isSidePanelOpen ? "Hide Boards Icon" : "Open Boards Icon"}
          width={20}
          height={20}
          className="filter-white"
        />
        {isSidePanelOpen && <p className="font-bold text-base">Hide Boards</p>}
      </div>
      {isSidePanelOpen && (
        <div className="bg-white dark:bg-[#2b2c37] fixed h-screen items-center z-20 transform translate-x-0 transition-transform duration-300 ease-in-out">
          <div className="w-full py-4 rounded-xl">
            <h3 className="dark:text-gray-300 text-gray-600 font-semibold mx-4 mb-8">
              <BoardList />
            </h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBar;
