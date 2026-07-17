import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, navigate, backend_url } = useContext(ShopContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(
          backend_url + "/api/v1/user/register",
          { name, email, password },
        );
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success(response.data.msg);
          setName("");
          setEmail("");
          setPassword("");
          setCurrentState("Login");
        } else {
          toast.error(response.data.msg);
        }
      } else {
        const response = await axios.post(backend_url + "/api/v1/user/login", {
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success(response.data.msg);
          console.log(response.data);
        } else {
          toast.error(response.data.msg);
        }
      }
    } catch (error) {
      console.log(error.response?.data);
      toast.error(error.response?.data?.msg || error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <div className="border-t border-gray-300">
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col items-center w-[90%] sm:max-w-[420px] mx-auto mt-20 gap-5 text-gray-800 "
      >
        {/* Heading */}
        <div className="inline-flex items-center gap-3 mb-4">
          <h1 className="prata-regular text-4xl">
            {currentState === "Login" ? "Login" : "Sign Up"}
          </h1>
          <hr className="border-none h-[2px] w-12 bg-gray-800" />
        </div>

        {currentState === "Sign Up" && (
          <input
            type="text"
            placeholder="Name"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="w-full px-4 py-3 border border-gray-500 outline-none"
          />
        )}

        <input
          type="email"
          placeholder="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="w-full px-4 py-3 border border-gray-500 outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="w-full px-4 py-3 border border-gray-500 outline-none"
        />

        <div className="w-full flex justify-between text-sm mt-1">
          <p className="cursor-pointer hover:underline">
            Forgot your password?
          </p>

          {currentState === "Login" ? (
            <p
              onClick={() => setCurrentState("Sign Up")}
              className="cursor-pointer hover:underline"
            >
              Create account
            </p>
          ) : (
            <p
              onClick={() => setCurrentState("Login")}
              className="cursor-pointer hover:underline"
            >
              Login Here
            </p>
          )}
        </div>

        <button
          type="submit"
          className="mt-4 bg-black text-white px-12 py-3 text-sm tracking-wide cursor-pointer hover:bg-gray-900 transition"
        >
          {currentState === "Login" ? "Sign In" : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Login;
