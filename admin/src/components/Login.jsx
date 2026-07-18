import { useState, useEffect } from "react";
import { Lock, Mail, ArrowRight, Sun, Moon } from "lucide-react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(backendUrl + "/api/v1/admin", {
        email,
        password,
      });

      if (response.data.success) {
        setToken(response.data.token);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col w-full bg-slate-100 dark:bg-[#0f111a] text-slate-800 dark:text-white">
      <div className="w-full flex items-center justify-between px-10 py-4 bg-white dark:bg-[#141724] border-b border-slate-200 dark:border-white/10 shadow-sm">
        <img
          src={assets.logo}
          className="h-14 w-auto object-contain dark:invert"
          alt=""
        />

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
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-[460px] bg-white dark:bg-[#141724] border border-slate-200 dark:border-white/10 rounded-2xl p-8 shadow-xl">
          <h1 className="text-3xl font-bold mb-6">Admin Login</h1>

          <form onSubmit={onSubmitHandler} className="space-y-5">
            <div>
              <label>Email</label>

              <div className="flex items-center border rounded-xl mt-2">
                <div className="px-4">
                  <Mail size={18} />
                </div>

                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@forever.com"
                  className="w-full py-3 outline-none bg-transparent"
                />
              </div>
            </div>

            <div>
              <label>Password</label>

              <div className="flex items-center border rounded-xl mt-2">
                <div className="px-4">
                  <Lock size={18} />
                </div>

                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                  className="w-full py-3 outline-none bg-transparent"
                />
              </div>
            </div>

            <button className="w-full h-12 bg-black dark:bg-white dark:text-black text-white rounded-xl flex justify-center items-center gap-2 cursor-pointer">
              Login
              <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
