import { NavLink } from "react-router"
import { NAV_ITEMS } from "./Sidebar"

const MobileNavigation = () => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 flex justify-around items-center h-16">
      {NAV_ITEMS.map((item) => (
        <NavLink
          to={item.to}
          key={item.to}
          className={({ isActive }) =>
            [
              "flex flex-col items-center",
              "hover:text-gray-900",
              isActive ? "text-indigo-600 scale-110" : "text-gray-600"
            ].join(" ")
          }
        >
          {item.icon}
        </NavLink>
      ))}
    </div>
  )
}

export default MobileNavigation
