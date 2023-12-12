import React from "react";
import ReactDOM from "react-dom";
import CreateModal from "../CreateBoard/CreateModal";

const CreateConfirmationPortal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onCreateBoard: (boardName: string) => void;
}> = ({ isOpen, onClose, onCreateBoard }) => {
  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="overlay">
      <CreateModal
        isOpen={isOpen}
        onClose={onClose}
        onCreateBoard={onCreateBoard}
      />
    </div>,
    document.body
  );
};

export default CreateConfirmationPortal;
