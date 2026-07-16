import axios from "axios";
import { useEffect, useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const List = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        backendUrl + "/api/v1/product/listProduct",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      if (response.data.success) {
        setProducts(response.data.product);
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      toast.error(error.response?.data?.msg || error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      const response = await axios.delete(
        backendUrl + `/api/v1/product/removeProduct/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      if (response.data.success) {
        toast.success(response.data.msg);
        fetchProducts();
        setSelectedProduct(null);
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      toast.error(error.response?.data?.msg || error.message);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-5 text-gray-900 dark:text-white transition-colors duration-300">
        Product List
      </h2>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden border border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <table className="w-full">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
            <tr>
              <th className="p-4 text-left">Image</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Bestseller</th>
              <th className="p-4 text-center">Delete</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 dark:divide-gray-700 text-gray-800 dark:text-gray-200">
            {products.map((item) => (
              <tr
                key={item._id}
                className="hover:bg-gray-50 dark:hover:bg-gray-750 cursor-pointer transition-colors"
                onClick={() => setSelectedProduct(item)}
              >
                <td className="p-3">
                  <img
                    src={item.image[0]}
                    alt=""
                    className="w-16 h-16 object-cover rounded bg-gray-100 dark:bg-gray-900"
                  />
                </td>

                <td className="p-3">{item.name}</td>

                <td className="p-3">{item.category}</td>

                <td className="p-3">₹ {item.price}</td>

                <td className="p-3">
                  {item.bestseller ? (
                    <span className="text-green-600 dark:text-green-400 font-semibold">
                      Yes
                    </span>
                  ) : (
                    <span className="text-red-500 dark:text-red-400">No</span>
                  )}
                </td>

                <td
                  className="p-3 text-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteProduct(item._id);
                  }}
                >
                  <FaTrash
                    className="inline text-red-500 hover:text-red-700 dark:hover:text-red-400 cursor-pointer transition-colors"
                    size={18}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/60 dark:bg-black/80 flex justify-center items-center z-50 p-4 transition-colors">
          <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg w-[850px] max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700 shadow-2xl transition-colors">
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 p-5">
              <h2 className="text-2xl font-bold">Product Details</h2>

              <IoClose
                size={28}
                className="cursor-pointer text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
                onClick={() => setSelectedProduct(null)}
              />
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <img
                src={selectedProduct.image[0]}
                alt=""
                className="w-72 h-72 object-cover rounded mx-auto border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
              />

              <h1 className="text-3xl font-bold mt-6">
                {selectedProduct.name}
              </h1>

              <p className="text-gray-600 dark:text-gray-300 mt-3">
                {selectedProduct.description}
              </p>

              <div className="grid grid-cols-2 gap-6 mt-6">
                <div>
                  <b className="text-gray-700 dark:text-gray-300">Category</b>
                  <p className="mt-1">{selectedProduct.category}</p>
                </div>

                <div>
                  <b className="text-gray-700 dark:text-gray-300">
                    Sub Category
                  </b>
                  <p className="mt-1">{selectedProduct.subCategory}</p>
                </div>

                <div>
                  <b className="text-gray-700 dark:text-gray-300">Price</b>
                  <p className="mt-1">₹ {selectedProduct.price}</p>
                </div>

                <div>
                  <b className="text-gray-700 dark:text-gray-300">Bestseller</b>
                  <p className="mt-1">
                    {selectedProduct.bestseller ? "Yes" : "No"}
                  </p>
                </div>
              </div>

              {/* Sizes */}
              <div className="mt-6">
                <b className="text-gray-700 dark:text-gray-300">
                  Available Sizes
                </b>

                <div className="flex gap-3 mt-3 flex-wrap">
                  {selectedProduct.sizes.map((size) => (
                    <div
                      key={size}
                      className="bg-pink-100 dark:bg-pink-950 text-pink-800 dark:text-pink-300 px-4 py-2 rounded font-medium"
                    >
                      {size}
                    </div>
                  ))}
                </div>
              </div>

              {/* All Images */}
              <div className="mt-8">
                <b className="text-gray-700 dark:text-gray-300">All Images</b>

                <div className="flex gap-4 mt-3 flex-wrap">
                  {selectedProduct.image.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt=""
                      className="w-32 h-32 object-cover rounded border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default List;
