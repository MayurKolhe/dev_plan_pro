// SideButton.tsx
import React, { useState } from 'react';
import BoardList from '../BoardList/BoardList';
import { useBoardStore } from '@/store/BoardStore';

const SideBar: React.FC = () => {

  const  [isSidePanelOpen,setIsSidePanelOpen]= useBoardStore((state)=> [ state.isSidePanelOpen,
    state.setIsSidePanelOpen
])

  const openSidePanel = () => {
    setIsSidePanelOpen(true);
  };

  const closeSidePanel = () => {
    setIsSidePanelOpen(false);
  };

  return (
    <div>
      <div
        className="flex items-baseline space-x-2 mr-8 rounded-r-full duration-500 ease-in-out cursor-pointer text-[#635fc7] px-5 py-4 hover:bg-[#635fc71a] hover:text-[#635fc7] dark:hover:bg-white"
        onClick={openSidePanel}
      >
        <img src="/icon-show-sidebar.svg" className="h-4 filter-white" />
        <p className="text-lg font-bold">Open Boards</p>
      </div>
      {isSidePanelOpen && (
        <div className="fixed top-0 right-0 h-full w-64 bg-white p-4 shadow-lg">
          <div className="mb-4">
            <button onClick={closeSidePanel}>Close</button>
          </div>
          <BoardList />
   
        </div>
      )}
    </div>
  );
};

export default SideBar;
