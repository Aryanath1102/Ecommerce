import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";

const Orders = () => {
  const { products, currency } = useContext(ShopContext);

  return (
    <div className="border-t border-gray-200 pt-16">
      <div className="text-2xl mb-8">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      <div className="space-y-5">
        {products.slice(1, 4).map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6">
              {/* Left Side */}
              <div className="flex items-start gap-5">
                <img
                  className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                  src={item.image[0]}
                  alt=""
                />

                <div>
                  <p className="text-base sm:text-lg font-semibold text-gray-800">
                    {item.name}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-600">
                    <p className="text-lg font-semibold text-black">
                      {currency}
                      {item.price}
                    </p>
                    <p>Quantity: 1</p>
                    <p>Size: M</p>
                  </div>

                  <p className="mt-3 text-sm">
                    Date: <span className="text-gray-400">25 Jul, 2026</span>
                  </p>
                </div>
              </div>

              {/* Middle */}
              <div className="flex items-center justify-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                <p className="text-sm font-medium text-gray-700">
                  Ready to Ship
                </p>
              </div>

              {/* Right */}
              <div className="flex justify-start md:justify-end">
                <button className="px-5 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-black hover:text-white transition-all duration-300 cursor-pointer">
                  Track Order
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
