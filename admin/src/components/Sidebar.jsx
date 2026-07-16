import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen border-r-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3 border border-r-0 px-3 py-2 rounded-l transition-colors ${
              isActive
                ? "bg-pink-100 border-pink-400 text-pink-700 dark:bg-pink-950/60 dark:border-pink-500 dark:text-pink-300"
                : "border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
            }`
          }
          to="/add"
        >
          <img
            src={assets.add_icon}
            className="w-5 h-5 dark:invert-[0.2]"
            alt=""
          />
          <p className="hidden md:block">Add Items</p>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3 border border-r-0 px-3 py-2 rounded-l transition-colors ${
              isActive
                ? "bg-pink-100 border-pink-400 text-pink-700 dark:bg-pink-950/60 dark:border-pink-500 dark:text-pink-300"
                : "border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
            }`
          }
          to="/list"
        >
          <img
            src={assets.order_icon}
            className="w-5 h-5 dark:invert-[0.2]"
            alt=""
          />
          <p className="hidden md:block">List Items</p>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3 border border-r-0 px-3 py-2 rounded-l transition-colors ${
              isActive
                ? "bg-pink-100 border-pink-400 text-pink-700 dark:bg-pink-950/60 dark:border-pink-500 dark:text-pink-300"
                : "border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
            }`
          }
          to="/orders"
        >
          <img
            src={assets.order_icon}
            className="w-5 h-5 dark:invert-[0.2]"
            alt=""
          />
          <p className="hidden md:block">Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
