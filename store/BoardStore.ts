import Column from "@/components/column/Column";
import { Board, Col, NotStarted, TypedCol,Image,BoardObject } from "@/typings";
import { getNotStartedGroupedByColumn } from "@/util/getNotStartedGroupedByColumn";
import { get } from "node:https";
import { create } from "zustand";
import { getSession } from 'next-auth/react';




interface BoardState {

  board: Board;
  boards: BoardObject[];
  searchText: string;
  image: File | null ;
  newTask:string;
  newTaskType:TypedCol;
  isSidePanelOpen:boolean;
  isModalOpen:boolean;
  deleteID:string,
  confirmDeleteBoard:boolean;
  deleteConfirm:boolean;
  confirmCancel:boolean;
 
  getBoard: () => void; 
  setBoardState: (bord: Board) => void;
  updateDataBase: (todo: NotStarted, columnId: TypedCol) => void;
  setSearch: (searchText: string) => void;
  setNewTask:(input:string)=>void;
  setSelectedBoard:(input:string)=>void;
  setIsSidePanelOpen:(input:boolean)=>void;
  setModalPopUp:(input:boolean)=>void
  setconfirmDeleteBoard:(input:boolean)=>void;
  setconfirmDelete:(input:boolean)=>void;
  setconfirmCancel:(input:boolean)=>void;
  setDeleteID:(input:string)=>void;
  
 
  setNewTaskType:(columnId: TypedCol)=>void;
  setImage: (image: File | null ) => void;
  
  addTask: (todo: string, columnId: TypedCol, image?: File | null) => void,
  deleteTask: (taskIndex: number, todoId: NotStarted, id: TypedCol) => void,
  deleteBoard:(boardID:string)=>void,

  CreateBoard: (boardName: string) => void

 
}
var fileResult:string;
var boardID: string;


function convertImage(fileImage: any): Promise<string | undefined> {

  
  console.log('in convert image', fileImage);

  return new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.readAsDataURL(fileImage);

      reader.onload = () => {
          console.log(reader.result);
          let output = reader.result as string;
          resolve(output);
      };

      reader.onerror = () => {
          reject(undefined);
      };
  });
}
// Import necessary dependencies

