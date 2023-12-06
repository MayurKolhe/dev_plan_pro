export {Board , TypedCol , Col, NotStarted,TaskType, Image, BoardObject }

interface Board {
  columns: Map<TypedCol, Col>;
}

interface BoardObject {
  _id: string;
  name: string;
  email: string;
  createdAt:string;
  updatedAt: string;

}

type TypedCol = "notstarted" | "inprogress" | "done" | "block" ;

interface Col {
  id: TypedCol;
  todos: NotStarted[];
}

interface NotStarted {
    $id: string;
    title: string;
    status: TypedCol;
    Image?:  Image | undefined;
    boardID?: string |undefined;
    createdAt: string;
}

interface Image {
   name: string
}

interface TaskType {
  id: TypedCol,
  name: string,
  description: string,
  color: string,
  ringColor: string,
}
