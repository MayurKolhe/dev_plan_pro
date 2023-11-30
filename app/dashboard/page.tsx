"use client";
import Board from "@/components/board/Board";
import DashBoard from "@/components/dashboard/DashBoard";
import { use } from "react";

export default function Dashboard() {
  return (
    <main>
      <DashBoard />
      <Board />
    </main>
  );
}
