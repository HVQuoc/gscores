import { NavLink } from "react-router";
import clsx from "clsx";
import {
  Menu,
  House,
  Search,
  ChartColumn,
  Award,
  ArrowLeftToLine,
  ArrowRightToLine,
} from "lucide-react";

export const NAV_ITEMS = [
  {
    to: "/",
    label: "Dashboard",
    icon: <House />,
  },
  {
    to: "/search-scores",
    label: "Search Scores",
    icon: <Search />,
  },
  {
    to: "/reports",
    label: "Reports",
    icon: <ChartColumn />,
  },
  {
    to: "/top-scores",
    label: "Top Scores",
    icon: <Award />,
  },
];

const Sidebar = ({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
}) => {
  return (
    <aside className={clsx(
        "flex h-full flex-col transition-all duration-200 bg-white",
        collapsed ? "w-12" : "w-52"
      )}>
      <nav className="flex-grow">
        <h2 className="py-4 px-2 text-lg text-center uppercase">{collapsed?(<Menu />): "MENU"}</h2>
        <ul className="flex h-full flex-col space-y-1.5 my-2">
          {NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  clsx(
                    `flex items-center gap-2.5 rounded px-2 py-1.5 text-sm hover:bg-gray-100`,
                    isActive && `bg-indigo-100 font-medium text-indigo-900`
                  )
                }
              >
                {item.icon && <span>{item.icon}</span>}
                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className={clsx("pb-2", collapsed ? "" : "text-right")}>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 mr-4  rounded hover:bg-gray-100"
        >
          {collapsed ? (
            <ArrowRightToLine className="h-5 w-5" />
          ) : (
            <ArrowLeftToLine className="h-5 w-5" />
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