export const getAllBoards = async () => {
  const session = await getSession();

  try {
    const res = await fetch(`api/getAllBoards?email=${session?.user?.email}`, {
      method: 'GET',
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch boards");
    }

    const data = await res.json();
    console.log("Boards Associated with the users",data)
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};



export const useBoardStore = create<BoardState>((set) => (
  {
    board: {
        columns: new Map<TypedCol , Col>()
    },
    boards:[],
    searchText: "",
    newTask:"",
    isSidePanelOpen:false,
    isModalOpen:false,
    
    setSearch: (searchText: string) => set({searchText}),

    getBoard: async () => {
      const fetchedBoards = await getAllBoards();
      set({ boards: fetchedBoards.user });
  
      if (fetchedBoards.user.length > 0) {
        const firstBoard = fetchedBoards.user[0];
        sessionStorage.setItem("boardID",fetchedBoards.user[0]._id)
        console.log("BFirst",firstBoard)
        const board = await getNotStartedGroupedByColumn();
        set({ board });
      }
    },

    newTaskType:"notstarted",
    image: null,
    confirmDeleteBoard:false,
    deleteConfirm:false,
    confirmCancel:false,
    deleteID:" ",
    setIsSidePanelOpen:(input)=>set({isSidePanelOpen:input}),
    setImage: (image) => set({ image }),
    setBoardState: (board) => set({ board }),
    setNewTask: (input:string)=>set({newTask:input}),
    setModalPopUp:(input)=>set({isModalOpen:input}),
    setDeleteID:(input)=>set({deleteID:input}),
   
    setNewTaskType: (columnId) => set({newTaskType:columnId}),
    setSelectedBoard: async (boardID)=>{
      sessionStorage.setItem("boardID",boardID)
      const board = await getNotStartedGroupedByColumn();
      set({ board });
    },
   
    setconfirmDeleteBoard:(input:boolean)=>set({confirmDeleteBoard:input}),
    setconfirmDelete:(input:boolean)=>set({deleteConfirm:input}),
    setconfirmCancel:(input:boolean)=>set({confirmCancel:input}),
    updateDataBase: async (todo, columnId) => {
      const todoIdToUpdate = todo.$id; // Replace with the actual ID of the todo you want to update
      const session= await getSession();
      const updateData = {
        $id:todo.$id ,
        createdAt:todo.createdAt,
        image:todo.Image,
        status: columnId,
        boardID: sessionStorage.getItem("boardID"),
        title: todo.title
};

        await fetch("api/updateCard", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            $id: todo.$id,
            createdAt: todo.createdAt,
            image: todo.Image,
            status: columnId,
            boardID: sessionStorage.getItem("boardID"),
            title: todo.title,
          }),
        })
          .then(response => response.json())
          .then(data => console.log(data))
          .catch(error => console.error('Error updating todo:', error));

    },
    addTask: async (todo, columnId, image ) => {

        const session= await getSession();

      let file: Image | undefined
      convertImage(image).then((result) => {
          if (result !== undefined) {
              fileResult= result;
              console.log('Base64:', fileResult);
          } else {
              console.error('Error converting image to base64.');
          }
      })
      .catch((error) => {
          console.error('Error:', error);
      });

      
        try {
            const res=await fetch("api/addCard", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: todo,
              status: columnId,
              Image: fileResult,
              boardID: sessionStorage.getItem("boardID")
            }),
          })

          const responseData = await res.json();
          var generatedId = responseData.message[0]._id;
        } catch (error) {
          console.log("Error during registration: ", error);
        }

      // update board
      set({ newTask: '' })
      
      set(state => {
          const newColumns = new Map(state.board.columns)

          const newTodo: NotStarted = {
              $id:generatedId,
              title: todo,
              status: columnId,
              Image: fileResult,
              boardID: sessionStorage?.getItem("boardID") as string | undefined,
              createdAt: new Date().toISOString(),
              
          }

          const column = newColumns.get(columnId)

          if (!column) {
              newColumns.set(columnId, {
                  id: columnId,
                  todos: [newTodo],
              })
          } else {
              newColumns.get(columnId)?.todos.push(newTodo)
          }

          return {
              board: {
                  columns: newColumns,
              }
          }
      })
  },

  deleteTask: async (taskIndex, todo, id) => {
     try {
      console.log("todo",todo)
      const res=await fetch("api/deleteCard", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id:todo.$id
      }),
    })

    // const responseData = await res.json();
    // var generatedId = responseData.message[0]._id;
  } catch (error) {
    console.log("Error during registration: ", error);
  }
  const board = await getNotStartedGroupedByColumn();

  set({ board });
  },
  deleteBoard:async(boardID)=>{
    console.log("BoardID",boardID)
    try {
      const res=await fetch("api/deleteBoard", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id:boardID
      }),
    })

    // const responseData = await res.json();
    // var generatedId = responseData.message[0]._id;
  } catch (error) {
    console.log("Error during registration: ", error);
  }
  const board = await getNotStartedGroupedByColumn();

  set({ board });
  },
  CreateBoard: async(boardName)=>{

    const session=  await getSession();
    try {
      const res=await fetch("api/addBoard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
          name:boardName,
          email:session?.user?.email,
      }),
    })

    const responseData = await res.json();
    console.log("respnse data",responseData)
   boardID=responseData.value[0]._id;
   sessionStorage.setItem("boardID",boardID)

   const board = await getNotStartedGroupedByColumn();

   set({ board });
  } catch (error) {
    console.log("Error during registration: ", error);
  }
  }

}));