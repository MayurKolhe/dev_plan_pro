import Column from "@/components/column/Column";
import { Board, Col, NotStarted, TypedCol } from "@/typings";
import { getNotStartedGroupedByColumn } from "@/util/getNotStartedGroupedByColumn";
import { create } from "zustand";

interface BoardState {

  board: Board;
  searchText: string;
  image: File | null;
  newTask:string;
  newTaskType:TypedCol;

  getBoard: () => void;
  setBoardState: (bord: Board) => void;
  updateDataBase: (todo: NotStarted, columnId: TypedCol) => void;
  setSearch: (searchText: string) => void;
  setNewTask:(input:string)=>void;
  setNewTaskType:(columnId: TypedCol)=>void;
  setImage: (image: File | null) => void;
  convertImage:(image:File |null) => void;

  // addTask: (todo: string, columnId: TypedCol, image?: File | null) => void,
  // deleteTask: (taskIndex: number, todoId: NotStarted, id: TypedCol) => void,

}

export const useBoardStore = create<BoardState>((set) => ({
    board: {
        columns: new Map<TypedCol , Col>()
    },
    searchText: "",
    newTask:"",
    setSearch: (searchText: string) => set({searchText}),

    getBoard: async () => {
        const board = await getNotStartedGroupedByColumn();

        set({ board });
    },

    newTaskType:"notstarted",
    image: null,
    setImage: (image) => set({ image }),
    convertImage: async (image)=>{

      if(image!=null){
       
        console.log('in convert image',image)
        var reader= new FileReader();
        reader.readAsDataURL(image)
        reader.onload= ()=>{
          console.log(reader.result)
        };
        reader.onerror= error=>
        {
          console.log("eroor, error")
        }

        
      }


       
      

    },

    setBoardState: (board) => set({ board }),
    setNewTask: (input:string)=>set({newTask:input}),
    setNewTaskType: (columnId) => set({newTaskType:columnId}),

    updateDataBase: async (todo, columnId) => {
      const todoIdToUpdate = todo.$id; // Replace with the actual ID of the todo you want to update
      const updateData = {
        $id:todo.$id ,
        createdAt:todo.createdAt,
        image:todo.image,
        status: columnId,
        title: todo.title
};


        // await databases.updateDocument(
        //   process.env.NEXT_PUBLIC_DATABASE_ID!,
        //   process.env.NEXT_PUBLIC_CARDS_COLLECTION_ID!,
        //   todo.$id,
        //   {
        //     title: todo.title,
        //     status: columnId,
        //   }
        // );

        // await fetch("api/updateCard", {
        //   method: "PUT",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({$id:todo.$id ,
        //     createdAt:todo.createdAt,
        //     image:todo.image,
        //     status: columnId,
        //     title: todo.title}),
        // }) .then(response => response.json())
        // .then(data => console.log(data))
        // .catch(error => console.error('Error updating todo:', error));

        await fetch("api/updateCard", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            $id: todo.$id,
            createdAt: todo.createdAt,
            image: todo.image,
            status: columnId,
            title: todo.title,
          }),
        })
          .then(response => response.json())
          .then(data => console.log(data))
          .catch(error => console.error('Error updating todo:', error));

    },
}));