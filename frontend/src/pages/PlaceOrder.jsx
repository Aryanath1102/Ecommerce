import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";
const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const {
    navigate,
    backend_url,
    token,
    cartItems,
    setCartItems,
    getCartAmmount,
    deliveryFee,
    products,
  } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemsInfo = structuredClone(
              products.find((product) => product._id === items),
            );
            if (itemsInfo) {
              itemsInfo.size = item;
              itemsInfo.quantity = cartItems[items][item];
              orderItems.push(itemsInfo);
            }
          }
        }
      }
      console.log("Order Placed", orderItems);

      /* setFormData({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: "",
      });*/

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmmount() + deliveryFee,
      };

      switch (method) {
        // API calls fro COD
        case "cod": {
          const response = await axios.post(
            backend_url + "/api/v1/order/place",
            orderData,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            },
          );
          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;
        }
        default:
          break;
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* ------Lest SIde--------- */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl-my-3 sm:text-2xl">
          <Title text1={"DELIVERY"} text2={"INFORMATION"}></Title>
        </div>

        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            type="text"
            placeholder="First Name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            required
          />
          <input
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            type="text"
            placeholder="Last Name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            required
          />
        </div>
        <input
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          type="email"
          placeholder="Email Address "
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          required
        />
        <input
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          type="text"
          placeholder="Street"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          required
        />

        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            type="text"
            placeholder="City"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            required
          />
          <input
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            type="text"
            placeholder="State"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            required
          />
        </div>

        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="zipcode"
            value={formData.zipcode}
            type="number"
            placeholder="Zipcode"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            required
          />
          <input
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            type="text"
            placeholder="Country"
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <input
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          type="number"
          required
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
              // onClick={() => navigate("/orders")}
              className="bg-black text-white px-10 sm:px-16 py-3 rounded-lg text-sm font-semibold tracking-wide shadow-md hover:bg-gray-900 hover:shadow-xl active:scale-95 transition-all duration-200 cursor-pointer"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
