import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/* Left Section */}
        <div>
          <img src={assets.logo} className="mb-5 w-32" alt="" />

          <p className="w-full md:w-2/3 text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam
            harum ipsa vel tempore, veritatis rem architecto iste assumenda unde
            perferendis est deleniti quasi optio omnis. Dolore adipisci modi
            eligendi voluptatem.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
