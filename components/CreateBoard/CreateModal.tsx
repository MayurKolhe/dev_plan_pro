import React, { useState } from "react";
import { getSession } from "next-auth/react";
import { useBoardStore } from "@/store/BoardStore";

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateBoard: (boardName: string) => void;
}

const CreateModal: React.FC<CreateModalProps> = ({
  isOpen,
  onClose,
  onCreateBoard,
}) => {
  const [CreateBoard, setIsSidePanelOpen, isModalOpen, setModalPopUp] =
    useBoardStore((state) => [
      state.CreateBoard,
      state.setIsSidePanelOpen,
      state.isModalOpen,
      state.setModalPopUp,
    ]);

  console.log("In Create Board");
  console.log("isOpen", isOpen);
  const [boardName, setBoardName] = useState("");

  const openModal = () => {
    setModalPopUp(true);
  };

  const closeModal = () => {
    setModalPopUp(false);
  };


  const handleCreateBoard = async () => {
    if (boardName.trim() !== "") {
      CreateBoard(boardName);
      setIsSidePanelOpen(false);
      setModalPopUp(false);
      onClose();
    }
  };

  return (
    <div
      className="fixed right-0 top-0 py-4 z-50 left-0 bottom-0 justify-center items-center flex dropdown "
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setModalPopUp(false);
      }}
    >
      <div
        className=" scrollbar-hide overflow-y-scroll max-h-[95vh]  bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold
       shadow-md shadow-[#364e7e1a] max-w-md mx-auto my-auto w-full px-8  py-8 rounded-xl"
      >
        <h3 className=" text-lg">Add New Board</h3>
        <div className="mt-8 flex flex-col space-y-1">
          <label className="  text-sm dark:text-white text-gray-500">
            Board Name
          </label>
          <input
            className=" bg-transparent  px-4 py-2 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-1  ring-0  "
            placeholder=" e.g Web Design"
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
            id="board-name-input"
          />
        </div>
        <div className="mt-8 flex flex-col space-y-3">
          <div>
            <button
              className=" w-full items-center hover:opacity-70 dark:text-[#635fc7] dark:bg-white  text-white bg-[#635fc7] py-2 rounded-full "
              onClick={handleCreateBoard}
            >
              Create New Board
            </button>
            <button
              onClick={closeModal}
              className=" w-full items-center hover:opacity-70 dark:text-white dark:bg-[#635fc7] mt-8 relative  text-white bg-[#635fc7] py-2 rounded-full"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateModal;
