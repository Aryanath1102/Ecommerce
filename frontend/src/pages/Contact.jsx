import { assets } from "../assets/assets";
import NewsLetterBox from "../components/NewsletterBox";
import Title from "../components/Title";

const Contact = () => {
  return (
    <div>
      {/* Heading */}
      <div className="text-2xl text-center pt-10 border-t border-gray-200">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      {/* Contact Content */}
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        {/* Left Image */}
        <img
          className="w-full md:max-w-[480px]"
          src={assets.contact_img}
          alt=""
        />

        {/* Right Content */}
        <div className="flex flex-col justify-center items-start gap-6">
          <div>
            <p className="font-semibold text-xl text-gray-700 mb-5">
              Our Store
            </p>

            <p className="text-gray-500 leading-7">
              54709 Willms Station
              <br />
              Suite 350, Washington, USA
            </p>
          </div>

          <div>
            <p className="text-gray-500 leading-7">
              Tel: (415) 555-0132
              <br />
              Email: admin@forever.com
            </p>
          </div>

          <div>
            <p className="font-semibold text-xl text-gray-700 mb-5">
              Careers at Forever
            </p>

            <p className="text-gray-500 mb-8">
              Learn more about our teams and job openings.
            </p>

            <button className="border border-black px-8 py-4 text-sm font-medium hover:bg-black hover:text-white transition-all duration-500 cursor-pointer">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  );
};

export default Contact;
