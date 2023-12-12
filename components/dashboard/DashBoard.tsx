import { useBoardStore } from "@/store/BoardStore";
import fetchGivenSuggestions from "@/util/fetchGivenSuggestions";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import React, { useCallback, useEffect, useState } from "react";

const DashBoard = () => {
  const [board] = useBoardStore((state) => [state.board]);

  const [loading, setLoading] = useState<boolean>(false);
  const [givenSuggestion, setgivenSuggestion] = useState<string>("");
  const { data: session } = useSession();
  const userName: string = session?.user?.name ?? "";

  const updateGivenSuggestion = useCallback(async () => {
    setLoading(true);
    const suggestion = await fetchGivenSuggestions(board, userName);
    setgivenSuggestion(suggestion);
    setLoading(false);
  }, [board, userName]);

  useEffect(() => {
    // Initial check
    if (board.columns.size === 0) {
      setgivenSuggestion(
        `Hello ${userName} You don't have any board created. No tasks for the day. Create a board to get started!`
      );
    } else {
      updateGivenSuggestion();
    }

    // Set up an interval to periodically check the condition
    const intervalId = setInterval(() => {
      if (board.columns.size === 0) {
        setgivenSuggestion(
          `Hello ${userName} You don't have any board created. No tasks for the day. Create a board to get started!`
        );
      } else {
        updateGivenSuggestion();
      }
    }, 50000); 
    return () => clearInterval(intervalId);
  }, [board, userName, updateGivenSuggestion]);
  
  

  return (
    <div className="flex items-center justify-center px-5 py-3 md:py-5">
      <div
        className="absolute
      top-0
      left-0
      w-full
      h-96
      bg-gradient-to-br
    from-blue-500
    to-[#2b2c37]
    rounded-md
    filter
    blur-3xl
    opacity-50
    -z-50"
      />
      <p className=" flex items-center text-base font-light p-5 pr-5 shadow-xl rounded-xl w-fit bg-white italic max-w-3xl text-[#d19200]">
        <UserCircleIcon
          className={`inline-block h-10 w-10 text-[#d19200] mr-2 ${
            loading && "animate-spin"
          }`}
        />
        {givenSuggestion && !loading
          ? givenSuggestion
          : "GPT is summmerising your tasks for the day....."}
      </p>
    </div>
  );
};

export default DashBoard;
