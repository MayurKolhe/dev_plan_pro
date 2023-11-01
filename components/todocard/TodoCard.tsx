'use client';

import { NotStarted, TypedCol } from "@/typings";
import { XCircleIcon } from "@heroicons/react/24/outline";
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
    return <div
    className="bg-white rounded-md space-y-20 drop-shadow-md"
        {...draggableProps} {...dragHandleProps} ref={innerRef}>
        <div className="flex justify-between items-center p-5">
            <p>{todo.title}</p>
            <button className="text-rose-500 hover:text-rose-600">
                <XCircleIcon className="ml-5 h-8 w-8"/>
            </button>
        </div>
        </div>;
};

export default TodoCard;
