import { Board, Col, NotStarted, TypedCol } from "@/typings";
import { databases } from "@/util/appwrite"
import { getSession } from 'next-auth/react';
import { useBoardStore } from '@/store/BoardStore';

export const getNotStartedGroupedByColumn = async () => {

     const getTodo= async () => {

      const session= await getSession();
      const boardID=sessionStorage.getItem("boardID")
        try {
          const res = await fetch(`api/getEmailByUser?email=${boardID}`, {
            method: 'GET',
            cache: "no-store", 
          });
      
          if (!res.ok) {
            throw new Error("Failed to fetch data");
          }
          const data = await res.json();
          console.log("data",data)
          
          return data;
        } catch (error) {
          console.error(error);
          throw error; 
        }
      }
        
    const data= await getTodo();
    const jsonResponseArray: any[] = [data.user];

    console.log("jsonResponseArray", data)
  
  // Initialize a Map to store results
  const resultMap = new Map<TypedCol, Col>();
  
  // Process each JSON response in the array

  if (jsonResponseArray[0].length > 0) {
    // Process each JSON response in the array
    jsonResponseArray.forEach((jsonResponse: { _id: any, status: any; Image?: any, title: any; boardID: any, createdAt: any; }) => {
      console.log('jsonResponse', jsonResponse);
      const { _id, title, status, Image, boardID, createdAt } = jsonResponse[0];
      console.log("_id, title, status, Image, boardID, createdAt ", _id, title, status, Image, boardID, createdAt)
      const typedColStatus: TypedCol = status as TypedCol;
  
      // Create the NotStarted object
      const notStartedObj: NotStarted = { $id: jsonResponse._id, title, status: typedColStatus, Image, boardID, createdAt };
  
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
  }

   const todos=data.documents
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