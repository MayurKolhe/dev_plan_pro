import React, { useState } from 'react';
import { getSession } from 'next-auth/react';
import { useBoardStore } from '@/store/BoardStore';

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateBoard: (boardName: string) => void;
}

const CreateModal: React.FC<CreateModalProps> = ({ isOpen, onClose, onCreateBoard }) => {

    const  [CreateBoard ,setIsSidePanelOpen,isModalOpen,setModalPopUp]= useBoardStore((state)=> [ state.CreateBoard,
    state.setIsSidePanelOpen,
    state.isModalOpen,
    state.setModalPopUp

])

    console.log("In Create Board")
    console.log("isOpen",isOpen)
  const [boardName, setBoardName] = useState('');


  const handleCreateBoard = async() => {
    if (boardName.trim() !== '') {
      CreateBoard(boardName);
      setIsSidePanelOpen(false);
      setModalPopUp(false)
      onClose();

    }
  };

  

  return (
    <div className={`modal ${isOpen ? 'open' : 'closed'}`}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>Create New Board</h2>
          <span className="close" onClick={onClose}>
            &times;
          </span>
        </div>
        <div className="modal-body">
          <label htmlFor="boardName">Board Name:</label>
          <input
            type="text"
            id="boardName"
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
          />
        </div>
        <div className="modal-footer">
          <button onClick={handleCreateBoard}>Create</button>
        </div>
      </div>
    </div>
  );
};

export default CreateModal;
