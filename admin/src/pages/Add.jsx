import { useState } from "react";
import { UploadCloud, CheckCircle2, Trash2 } from "lucide-react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = () => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [subcategory, setSubcategory] = useState("Topwear");
  const [sizes, setSizes] = useState([]);
  const [price, setPrice] = useState("");
  const [bestseller, setBestseller] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subcategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);
      if (image4) formData.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/v1/product/addProduct",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      if (response.data.success) {
        toast.success(response.data.msg);
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setName("");
        setDescription("");
        setPrice("");
        setSizes([]);
        setBestseller(false);
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full max-w-[660px] mx-auto pt-3 px-5 pb-8 text-slate-800 dark:text-slate-200 transition-colors duration-300 text-xs">
      <div className="mb-4">
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Add New Product
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Fill in the details below to list a new item on the marketplace
        </p>
      </div>

      <form onSubmit={onSubmitHandler} className="space-y-4">
        {/* Balanced Image Upload Box */}
        <div className="bg-slate-50/40 dark:bg-white/[0.01] border border-slate-200 dark:border-white/[0.08] rounded-xl p-4">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-cyan-400 mb-2.5">
            Product Images
          </p>
          <div className="flex gap-3">
            {[
              { id: "image1", state: image1, setter: setImage1 },
              { id: "image2", state: image2, setter: setImage2 },
              { id: "image3", state: image3, setter: setImage3 },
              { id: "image4", state: image4, setter: setImage4 },
            ].map(({ id, state, setter }) => (
              <div
                key={id}
                className="relative group overflow-hidden rounded-lg"
              >
                {state ? (
                  // Hoverable Image Preview Bay
                  <div className="relative w-16 h-16 border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-slate-900 transition-all duration-300">
                    <img
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      src={URL.createObjectURL(state)}
                      alt=""
                    />
                    {/* Elegant Fade-in Glass Overlay on Hover */}
                    <div
                      onClick={() => setter(false)}
                      className="absolute inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-[1px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                      title="Remove image"
                    >
                      <Trash2 className="w-4 h-4 text-white drop-shadow-sm hover:scale-110 active:scale-95 transition-transform duration-150" />
                    </div>
                  </div>
                ) : (
                  // File Input Trigger Box
                  <label htmlFor={id} className="block cursor-pointer">
                    <div className="w-16 h-16 border border-dashed border-slate-300 dark:border-white/[0.15] bg-white dark:bg-[#0f111a] hover:border-pink-500 dark:hover:border-cyan-400 rounded-lg flex flex-col items-center justify-center transition-all duration-200 hover:scale-[0.98]">
                      <div className="text-center flex flex-col items-center gap-0.5">
                        <UploadCloud className="w-4 h-4 text-slate-500 dark:text-cyan-400 transition-colors" />
                        <span className="text-[9px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-tight">
                          Upload
                        </span>
                      </div>
                    </div>
                    <input
                      onChange={(e) => setter(e.target.files[0])}
                      type="file"
                      id={id}
                      hidden
                      accept="image/*"
                    />
                  </label>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Product Title */}
        <div>
          <label className="block mb-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-cyan-400">
            Product Name
          </label>
          <input
            type="text"
            placeholder="e.g., Silk Slip Dress"
            required
            className="w-full border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0f111a] text-slate-900 dark:text-white rounded-lg px-3 py-2.5 text-xs outline-none focus:border-pink-500 dark:focus:border-cyan-400 placeholder-slate-400 dark:placeholder-slate-500 transition-all duration-200 font-medium"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-cyan-400">
            Description
          </label>
          <textarea
            placeholder="Describe the fabric weave, fit outline, and profile characteristics..."
            required
            rows="3"
            className="w-full border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0f111a] text-slate-900 dark:text-white rounded-lg px-3 py-2.5 text-xs outline-none resize-none focus:border-pink-500 dark:focus:border-cyan-400 placeholder-slate-400 dark:placeholder-slate-500 transition-all duration-200 leading-relaxed font-medium"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Select Row Layout */}
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block mb-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-cyan-400">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0f111a] text-slate-900 dark:text-white rounded-lg px-2 py-2.5 text-xs outline-none focus:border-pink-500 dark:focus:border-cyan-400 cursor-pointer transition-all duration-200 font-semibold"
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          <div>
            <label className="block mb-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-cyan-400">
              Sub Category
            </label>
            <select
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              className="w-full border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0f111a] text-slate-900 dark:text-white rounded-lg px-2 py-2.5 text-xs outline-none focus:border-pink-500 dark:focus:border-cyan-400 cursor-pointer transition-all duration-200 font-semibold"
            >
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>

          <div>
            <label className="block mb-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-cyan-400">
              Price
            </label>
            <div className="relative">
              <input
                type="number"
                placeholder="1299"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0f111a] text-slate-900 dark:text-white rounded-lg px-3 py-2.5 text-xs outline-none focus:border-pink-500 dark:focus:border-cyan-400 placeholder-slate-400 dark:placeholder-slate-500 transition-all duration-200 font-bold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
          </div>
        </div>

        {/* Sizes Blocks Dynamic Selection */}
        <div>
          <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-cyan-400">
            Sizes Available
          </p>
          <div className="flex gap-2 flex-wrap">
            {["S", "M", "L", "XL", "XXL"].map((size) => {
              const selected = sizes.includes(size);
              return (
                <div
                  key={size}
                  onClick={() =>
                    setSizes((prev) =>
                      prev.includes(size)
                        ? prev.filter((i) => i !== size)
                        : [...prev, size],
                    )
                  }
                  className={`w-10 h-10 flex items-center justify-center cursor-pointer rounded-lg text-xs font-extrabold border transition-all duration-150 select-none ${
                    selected
                      ? "bg-pink-50 border-pink-300 text-pink-600 dark:bg-cyan-500/10 dark:border-cyan-500/30 dark:text-cyan-400 scale-[0.96]"
                      : "bg-white dark:bg-[#0f111a] border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/[0.02]"
                  }`}
                >
                  {size}
                </div>
              );
            })}
          </div>
        </div>

        {/* Integrated Marketing Bestseller Flag */}
        <div
          onClick={() => setBestseller((prev) => !prev)}
          className={`flex items-center justify-between border rounded-lg px-3.5 py-2.5 max-w-[300px] cursor-pointer transition-all duration-200 select-none ${
            bestseller
              ? "bg-emerald-50/60 border-emerald-300 text-emerald-800 dark:bg-emerald-500/5 dark:border-emerald-500/20 dark:text-emerald-400"
              : "bg-white dark:bg-[#0f111a] border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-slate-300"
          }`}
        >
          <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-800 dark:text-white">
              Best Seller Status
            </span>
          </div>
          <CheckCircle2
            className={`w-4 h-4 transition-transform duration-300 ${bestseller ? "text-emerald-500 scale-105" : "text-slate-400 dark:text-slate-600"}`}
          />
        </div>

        {/* Submit Button */}
        <div className="pt-3 border-t border-slate-100 dark:border-white/[0.06]">
          <button
            type="submit"
            className="px-7 h-10 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-[#090d16] text-xs font-bold tracking-wide rounded-lg shadow-sm transition-all duration-200 active:scale-[0.98] cursor-pointer"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
