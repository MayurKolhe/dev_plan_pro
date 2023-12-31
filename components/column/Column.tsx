import { NotStarted, TypedCol } from "@/typings";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { Draggable, Droppable } from "react-beautiful-dnd";
import TodoCard from "../todocard/TodoCard";
import { useBoardStore } from "@/store/BoardStore";
import { useModalStore } from "@/store/ModalStore";


type Props = {
  id: TypedCol;
  todos: NotStarted[];
  index: number;
};
const idToCol: {
  [key in TypedCol]: string;
} = {
  "notstarted": "To Do",
  "inprogress": "In Progress",
  "done": "Done",
  "block":"Block"
}
const Column = ({ id, todos, index }: Props) => {

const [searchText]=useBoardStore((state)=>[state.searchText])
const openCard= useModalStore((state)=>state.openModal)

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {}
          <Droppable droppableId={index.toString()} type="card">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`p-2 rounded-xl shadow-sm ${
                  snapshot.isDraggingOver ? "bg-green-200" : "bg-white/50"
                }`}
              >
                <h2 className="flex justify-between font-bold text-xl p-2">
                  {idToCol[id]}
                  <span className="text-gray-500 bg-gray-200 rounded-full px-4 py-1 text-sm font-normal">{
                  !searchText? todos.length :todos.filter(
                    (todo)=> todo.title.toLowerCase()
                    .includes(searchText.toLowerCase())).length}</span>
                </h2>
                <div className="space-x-2">
                  {todos.map((todo, index) => {
                    if (
                      searchText &&
                      !todo.title.toLowerCase().includes(searchText.toLowerCase())
                    )
                      return null;


                    return(
                    <Draggable key={todo.$id}
                      draggableId={todo.$id}
                      index={index}>
                      {(provided) => (
                        <TodoCard
                          todo={todo}
                          index={index}
                          id={id}
                          innerRef={provided.innerRef}
                          draggableProps={provided.draggableProps}
                          dragHandleProps={provided.dragHandleProps}
                        />
                      )}
                    </Draggable>
                  );
                }
                  )}
                  {provided.placeholder}
                  <div className="flex items-end justify-end p-2">
                    <button 
                    onClick={openCard}
                    className="text-green-500 hover:text-green-600">
                      <PlusCircleIcon className="h-10 w-10"/>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default Column;
