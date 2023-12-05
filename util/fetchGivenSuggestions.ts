import { Board } from "@/typings";
import formatedAiToDoTaks from "./formatedAiToDoTaks";

const fetchGivenSuggestions = async (board: Board, userName: string) => {
  const formattedToDoTaks = formatedAiToDoTaks(board);

  console.log("formatted To Do Taks to send  : ", formattedToDoTaks);

  const response = await fetch("/api/aiSummerizer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ todotaks: formattedToDoTaks, userName: userName }),
  });
  const OpenAIData = await response.json();
  const { content } = OpenAIData;
  return content;
};

export default fetchGivenSuggestions;
