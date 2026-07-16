import { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";

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

      console.log(backendUrl);
      console.log(backendUrl + "/api/v1/product/addProduct");

      const response = await axios.post(
        backendUrl + "/api/v1/product/addProduct",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-5"
    >
      <div>
        <p className="mb-2 text-sm font-medium">Upload Image</p>

        <div className="flex gap-3">
          <label htmlFor="image1">
            <img
              className="w-20 border border-gray-300 cursor-pointer"
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
              className="w-20 border border-gray-300 cursor-pointer"
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
              className="w-20 border border-gray-300 cursor-pointer"
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
              className="w-20 border border-gray-300 cursor-pointer"
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
        <p className="mb-2 text-sm font-medium">Product name</p>

        <input
          type="text"
          placeholder="Type Here"
          required
          className="w-full max-w-[500px] border border-gray-300 rounded px-3 py-2 outline-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="w-full">
        <p className="mb-2 text-sm font-medium">Product description</p>

        <textarea
          placeholder="Write content here"
          required
          rows="4"
          className="w-full max-w-[500px] border border-gray-300 rounded px-3 py-2 outline-none resize-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-6">
        <div>
          <p className="mb-2 text-sm font-medium">Product category</p>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-40 border border-gray-300 rounded px-3 py-2 outline-none"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium">Sub category</p>

          <select
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            className="w-40 border border-gray-300 rounded px-3 py-2 outline-none"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium">Product Price</p>

          <input
            type="number"
            placeholder="25"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-28 border border-gray-300 rounded px-3 py-2 outline-none"
          />
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium">Product Sizes</p>

        <div className="flex gap-3">
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("S")
                  ? prev.filter((item) => item !== "S")
                  : [...prev, "S"],
              )
            }
            className={`${sizes.includes("S") ? "bg-pink-100" : "bg-slate-200"}  px-5 py-2 cursor-pointer hover:bg-gray-200`}
          >
            <p>S</p>
          </div>

          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("M")
                  ? prev.filter((item) => item !== "M")
                  : [...prev, "M"],
              )
            }
            className={`${sizes.includes("M") ? "bg-pink-100" : "bg-slate-200"}  px-5 py-2 cursor-pointer hover:bg-gray-200`}
          >
            <p>M</p>
          </div>

          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("L")
                  ? prev.filter((item) => item !== "L")
                  : [...prev, "L"],
              )
            }
            className={`${sizes.includes("L") ? "bg-pink-100" : "bg-slate-200"}  px-5 py-2 cursor-pointer hover:bg-gray-200`}
          >
            <p>L</p>
          </div>

          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("XL")
                  ? prev.filter((item) => item !== "XL")
                  : [...prev, "XL"],
              )
            }
            className={`${sizes.includes("XL") ? "bg-pink-100" : "bg-slate-200"}  px-5 py-2 cursor-pointer hover:bg-gray-200`}
          >
            <p>XL</p>
          </div>

          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("XXL")
                  ? prev.filter((item) => item !== "XXL")
                  : [...prev, "XXL"],
              )
            }
            className={`${sizes.includes("XXL") ? "bg-pink-100" : "bg-slate-200"}  px-5 py-2 cursor-pointer hover:bg-gray-200`}
          >
            <p>XXL</p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <input
          type="checkbox"
          id="bestseller"
          checked={bestseller}
          onChange={() => setBestseller((prev) => !prev)}
        />
        <label htmlFor="bestseller">Add to Bestseller</label>
      </div>
      <button
        type="submit"
        className="px-8 py-3 mt-4 bg-black text-white rounded"
      >
        ADD
      </button>
    </form>
  );
};

export default Add;
