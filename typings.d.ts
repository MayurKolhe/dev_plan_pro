export {Board , TypedCol , Col, NotStarted,TaskType, Image }

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
    Image?: string;
    user: string;
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
