// DeleteConfirmationModal.tsx
import React from 'react';
import { useBoardStore } from '@/store/BoardStore';


type Props = {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

const DeleteConfirmationModal: React.FC<Props> = ({ isOpen, onConfirm, onCancel }) => {
  const { boardName } = useBoardStore();

  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-0 px-2 py-4 overflow-scroll scrollbar-hide  z-50 left-0 bottom-0 justify-center items-center flex dropdown">
      <div className=" scrollbar-hide overflow-y-scroll max-h-[95vh]  my-auto  bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto  w-full px-8  py-8 rounded-xl ">
        <h3 className=" font-bold text-red-500 text-xl  ">
          Are you Sure want to Delete {boardName}?
        </h3>

        <div className=" flex w-full mt-4 items-center justify-center space-x-4 ">
          <button
            onClick={onConfirm}
            className="w-full items-center text-white hover:opacity-75 bg-red-500 py-2 rounded-full"
          >
            Delete
          </button>
          <button
            onClick={onCancel}
            className="w-full items-center text-[#635fc7] dark:bg-white hover:opacity-75 bg-[#635fc71a]  py-2 rounded-full"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
