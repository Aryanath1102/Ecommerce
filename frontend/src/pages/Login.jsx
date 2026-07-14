import { useState } from "react";
const Login = () => {
  const [currentState, setCurrentState] = useState("Login");

  const onSubmitHandler = (e) => {
    e.preventDefault();
  };

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
            className="w-full px-4 py-3 border border-gray-500 outline-none"
          />
        )}

        <input
          type="email"
          placeholder="Email"
          required
          className="w-full px-4 py-3 border border-gray-500 outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          required
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
