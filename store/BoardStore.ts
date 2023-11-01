import Column from "@/components/column/Column";
import { Board, Col, NotStarted, TypedCol } from "@/typings";
import { databases } from "@/util/appwrite";
import { getNotStartedGroupedByColumn } from "@/util/getNotStartedGroupedByColumn";
import { create } from "zustand";

interface BoardState {
  board: Board;
  getBoard: () => void;
  setBoardState: (bord: Board) => void;
  updateDataBase: (todo: NotStarted, columnId: TypedCol) => void;
}

export const useBoardStore = create<BoardState>((set) => ({
    board: {
        columns: new Map<TypedCol , Col>()
    },
    getBoard: async () => {
        const board = await getNotStartedGroupedByColumn();
        set({ board });
    },
    setBoardState: (board) => set({ board }),

    updateDataBase: async (todo, columnId) => {
        await databases.updateDocument(
          process.env.NEXT_PUBLIC_DATABASE_ID!,
          process.env.NEXT_PUBLIC_CARDS_COLLECTION_ID!,
          todo.$id,
          {
            title: todo.title,
            status: columnId,
          }
        );
    },
}));