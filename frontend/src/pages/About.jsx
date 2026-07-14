import { assets } from "../assets/assets";
import Title from "../components/Title";
import NewsletterBox from "../components/NewsletterBox";

const About = () => {
  return (
    <div>
      {/* About Heading */}
      <div className="text-3xl text-center pt-10 border-t border-gray-200">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      {/* About Section */}
      <div className="my-14 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        <img
          className="w-full md:max-w-[500px] rounded-xl shadow-md object-cover"
          src={assets.about_img}
          alt="About Forever"
        />

        <div className="flex flex-col justify-center gap-6 lg:w-1/2 text-gray-600 leading-8">
          <p>
            Forever was born out of a passion for innovation and a desire to
            revolutionize the way people shop online. Our journey began with a
            simple idea: to provide a platform where customers can easily
            discover, explore, and purchase a wide range of products from the
            comfort of their homes.
          </p>

          <p>
            Since our inception, we've worked tirelessly to curate a diverse
            selection of high-quality products that cater to every taste and
            preference. From fashion and beauty to electronics and home
            essentials, we offer an extensive collection sourced from trusted
            brands and suppliers.
          </p>

          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Our Mission
            </h3>

            <p>
              Our mission at Forever is to empower customers with choice,
              convenience, and confidence. We're dedicated to providing a
              seamless shopping experience that exceeds expectations, from
              browsing and ordering to delivery and beyond.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="text-3xl text-center mb-10">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
        {/* Card 1 */}
        <div className="border border-gray-200 rounded-xl p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Quality Assurance
          </h3>

          <p className="text-gray-600 leading-7">
            We meticulously select and vet every product to ensure it meets our
            stringent quality standards, delivering only the best to our
            customers.
          </p>
        </div>

        {/* Card 2 */}
        <div className="border border-gray-200 rounded-xl p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Convenience
          </h3>

          <p className="text-gray-600 leading-7">
            With our user-friendly interface and hassle-free ordering process,
            shopping becomes simple, enjoyable, and accessible anytime,
            anywhere.
          </p>
        </div>

        {/* Card 3 */}
        <div className="border border-gray-200 rounded-xl p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Customer Support
          </h3>

          <p className="text-gray-600 leading-7">
            Our dedicated support team is always ready to assist you, ensuring a
            smooth shopping experience and complete customer satisfaction.
          </p>
        </div>
      </div>
      <NewsletterBox />
    </div>
  );
};

export default About;
