import { Outlet } from "react-router";
import { useState } from "react";
import clsx from "clsx";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MobileNavigation from "./MobileNavigation";

const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  return (
    <main
      className={clsx(
        "font-rubik min-h-dvh",
        "grid md:grid-cols-[var(--sidebar-width)_auto]",
        sidebarCollapsed && "md:grid-cols-[56px_auto]"
      )}
      style={
        {
          "--sidebar-width": "200px",
        } as React.CSSProperties
      }
    >
      <div className="border-r border-gray-300 hidden md:block">
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
            scrollbarGutter: "stable",
          }}
        >
          <Outlet />
        </div>
      </div>
      <MobileNavigation />
    </main>
  );
};

export default Dashboard;
