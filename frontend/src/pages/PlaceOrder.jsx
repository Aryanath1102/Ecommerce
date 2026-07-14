import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const { navigate } = useContext(ShopContext);

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      {/* ------Lest SIde--------- */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl-my-3 sm:text-2xl">
          <Title text1={"DELIVERY"} text2={"INFORMATION"}></Title>
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="First Name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <input
          type="email"
          placeholder="Email Address "
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <input
          type="text"
          placeholder="Street"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="City"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            type="text"
            placeholder="State"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>

        <div className="flex gap-3">
          <input
            type="number"
            placeholder="Zipcode"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            type="text"
            placeholder="Country"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <input
          type="number"
          placeholder="phone "
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
      </div>

      {/* ---------------------Right Side----------------------------- */}

      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          {/* ---------------Payment Method Selection---------------- */}
          <div className="flex flex-col gap-3 lg:flex-row">
            {/* Stripe */}
            <div
              onClick={() => setMethod("stripe")}
              className={`flex items-center gap-4 border rounded-lg px-5 py-4 cursor-pointer transition-all duration-200
      ${
        method === "stripe"
          ? "border-indigo-500 bg-indigo-50 shadow-sm"
          : "border-gray-300 hover:border-gray-400 hover:shadow-sm"
      }`}
            >
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center
        ${method === "stripe" ? "border-indigo-500" : "border-gray-300"}`}
              >
                {method === "stripe" && (
                  <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                )}
              </div>

              <img src={assets.stripe_logo} className="h-6" alt="Stripe" />
            </div>

            {/* Razorpay */}
            <div
              onClick={() => setMethod("razorpay")}
              className={`flex items-center gap-4 border rounded-lg px-5 py-4 cursor-pointer transition-all duration-200
      ${
        method === "razorpay"
          ? "border-blue-500 bg-blue-50 shadow-sm"
          : "border-gray-300 hover:border-gray-400 hover:shadow-sm"
      }`}
            >
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center
        ${method === "razorpay" ? "border-blue-500" : "border-gray-300"}`}
              >
                {method === "razorpay" && (
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                )}
              </div>

              <img src={assets.razorpay_logo} className="h-6" alt="Razorpay" />
            </div>

            {/* COD */}
            <div
              onClick={() => setMethod("cod")}
              className={`flex items-center gap-4 border rounded-lg px-5 py-4 cursor-pointer transition-all duration-200
      ${
        method === "cod"
          ? "border-green-500 bg-green-50 shadow-sm"
          : "border-gray-300 hover:border-gray-400 hover:shadow-sm"
      }`}
            >
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center
        ${method === "cod" ? "border-green-500" : "border-gray-300"}`}
              >
                {method === "cod" && (
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                )}
              </div>

              <p className="text-sm font-semibold text-gray-700 whitespace-nowrap">
                CASH ON DELIVERY
              </p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button
              onClick={() => navigate("/orders")}
              className="bg-black text-white px-10 sm:px-16 py-3 rounded-lg text-sm font-semibold tracking-wide shadow-md hover:bg-gray-900 hover:shadow-xl active:scale-95 transition-all duration-200 cursor-pointer"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
