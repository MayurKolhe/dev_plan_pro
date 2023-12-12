"use client";
import Board from "@/components/board/Board";
import DashBoard from "@/components/dashboard/DashBoard";
import SideBar from "@/components/Sidebar/Sidebar";

export default function Dashboard() {

  return (
    <main>
      <DashBoard />
      <SideBar/>
       <Board />

    </main>
  );
}
