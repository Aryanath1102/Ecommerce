import axios from "axios";
import { useEffect, useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { Trash2, X, AlertTriangle } from "lucide-react";

const List = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeImage, setActiveImage] = useState("");

  // Custom State for Center Deletion Modal
  const [productToDelete, setProductToDelete] = useState(null);

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

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setActiveImage(product.image[0]);
  };

  const confirmDeleteProduct = async () => {
    if (!productToDelete) return;

    try {
      const response = await axios.delete(
        backendUrl + `/api/v1/product/removeProduct/${productToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      if (response.data.success) {
        toast.success(response.data.msg);
        fetchProducts();
        if (selectedProduct?._id === productToDelete) {
          setSelectedProduct(null);
        }
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      toast.error(error.response?.data?.msg || error.message);
    } finally {
      setProductToDelete(null); // Clear modal view state
    }
  };

  return (
    <div className="w-full max-w-[1100px] mx-auto pt-6 px-6 pb-16 transition-all duration-300">
      <div className="mb-7">
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight transition-colors duration-300">
          Product Assets
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Manage, inspect, and update your dynamic inventory catalog.
        </p>
      </div>

      {/* Main Responsive Table Container wrapper with bold spacing / high contrast borders */}
      <div className="w-full bg-white dark:bg-[#0f111a] rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.04)] dark:shadow-[0_16px_48px_rgba(0,0,0,0.35)] border border-slate-200 dark:border-white/[0.08] overflow-hidden transition-all duration-300">
        {/* Horizontal scroll containment layer */}
        <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-white/[0.05]">
          <table className="w-full min-w-[850px] border-collapse align-middle">
            <thead className="bg-slate-50/90 dark:bg-white/[0.01] text-slate-700 dark:text-cyan-400 border-b border-slate-200 dark:border-white/[0.08] text-xs font-bold uppercase tracking-wider">
              <tr>
                <th className="py-5 px-6 text-left font-bold w-[110px]">
                  Image
                </th>
                <th className="py-5 px-6 text-left font-bold">Name</th>
                <th className="py-5 px-6 text-left font-bold w-[150px]">
                  Category
                </th>
                <th className="py-5 px-6 text-left font-bold w-[140px]">
                  Price
                </th>
                <th className="py-5 px-6 text-left font-bold w-[150px]">
                  Bestseller
                </th>
                <th className="py-5 px-6 text-center font-bold w-[100px]">
                  Delete
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-white/[0.05] text-sm font-semibold text-slate-800 dark:text-slate-200">
              {products.map((item) => (
                <tr
                  key={item._id}
                  className="hover:bg-slate-50/70 dark:hover:bg-white/[0.02] hover:shadow-[inset_5px_0_0_0_#ec4899] dark:hover:shadow-[inset_5px_0_0_0_#22d3ee] cursor-pointer transition-all duration-200"
                  onClick={() => handleSelectProduct(item)}
                >
                  <td className="py-4 px-6">
                    <img
                      src={item.image[0]}
                      alt=""
                      className="w-14 h-14 object-cover rounded-xl border border-slate-200 dark:border-white/[0.1] bg-slate-50 dark:bg-slate-900 shadow-sm transition-transform duration-200"
                    />
                  </td>

                  <td className="py-4 px-6 text-[15px] font-bold text-slate-900 dark:text-white tracking-tight">
                    {item.name}
                  </td>

                  <td className="py-4 px-6 text-slate-600 dark:text-slate-400 font-medium">
                    {item.category}
                  </td>

                  <td className="py-4 px-6 text-[15px] font-extrabold text-slate-900 dark:text-white">
                    ₹{item.price}
                  </td>

                  <td className="py-4 px-6">
                    {item.bestseller ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-500/20">
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-slate-50 dark:bg-white/[0.04] text-slate-500 dark:text-slate-500 border border-slate-100 dark:border-transparent">
                        Standard
                      </span>
                    )}
                  </td>

                  <td
                    className="py-4 px-6 text-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      setProductToDelete(item._id);
                    }}
                  >
                    <button className="p-2.5 rounded-lg text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all duration-200 inline-flex items-center justify-center cursor-pointer">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PREMIUM CENTER CONFIRMATION MODAL */}
      {productToDelete && (
        <div className="fixed inset-0 bg-slate-900/50 dark:bg-black/85 backdrop-blur-sm flex justify-center items-center z-[60] p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#0f111a] text-slate-800 dark:text-slate-200 rounded-xl w-full max-w-sm border border-slate-200 dark:border-white/[0.06] shadow-2xl p-6 relative">
            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-rose-50 dark:bg-rose-500/10 text-rose-500 dark:text-rose-400 rounded-lg">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                  Remove Storefront Item
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-normal">
                  Are you sure you want to delete this product? This action
                  cannot be undone.
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2.5 text-xs">
              <button
                onClick={() => setProductToDelete(null)}
                className="px-4 py-2.5 border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0f111a] hover:bg-slate-50 dark:hover:bg-white/[0.02] text-slate-700 dark:text-slate-300 font-bold rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteProduct}
                className="px-4 py-2.5 bg-rose-500 hover:bg-rose-600 dark:bg-rose-50 dark:hover:bg-rose-600 text-white font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Details Slide-Over View Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-slate-900/50 dark:bg-black/85 backdrop-blur-sm flex justify-center items-center z-50 p-4 transition-all duration-300">
          <div className="bg-white dark:bg-[#0f111a] text-slate-800 dark:text-slate-200 rounded-xl w-full max-w-2xl max-h-[85vh] overflow-hidden border border-slate-200 dark:border-white/[0.06] shadow-2xl transition-all duration-300 flex flex-col text-sm">
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-white/[0.06] p-5 sticky top-0 bg-white/80 dark:bg-[#0f111a]/80 backdrop-blur-md z-10">
              <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                Product Details
              </h2>
              <button
                onClick={() => setSelectedProduct(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/[0.05] transition-all duration-200 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 overflow-y-auto">
              {/* Feature Preview Image */}
              <div className="flex justify-center bg-slate-50/50 dark:bg-white/[0.01] rounded-xl p-4 border border-slate-200 dark:border-white/[0.04]">
                <img
                  src={activeImage}
                  alt=""
                  className="w-56 h-56 object-cover rounded-lg border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-slate-900 shadow-sm"
                />
              </div>

              <div>
                <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                  {selectedProduct.name}
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  {selectedProduct.description}
                </p>
              </div>

              {/* Info Matrix Grid */}
              <div className="grid grid-cols-2 gap-x-8 gap-y-5 border-t border-b border-slate-200 dark:border-white/[0.06] py-5">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-cyan-400 block">
                    Category
                  </span>
                  <p className="mt-1 font-semibold text-slate-800 dark:text-slate-200">
                    {selectedProduct.category}
                  </p>
                </div>

                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-cyan-400 block">
                    Sub Category
                  </span>
                  <p className="mt-1 font-semibold text-slate-800 dark:text-slate-200">
                    {selectedProduct.subCategory}
                  </p>
                </div>

                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-cyan-400 block">
                    Price
                  </span>
                  <p className="mt-1 text-base font-extrabold text-pink-600 dark:text-cyan-400 transition-colors duration-300">
                    ₹{selectedProduct.price}
                  </p>
                </div>

                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-cyan-400 block">
                    Bestseller Status
                  </span>
                  <p className="mt-1 font-semibold text-slate-800 dark:text-slate-200">
                    {selectedProduct.bestseller ? "Active" : "Standard Product"}
                  </p>
                </div>
              </div>

              {/* Sizes Container */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-cyan-400 block">
                  Available Sizes
                </span>
                <div className="flex gap-2 mt-2.5 flex-wrap">
                  {selectedProduct.sizes.map((size) => (
                    <div
                      key={size}
                      className="bg-pink-50 text-pink-600 border border-pink-200 px-3 py-1.5 rounded-md text-xs font-bold tracking-wide dark:bg-cyan-500/10 dark:text-cyan-400 dark:border-cyan-500/20 transition-all duration-300"
                    >
                      {size}
                    </div>
                  ))}
                </div>
              </div>

              {/* Gallery Thumbnails */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-cyan-400 block mb-2.5">
                  Gallery Thumbnails
                </span>
                <div className="flex gap-3 flex-wrap">
                  {selectedProduct.image.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt=""
                      onClick={() => setActiveImage(img)}
                      className={`w-16 h-16 object-cover rounded-lg cursor-pointer border transition-all duration-200 ${
                        activeImage === img
                          ? "border-pink-500 ring-2 ring-pink-500/20 dark:border-cyan-400 dark:ring-cyan-400/20 scale-95 shadow-sm"
                          : "border-slate-200 dark:border-white/[0.08] hover:border-pink-300 dark:hover:border-cyan-500/40"
                      } bg-white dark:bg-slate-900`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default List;
