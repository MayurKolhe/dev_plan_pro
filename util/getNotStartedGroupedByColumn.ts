import { Board, Col, NotStarted, TypedCol } from "@/typings";
import { databases } from "@/util/appwrite";
import { getSession } from "next-auth/react";
import { useBoardStore } from "@/store/BoardStore";

export const getNotStartedGroupedByColumn = async () => {
  const getTodo = async () => {
    const session = await getSession();
    const boardID = sessionStorage.getItem("boardID");
    try {
      const res = await fetch(`api/getEmailByUser?email=${boardID}`, {
        method: "GET",
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const data = await getTodo();
  const jsonResponseArray: any[] = data.user;

  // Initialize a Map to store results
  const resultMap = new Map<TypedCol, Col>();

  // Process each JSON response in the array

  if (jsonResponseArray.length > 0) {
    jsonResponseArray.forEach((originalJsonResponse) => {
      // Declare jsonResponse within the loop to reset it in each iteration
      const jsonResponse = { ...originalJsonResponse }; // Creating a copy of the original object
      const { boardID, createdAt, status, title, updatedAt, Image, _id } =
        jsonResponse;

      const typedColStatus = status as TypedCol; // assuming TypedCol is a valid type
      const notStartedObj = {
        $id: jsonResponse._id,
        title,
        status: typedColStatus,
        boardID,
        createdAt,
      };

      const existingEntry = resultMap.get(typedColStatus);

      if (existingEntry) {
        existingEntry.todos.push(notStartedObj);
      } else {
        resultMap.set(typedColStatus, {
          id: typedColStatus,
          todos: [notStartedObj],
        });
      }
    });
  }

  const todos = data.documents;
  const columns = resultMap;

  const colTypes: TypedCol[] = ["notstarted", "inprogress", "done", "block"];
  for (const colType of colTypes) {
    if (!columns.get(colType)) {
      columns.set(colType, {
        id: colType,
        todos: [],
      });
    }
  }

  const sortedColums = new Map(
    Array.from(columns.entries()).sort(
      (a, b) => colTypes.indexOf(a[0]) - colTypes.indexOf(b[0])
    )
  );

  const board: Board = {
    columns: sortedColums,
  };
  return board;
};
