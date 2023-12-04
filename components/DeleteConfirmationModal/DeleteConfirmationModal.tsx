// DeleteConfirmationModal.tsx
import React from 'react';
import { useBoardStore } from '@/store/BoardStore';


type Props = {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

const DeleteConfirmationModal: React.FC<Props> = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-md shadow-md">
        <p className="text-lg mb-4">Are you sure you want to delete this board?</p>
        <div className="flex justify-end">
          <button className="bg-red-500 text-white px-4 py-2 mr-2" onClick={onConfirm}>
            Yes
          </button>
          <button className="bg-gray-300 px-4 py-2" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
