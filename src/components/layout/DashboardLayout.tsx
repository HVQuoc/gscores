import { Outlet } from "react-router";
import { useState } from "react";
import clsx from "clsx";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  return (
    <main className={clsx(
        "font-rubik grid min-h-dvh",
        sidebarCollapsed
          ? "grid-cols-[50px_auto]"
          : "grid-cols-[200px_auto]"
      )}>
      <div className="border-r border-gray-300">
        <Sidebar
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
        />
      </div>
      <div className="grid max-h-dvh grid-rows-[auto_1fr] overflow-clip bg-gray-50">
        <div className="border-b border-gray-300">
          <Header />
        </div>
        <div
          className="overflow-y-auto px-8 py-3"
          style={{
            scrollbarGutter: 'stable',
          }}
        >
          <Outlet />
        </div>
      </div>
    </main>
  )
}

export default Dashboard
