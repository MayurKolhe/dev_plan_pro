import { Board, Col, NotStarted, TypedCol } from "@/typings";
import { databases } from "@/util/appwrite"


export const getNotStartedGroupedByColumn = async () => {

     const getTodo= async () => {
        try {
          const res = await fetch("api/dashboard", {
            method: 'GET',
            cache: "no-store"
          });
      
          if (!res.ok) {
            throw new Error("Failed to fetch data");
          }
          const data = await res.json();
          console.log('data', data)
          return data;
        } catch (error) {
          console.error(error);
          throw error; // Propagate the error further if needed
        }
      };
      

    // const data = await databases.listDocuments(
    //   process.env.NEXT_PUBLIC_DATABASE_ID!,
    //   process.env.NEXT_PUBLIC_CARDS_COLLECTION_ID!
    // );
        
    const data= await getTodo();
    const jsonResponseArray: any[] = data.todo;
  
  // Initialize a Map to store results
  const resultMap = new Map<TypedCol, Col>();
  
  // Process each JSON response in the array
  jsonResponseArray.forEach((jsonResponse: { _id: any, status: any; image?: any, title: any; createdAt: any; }) => {
    console.log('jsonResponse',jsonResponse)
    const { _id, title, status, image, createdAt } = jsonResponse;
    const typedColStatus: TypedCol = status as TypedCol;
    
  
    // Create the NotStarted object
    const notStartedObj: NotStarted = { $id: jsonResponse._id, title, status: typedColStatus, image ,createdAt };
  
    // Check if there's an existing entry with the same status
    const existingEntry = resultMap.get(typedColStatus);
  
    if (existingEntry) {
      // If the entry exists, add the NotStarted object to its todos
      existingEntry.todos.push(notStartedObj);
    } else {
      // If the entry doesn't exist, create a new entry
      resultMap.set(typedColStatus, { id: typedColStatus, todos: [notStartedObj] });
    }
  });
  
  console.log(resultMap);

    


   const todos=data.documents
      // const todos =list.todo;

    

    // const columns = todos.reduce((acc, NotStarted) => {
    //     if (!acc.get(NotStarted.status)) {
    //         acc.set(NotStarted.status, {
    //             id: NotStarted.status,
    //             todos: []
    //         })
    //     }
    //     acc.get(NotStarted.status)!.todos.push({
    //         $id: NotStarted.$id,
    //         $createdAt: NotStarted.$creatxedAt,
    //         title: NotStarted.title,
    //         status: NotStarted.status,
    //         ...(NotStarted.image && { image: JSON.parse(NotStarted.image) })
    //     });

    //     return acc;
    // }, new Map<TypedCol, Col>);   
    
    // const columns = todos.reduce((acc, todo) => {
    //     console.log("acc",acc)
    //     if (!acc.get(todo.status)) {
    //       acc.set(todo.status, {
    //         id: todo.status,
    //         todos: []
    //       });
    //     }
      
    //     acc.get(todo.status)!.todos.push({
    //       $id: todo.$id, // Assuming the ID property in your 'todos' array is named 'id'
    //       createdAt: todo.createdAt, // Assuming the createdAt property in your 'todos' array is named 'createdAt'
    //       title: todo.title,
    //       status: todo.status,
    //       ...(todo.image && { image: { id: todo.image.fileId, fileId: todo.image.fileId } })
    //     });
      
    //     return acc;
    //   }, new Map<TypedCol, Col>()); 

    const columns= resultMap;




    const colTypes: TypedCol[] = ["notstarted", "inprogress", "done", "block"];
    for (const colType of colTypes) {
        if (!columns.get(colType)) {
            columns.set(colType, {
                id: colType,
                todos: []
            });
        }
    }

    const sortedColums = new Map(Array.from(columns.entries()).sort(
        (a, b) => colTypes.indexOf(a[0]) - colTypes.indexOf(b[0])
    ));


    const board: Board = {
        columns: sortedColums
    }
    return board;   
}