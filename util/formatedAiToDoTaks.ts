import { Board, NotStarted, TypedCol } from "@/typings";

const formatedAiToDoTaks = (board: Board) => {
    const todos = Array.from(board.columns.entries());

    const formattedToDoTaks = todos.reduce((map, [key, value]) => {
      map[key] = value.todos;
      return map;
    }, {} as { [key in TypedCol]: NotStarted[] });

    const formattedToDoTaksCounted = Object.entries(formattedToDoTaks).reduce(
        (map, [key, value]) => {
            map[key as TypedCol] = value.length;
            return map;
        },
        {} as { [key in TypedCol]: number }
    );

    return formattedToDoTaksCounted;
}

export default formatedAiToDoTaks;