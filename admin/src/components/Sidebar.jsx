import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen border-r border-slate-100 dark:border-slate-800/40 bg-white dark:bg-[#090d16] text-slate-500 dark:text-slate-400 transition-all duration-300">
      <div className="flex flex-col gap-1.5 pt-8 px-3 text-[14px] font-medium tracking-wide">
        {/* Add Items Link */}
        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-300 group relative ${
              isActive
                ? "bg-gradient-to-r from-pink-500/10 to-transparent text-pink-600 font-semibold dark:from-cyan-500/15 dark:to-transparent dark:text-cyan-400 translate-x-1"
                : "hover:bg-slate-50 dark:hover:bg-white/[0.02] hover:text-slate-900 dark:hover:text-slate-200"
            }`
          }
          to="/add"
        >
          {/* Active Accent Vertical Strip */}
          <span className="absolute left-0 top-2.5 bottom-2.5 w-[3px] rounded-r-full bg-pink-500 dark:bg-cyan-400 scale-y-0 group-[.active]:scale-y-100 transition-transform duration-300" />

          <img
            src={assets.add_icon}
            className="w-5 h-5 opacity-60 group-hover:opacity-100 dark:invert dark:brightness-200 group-[.active]:opacity-100 group-[.active]:text-pink-500 dark:group-[.active]:text-cyan-400 transition-all duration-300"
            alt=""
          />
          <p className="hidden md:block">Add Items</p>
        </NavLink>

        {/* List Items Link */}
        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-300 group relative ${
              isActive
                ? "bg-gradient-to-r from-pink-500/10 to-transparent text-pink-600 font-semibold dark:from-cyan-500/15 dark:to-transparent dark:text-cyan-400 translate-x-1"
                : "hover:bg-slate-50 dark:hover:bg-white/[0.02] hover:text-slate-900 dark:hover:text-slate-200"
            }`
          }
          to="/list"
        >
          <span className="absolute left-0 top-2.5 bottom-2.5 w-[3px] rounded-r-full bg-pink-500 dark:bg-cyan-400 scale-y-0 group-[.active]:scale-y-100 transition-transform duration-300" />

          <img
            src={assets.order_icon}
            className="w-5 h-5 opacity-60 group-hover:opacity-100 dark:invert dark:brightness-200 group-[.active]:opacity-100 group-[.active]:text-pink-500 dark:group-[.active]:text-cyan-400 transition-all duration-300"
            alt=""
          />
          <p className="hidden md:block">List Items</p>
        </NavLink>

        {/* Orders Link */}
        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-300 group relative ${
              isActive
                ? "bg-gradient-to-r from-pink-500/10 to-transparent text-pink-600 font-semibold dark:from-cyan-500/15 dark:to-transparent dark:text-cyan-400 translate-x-1"
                : "hover:bg-slate-50 dark:hover:bg-white/[0.02] hover:text-slate-900 dark:hover:text-slate-200"
            }`
          }
          to="/orders"
        >
          <span className="absolute left-0 top-2.5 bottom-2.5 w-[3px] rounded-r-full bg-pink-500 dark:bg-cyan-400 scale-y-0 group-[.active]:scale-y-100 transition-transform duration-300" />

          <img
            src={assets.order_icon}
            className="w-5 h-5 opacity-60 group-hover:opacity-100 dark:invert dark:brightness-200 group-[.active]:opacity-100 group-[.active]:text-pink-500 dark:group-[.active]:text-cyan-400 transition-all duration-300"
            alt=""
          />
          <p className="hidden md:block">Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
