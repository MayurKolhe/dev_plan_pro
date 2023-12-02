"use client";

import { useBoardStore } from "@/store/BoardStore";
import { useEffect } from "react";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import Column from "../column/Column";
import { Col } from "@/typings";

const Board = () => {
  const [board, getboard, setBoardState, updateDataBase] = useBoardStore(
    (state) => [state.board, state.getBoard, state.setBoardState, state.updateDataBase,]
  );

  useEffect(() => {
    getboard();
  }, [getboard]);

  const handleOnDragEnd = (dropresult: DropResult) => {
    const { destination, source, type } = dropresult;

    if (!destination) return;

    if (type === "column") {
      const entries = Array.from(board.columns.entries());
      const [removed] = entries.splice(source.index, 1);
      entries.splice(destination.index, 0, removed);
      const rearrangedCol = new Map(entries);
      setBoardState({
        ...board,
        columns: rearrangedCol,
      });
    }
    const columns = Array.from(board.columns);
    const startColIdx = columns[Number(source.droppableId)];
    const finishColIdx = columns[Number(destination.droppableId)];
    const startCol: Col = {
      id: startColIdx[0],
      todos: startColIdx[1].todos,
    };
    const finishCol: Col = {
      id: finishColIdx[0],
      todos: finishColIdx[1].todos,
    };

    if (!startCol || !finishCol) return;

    if (source.index === destination.index && startCol === finishCol) return;


    const newTodos = startCol.todos;
    const [todoMoved] = newTodos.splice(source.index, 1);

    if (startCol.id === finishCol.id) {
      newTodos.splice(destination.index, 0, todoMoved);
      const newCol = {
        id: startCol.id,
        todos: newTodos,
      };

      const newColumns = new Map(board.columns);
      newColumns.set(startCol.id, newCol);
      setBoardState({ ...board, columns: newColumns });
    } else {
      const finishTodos = Array.from(finishCol.todos);
      finishTodos.splice(destination.index, 0, todoMoved);

      const newColumns = new Map(board.columns);
      const newCol = {
        id: startCol.id,
        todos: newTodos,
      };
      newColumns.set(startCol.id, newCol);

      newColumns.set(finishCol.id, {
        id: finishCol.id,
        todos: finishTodos,
      });

      updateDataBase(todoMoved, finishCol.id);
      setBoardState({ ...board, columns: newColumns });
    }
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided) => (
          <div
            className="grid grid-cols-1 md:grid-cols-4 gap-5 max-w-7xl mx-auto"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {Array.from(board.columns.entries()).map(([id, column], index) => (
              <Column key={id} id={id} todos={column.todos} index={index} />
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Board;
