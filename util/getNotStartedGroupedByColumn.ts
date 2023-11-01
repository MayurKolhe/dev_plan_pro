import { Board, Col, TypedCol } from "@/typings";
import { databases } from "@/util/appwrite"
import { todo } from "node:test";

export const getNotStartedGroupedByColumn = async () => {
    const data = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_CARDS_COLLECTION_ID!
    );

    const todos = data.documents;

    const columns = todos.reduce((acc, NotStarted) => {
        if (!acc.get(NotStarted.status)) {
            acc.set(NotStarted.status, {
                id: NotStarted.status,
                todos: []
            })
        }
        acc.get(NotStarted.status)!.todos.push({
            $id: NotStarted.$id,
            $createdAt: NotStarted.$createdAt,
            title: NotStarted.title,
            status: NotStarted.status,
            ...(NotStarted.image && { image: JSON.parse(NotStarted.image) })
        });

        return acc;
    }, new Map<TypedCol, Col>);    

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