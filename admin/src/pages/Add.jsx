import { useState } from "react";
import { assets } from "../assets/assets";
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
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-5 text-gray-800 dark:text-gray-200 transition-colors duration-300"
    >
      <div>
        <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          Upload Image
        </p>

        <div className="flex gap-3">
          <label htmlFor="image1">
            <img
              className="w-20 border border-gray-300 dark:border-gray-700 rounded cursor-pointer dark:bg-gray-800 dark:invert-[0.1]"
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
              alt=""
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              hidden
            />
          </label>

          <label htmlFor="image2">
            <img
              className="w-20 border border-gray-300 dark:border-gray-700 rounded cursor-pointer dark:bg-gray-800 dark:invert-[0.1]"
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
              alt=""
            />
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              id="image2"
              hidden
            />
          </label>

          <label htmlFor="image3">
            <img
              className="w-20 border border-gray-300 dark:border-gray-700 rounded cursor-pointer dark:bg-gray-800 dark:invert-[0.1]"
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
              alt=""
            />
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              id="image3"
              hidden
            />
          </label>

          <label htmlFor="image4">
            <img
              className="w-20 border border-gray-300 dark:border-gray-700 rounded cursor-pointer dark:bg-gray-800 dark:invert-[0.1]"
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
              alt=""
            />
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              id="image4"
              hidden
            />
          </label>
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          Product name
        </p>
        <input
          type="text"
          placeholder="Type Here"
          required
          className="w-full max-w-[500px] border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded px-3 py-2 outline-none transition-colors"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="w-full">
        <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          Product description
        </p>
        <textarea
          placeholder="Write content here"
          required
          rows="4"
          className="w-full max-w-[500px] border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded px-3 py-2 outline-none resize-none transition-colors"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-6">
        <div>
          <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Product category
          </p>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-40 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded px-3 py-2 outline-none transition-colors"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Sub category
          </p>
          <select
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            className="w-40 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded px-3 py-2 outline-none transition-colors"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Product Price
          </p>
          <input
            type="number"
            placeholder="25"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-28 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded px-3 py-2 outline-none transition-colors"
          />
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          Product Sizes
        </p>

        <div className="flex gap-3">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <div
              key={size}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes(size)
                    ? prev.filter((item) => item !== size)
                    : [...prev, size],
                )
              }
              className={`${
                sizes.includes(size)
                  ? "bg-pink-100 border-pink-400 text-pink-700 dark:bg-pink-950 dark:border-pink-500 dark:text-pink-300"
                  : "bg-slate-200 dark:bg-gray-800 text-gray-800 dark:text-gray-300 border-transparent"
              } border px-5 py-2 cursor-pointer rounded hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors`}
            >
              <p>{size}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <input
          type="checkbox"
          id="bestseller"
          checked={bestseller}
          onChange={() => setBestseller((prev) => !prev)}
          className="w-4 h-4 cursor-pointer accent-pink-600 dark:accent-pink-500"
        />
        <label
          htmlFor="bestseller"
          className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Add to Bestseller
        </label>
      </div>

      <button
        type="submit"
        className="px-8 py-3 mt-4 bg-black dark:bg-white text-white dark:text-black font-medium rounded hover:bg-gray-800 dark:hover:bg-gray-200 cursor-pointer transition-colors"
      >
        ADD
      </button>
    </form>
  );
};

export default Add;
