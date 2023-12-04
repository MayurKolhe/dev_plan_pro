// BoardList.tsx
import React, { useState, useEffect } from 'react';
import { useBoardStore } from '@/store/BoardStore';
import CreateModal from "@/components/CreateBoard/CreateModal";
import DeleteConfirmationModal from '../DeleteConfirmationModal/DeleteConfirmationModal';

const BoardList: React.FC = () => {
  const {
    boards,
    setSelectedBoard,
    deleteBoard,
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
    setDeleteID
  } = useBoardStore((state) => ({
    boards: state.boards || [],
    setSelectedBoard: state.setSelectedBoard,
    deleteBoard: state.deleteBoard,
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
    deleteID:state.deleteID,
    setDeleteID:state.setDeleteID
  }));

  const [key, setKey] = useState(0); // Key to force remounting CreateModal

  const handleCreateBoard = (boardName: string) => {
    console.log('Creating board:', boardName);
    setIsSidePanelOpen(false); // Close the side panel after creating a new board
    setKey((prevKey) => prevKey + 1); // Increment key to force remounting CreateModal
  };

  const handleBoardClick = (boardId: string) => {
    console.log('Fetching todo cards for board:', boardId);
    setSelectedBoard(boardId);
   // setIsSidePanelOpen(false);
  };

  const handleDeleteBoard = (boardId: string) => {
    setconfirmDeleteBoard(true);
    setDeleteID(boardId)
  };

  const confirmDelete = async () => {
    await deleteBoard(deleteID); // Assuming deleteBoard takes boardId as an argument
    setconfirmDeleteBoard(false);
    setconfirmDelete(true);
  };

  const handlePopUp = () => {
    setModalPopUp(true);
  };

  const cancelDelete = () => {
    setconfirmDeleteBoard(false);
    setconfirmCancel(true);
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-2">Your Boards</h2>
      <ul>
        {boards.map((board) => (
          <li key={board._id} onClick={() => handleBoardClick(board._id)}>
            {board.name}
            <button onClick={() => handleDeleteBoard(board._id)}>❌</button>
          </li>
        ))}
        <div
          className="flex items-baseline space-x-2 mr-8 rounded-r-full duration-500 ease-in-out cursor-pointer text-[#635fc7] px-5 py-4 hover:bg-[#635fc71a] hover:text-[#635fc7] dark:hover:bg-white"
          onClick={handlePopUp}
        >
          <img src="/icon-show-sidebar.svg" className="h-4 filter-white" />
          <p className="text-lg font-bold">Create New Board </p>
        </div>
        <CreateModal
          key={key} // Use the key to force remounting CreateModal
          isOpen={isModalOpen}
          onClose={() => setIsSidePanelOpen(false)}
          onCreateBoard={handleCreateBoard}
        />
        <DeleteConfirmationModal
          isOpen={!!confirmDeleteBoard}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      </ul>
    </div>
  );
};

export default BoardList;
