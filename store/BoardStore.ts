import Column from "@/components/column/Column";
import { Board, Col, NotStarted, TypedCol,Image } from "@/typings";
import { getNotStartedGroupedByColumn } from "@/util/getNotStartedGroupedByColumn";
import { get } from "node:https";
import { create } from "zustand";
import { getSession } from 'next-auth/react';

interface BoardState {

  board: Board;
  searchText: string;
  image: File | null ;
  newTask:string;
  newTaskType:TypedCol;
  

  getBoard: () => void;
  setBoardState: (bord: Board) => void;
  updateDataBase: (todo: NotStarted, columnId: TypedCol) => void;
  setSearch: (searchText: string) => void;
  setNewTask:(input:string)=>void;
  setNewTaskType:(columnId: TypedCol)=>void;
  setImage: (image: File | null ) => void;
  
  addTask: (todo: string, columnId: TypedCol, image?: File | null) => void,
  deleteTask: (taskIndex: number, todoId: NotStarted, id: TypedCol) => void,

 
}
var fileResult:string;


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


export const useBoardStore = create<BoardState>((set) => (
  {
   
  
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
    

    setBoardState: (board) => set({ board }),
    setNewTask: (input:string)=>set({newTask:input}),
    setNewTaskType: (columnId) => set({newTaskType:columnId}),

    updateDataBase: async (todo, columnId) => {
      const todoIdToUpdate = todo.$id; // Replace with the actual ID of the todo you want to update
      const session= await getSession();
      const updateData = {
        $id:todo.$id ,
        createdAt:todo.createdAt,
        image:todo.Image,
        status: columnId,
        user: session?.user?.email!==null &&  session?.user?.email!==undefined ?  session?.user?.email: ' ',
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
            user: session?.user?.email!==null &&  session?.user?.email!==undefined ?  session?.user?.email: ' ',
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
              user: session?.user?.email
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
              user: session?.user?.email!=null && session.user.email !=undefined? session.user.email: 'null',
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

  

  // set(state => {
  //   const newColumns = new Map(state.board.columns)

    // const newTodo: NotStarted = {
    //     $id:generatedId,
    //     title: todo,
    //     status: columnId,
    //     Image: fileResult,
    //     createdAt: new Date().toISOString(),
        
    // }

//     const column = newColumns.get(columnId)

//     if (!column) {
//         newColumns.set(columnId, {
//             id: columnId,
//             todos: [newTodo],
//         })
//     } else {
//         newColumns.get(columnId)?.todos.push(newTodo)
//     }

//     return {
//         board: {
//             columns: newColumns,
//         }
//     }
// })


      // delete todoId from newColumns
      // do it in an optimistic way
      // newColumns.get(id)?.todos.splice(taskIndex, 1)

      // set({ board: { columns: newColumns } })

      // if (todo.image) {
      //     await storage.deleteFile(todo.image.bucketId, todo.image.fileId)
      // }

      // await databases.deleteDocument(
      //     process.env.NEXT_PUBLIC_DATABASE_ID!,
      //     process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      //     todo.$id,
      // )
  },

}));