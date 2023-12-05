// BoardList.tsx
import React, { useState, useEffect } from "react";
import { useBoardStore } from "@/store/BoardStore";
import DeleteConfirmationPortal from "../DeleteConfirmationModal/DeleteConfirmationPortal";
import CreateConfirmationPortal from "../CreateBoard/CreateConfirmationPortal";
import boardIcon from "@/public/icon-board.svg";
import boradDeleteIcon from "@/public/delete.png";
import Image from "next/image";

const BoardList: React.FC = () => {
  const {
    boards,
    setSelectedBoard,
    setBoardName,
    deleteBoard,
    getBoard,
    CreateBoard,
    isSidePanelOpen,
    setIsSidePanelOpen,
    isModalOpen,
    setModalPopUp,
    confirmDeleteBoard,
    deleteConfirm,
    confirmCancel,
    setconfirmDeleteBoard,
    setconfirmDelete,
    setconfirmCancel,
    deleteID,
    setDeleteID,
  } = useBoardStore((state) => ({
    boards: state.boards || [],
    setSelectedBoard: state.setSelectedBoard,
    deleteBoard: state.deleteBoard,
    setBoardName: state.setBoardName,
    getBoard: state.getBoard,
    isSidePanelOpen: state.isSidePanelOpen,
    setIsSidePanelOpen: state.setIsSidePanelOpen,
    isModalOpen: state.isModalOpen,
    setModalPopUp: state.setModalPopUp,
    confirmDeleteBoard: state.confirmDeleteBoard,
    deleteConfirm: state.deleteConfirm,
    confirmCancel: state.confirmCancel,
    setconfirmDeleteBoard: state.setconfirmDeleteBoard,
    setconfirmDelete: state.setconfirmDelete,
    setconfirmCancel: state.setconfirmCancel,
    deleteID: state.deleteID,
    setDeleteID: state.setDeleteID,
    CreateBoard: state.CreateBoard,
  }));

  const [key, setKey] = useState(0); // Key to force remounting CreateModal

  const handleCreateBoard = (boardName: string) => {
    console.log("Creating board:", boardName);
    // setIsSidePanelOpen(false); // Close the side panel after creating a new board
    CreateBoard(boardName);
    setKey((prevKey) => prevKey + 1); // Increment key to force remounting CreateModal
    getBoard();
  };

  const handleBoardClick = (boardId: string, name: string) => {
    console.log("Fetching todo cards for board:", boardId);
    setSelectedBoard(boardId);
    setBoardName(name);
    setIsSidePanelOpen(false);
  };

  const handleDeleteBoard = (event: React.MouseEvent, boardId: string) => {
    event.stopPropagation();
    setconfirmDeleteBoard(true);
    setDeleteID(boardId);
  };

  const confirmDelete = async () => {
    console.log("Deleting board:", deleteID);
    deleteBoard(deleteID); // Assuming deleteBoard takes boardId as an argument
    setconfirmDeleteBoard(false);
    setconfirmDelete(true);
    getBoard();
  };

  const handlePopUp = () => {
    setModalPopUp(true);
  };

  const cancelDelete = () => {
    setconfirmDeleteBoard(false);
    setconfirmCancel(true);
  };

  return (
    <div className=" bg-white  dark:bg-[#2b2c37]   py-4 rounded-xl">
      <h3 className="dark:text-gray-300 text-gray-600 font-semibold mx-4 mb-3 ">
        All Boards ({boards?.length})
      </h3>
      <div className="dropdown-borad flex flex-col h-[70vh]  overflow-y-auto justify-between">
        <div>
          {boards?.map((board) => (
            <div
              className={`flex items-center space-x-2 p-4 rounded-r-full duration-500 ease-in-out cursor-pointer text-[#635fc7] hover:bg-[#635fc71a] hover:text-[#635fc7] dark:hover:bg-white ${
                board._id === sessionStorage.getItem("boardID") &&
                " bg-[#635fc7] rounded-r-full text-white mr-8 "
              } `}
              key={board._id}
              onClick={() => handleBoardClick(board._id, board.name)}
            >
              <Image
                src={boardIcon}
                className="h-4 filter-white"
                alt="board_icons"
              />

              <p className="text-lg font-bold">{board.name}</p>

              <div className="flex items-center cursor-pointer">
                <Image
                  src={boradDeleteIcon}
                  className="h-4 w-4 filter-black border-2px #fff bg-hover-white rounded-full hover:filter-black hover:border-[#635fc7] hover:bg-[#635fc71a] dark:hover:bg-black dark:hover:border-[#635fc7] dark:hover:filter-white"
                  alt="board_Delete_icons"
                  onClick={() => handleDeleteBoard(event, board._id)}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>
          ))}
          {confirmDeleteBoard && (
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
              <DeleteConfirmationPortal
                isOpen={!!confirmDeleteBoard}
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
              />
            </div>
          )}

          <div
            className="flex  items-baseline space-x-2  mr-8 rounded-r-full duration-500 ease-in-out cursor-pointer text-[#635fc7] px-5 py-4 hover:bg-[#635fc71a] hover:text-[#635fc7] dark:hover:bg-white"
            onClick={handlePopUp}
          >
            <Image src={boardIcon} className="filter-white" alt="board_icons" />
            <p className="text-lg font-bold">Create New Board</p>
          </div>

          {isModalOpen && (
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
              <CreateConfirmationPortal
                isOpen={isModalOpen}
                onClose={() => setIsSidePanelOpen(false)}
                onCreateBoard={handleCreateBoard}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BoardList;
