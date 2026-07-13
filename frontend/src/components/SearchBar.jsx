import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
    const { search, setSearch, showSearch, setShowSearch } =
        useContext(ShopContext);

    const [visible, setVisible] = useState(false);

    const location = useLocation();

    useEffect(() => {
        if (location.pathname.includes("collection")) {
            setVisible(true)
        } else {
            setVisible(false)
        }
    }, [location])


    return showSearch && visible ? (
        <div className="border-t border-b bg-gray-50 text-center -mx-4 sm:-mx-[5vw] md:-mx-[7vw] lg:-mx-[9vw] border-hidden">
            <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 rounded-full w-3/4 sm:w-1/2 " >
                <input
                    type="text"
                    placeholder="Search"
                    className="flex-1 bg-inherit outline-none text-sm"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <img src={assets.search_icon} alt="" className="w-4" />
            </div>

            <img
                src={assets.cross_icon}
                alt=""
                className="inline w-3 cursor-pointer ml-4"
                onClick={() => setShowSearch(false)}
            />
        </div>
    ) : null;
};

export default SearchBar;