"use client";

import { NotStarted, TypedCol } from "@/typings";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { useBoardStore } from "@/store/BoardStore";
import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
} from "react-beautiful-dnd";

type Props = {
  todo: NotStarted;
  index: number;
  id: TypedCol;
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
};
const TodoCard = ({
  todo,
  index,
  id,
  innerRef,
  draggableProps,
  dragHandleProps,
}: Props) => {
  const cardClass =
    id === "block" ? "bg-red-500" : id === "done" ? "bg-green-500" : "bg-white";

    const deleteTask = useBoardStore((state) => state.deleteTask);


  return (
    <div
      className={`mt-1 rounded-md space-y-20 drop-shadow-md ${cardClass}`}
      {...draggableProps}
      {...dragHandleProps}
      ref={innerRef}
    >
      <div className="flex justify-between items-center p-5">
        <p>{todo.title}</p>
        <button className="text-rose-500 hover:text-rose-600"
        onClick={() => deleteTask(index, todo, id)}>
          <XCircleIcon className="ml-5 h-8 w-8" />
        </button>
      </div>
    </div>
  );
};

export default TodoCard;
