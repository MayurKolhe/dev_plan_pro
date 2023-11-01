import { Models } from "appwrite";

interface Board {
  columns: Map<TypedCol, Col>;
}

type TypedCol = "notstarted" | "inprogress" | "done" | "block";

interface Col {
  id: TypedCol;
  todos: NotStarted[];
}

interface NotStarted {
    $id: string;
    title: string;
    status: TypedCol;
    image?: Image;
    $createdAt: string;
}

interface Image {
    id: string;
    fileId: string;
}
