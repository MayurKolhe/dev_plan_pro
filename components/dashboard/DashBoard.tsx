import { useBoardStore } from "@/store/BoardStore";
import fetchGivenSuggestions from "@/util/fetchGivenSuggestions";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const DashBoard = () => {
  const [board] = useBoardStore((state) => [state.board]);

  const [loading, setLoading] = useState<boolean>(false);
  const [givenSuggestion, setgivenSuggestion] = useState<string>("");
  const { data: session } = useSession();
  const userName = session?.user?.name;

  useEffect(() => {
    if (board.columns.size === 0) return;
    setLoading(true);
    const givenSuggestionFunc = async () => {
      const givenSuggestion = await fetchGivenSuggestions(board, userName);
      setgivenSuggestion(givenSuggestion);
      setLoading(false);
    };
    givenSuggestionFunc();
  }, [board]);

  return (
    <div className="flex items-center justify-center px-5 py-3 md:py-5">
      <div
        className="absolute
      top-0
      left-0
      w-full
      h-96
      bg-gradient-to-br
    from-pink-400
    to-[#FF9933]
    rounded-md
    filter
    blur-3xl
    opacity-50
    -z-50"
      />
      <p className=" flex items-center text-sm font-light p-5 pr-5 shadow-xl rounded-xl w-fit bg-white italic max-w-3xl text-[#d19200]">
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
