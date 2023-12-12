import React from "react";
import ReactDOM from "react-dom";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";

const DeleteConfirmationPortal: React.FC<{
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}> = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="overlay">
      <DeleteConfirmationModal
        isOpen={isOpen}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    </div>,
    document.body
  );
};

export default DeleteConfirmationPortal;
