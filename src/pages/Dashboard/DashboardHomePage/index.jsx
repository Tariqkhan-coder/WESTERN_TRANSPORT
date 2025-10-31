import React, { useState } from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardStatsCards from "./DashboardStatsCards";
import DashboardTabs from "./DashboardTabs";
import DashboardKanbanBoard from "./DashboardKanbanBoard";
import DashboardLoadStatusCards from "./DashboardLoadStatusCards";
import DashboardCalendarCards from "./DashboardCalendarCards";
import DashboardRightSidebar from "./DashboardRightSidebar";

export default function DashboardHomePage() {
  const [activeTab, setActiveTab] = useState("kanban");
  return (
    <div className="min-h-screen bg-[#0c0c0c] text-white font-sans">
      {/* Navbar */}
      <DashboardHeader />

      {/* Content */}
      <main className=" mx-auto w-full px-[10px] sm:px-[20px] py-6 grid  gap-6">
        {/* Left Section */}
        <div className="lg:col-span-9 space-y-6">
          <DashboardStatsCards />
        </div>
      </main>
    </div>
  );
}