import { Board } from "@/typings";
import { format } from "path";
import formatedAiToDoTaks from "./formatedAiToDoTaks";

const fetchGivenSuggestions = async (board: Board) => {
    const formattedToDoTaks = formatedAiToDoTaks(board);

    console.log("formatted To Do Taks to send  : ",formattedToDoTaks)

    const response = await fetch("/api/aiSummerizer", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ todotaks: formattedToDoTaks }),
    });
    const OpenAIData = await response.json();
    const { content } = OpenAIData;
    return content;
}

export default fetchGivenSuggestions;