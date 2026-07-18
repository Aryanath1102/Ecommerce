import { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { Sun, Moon, LogOut } from "lucide-react";

const Navbar = ({ setToken }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";

    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div className="sticky top-0 z-50 flex items-center justify-between px-10 py-4 bg-white dark:bg-[#141724] border-b border-slate-200 dark:border-white/10 shadow-sm">
      <img
        src={assets.logo}
        className="h-14 w-auto object-contain dark:invert"
        alt=""
      />

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={toggleTheme}
          className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 cursor-pointer transition"
        >
          {theme === "light" ? (
            <Moon className="w-5 h-5" />
          ) : (
            <Sun className="w-5 h-5 text-yellow-400" />
          )}
        </button>

        <button
          onClick={() => setToken("")}
          className="flex items-center gap-2 px-5 py-2.5 bg-black dark:bg-white dark:text-black text-white rounded-xl cursor-pointer"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
