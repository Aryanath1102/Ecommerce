import { assets } from "../assets/assets";

const Navbar = ({ setToken, theme, toggleTheme }) => {
  return (
    <div className="flex items-center justify-between px-8 py-2 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <img
        src={assets.logo}
        className="w-[max(10%,80px)] dark:invert"
        alt="Logo"
      />

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-xs sm:text-sm font-medium border border-gray-300 dark:border-gray-700 cursor-pointer transition-colors"
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>

        <button
          onClick={() => {
            setToken("");
          }}
          className="bg-gray-600 dark:bg-gray-700 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm cursor-pointer hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
