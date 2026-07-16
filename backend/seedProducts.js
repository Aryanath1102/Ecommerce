// backend/seedProducts.js
const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary").v2;

// Load environment variables (.env)
dotenv.config();

// 1. Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

// 2. Import Controller & Database Connector
const { addProductController } = require("./controller/ProductController"); // Adjust folder path if needed
const connectDb = require("./config/mongodb");

// 3. Define Path to Frontend Assets Folder
const ASSETS_DIR = path.join(__dirname, "../frontend/src/assets");
const getImagePath = (fileName) => path.join(ASSETS_DIR, fileName);

// 4. Products Raw Data
const rawProducts = [
  {
    name: "Women Round Neck Cotton Top",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 100,
    imageFiles: ["p_img1.png"],
    category: "Women",
    subCategory: "Topwear",
    sizes: JSON.stringify(["S", "M", "L"]),
    bestseller: "true",
  },
  {
    name: "Men Round Neck Pure Cotton T-shirt",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 200,
    imageFiles: [
      "p_img2_1.png",
      "p_img2_2.png",
      "p_img2_3.png",
      "p_img2_4.png",
    ],
    category: "Men",
    subCategory: "Topwear",
    sizes: JSON.stringify(["M", "L", "XL"]),
    bestseller: "true",
  },
  {
    name: "Girls Round Neck Cotton Top",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 220,
    imageFiles: ["p_img3.png"],
    category: "Kids",
    subCategory: "Topwear",
    sizes: JSON.stringify(["S", "L", "XL"]),
    bestseller: "true",
  },
  {
    name: "Men Round Neck Pure Cotton T-shirt",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 110,
    imageFiles: ["p_img4.png"],
    category: "Men",
    subCategory: "Topwear",
    sizes: JSON.stringify(["S", "M", "XXL"]),
    bestseller: "true",
  },
  {
    name: "Women Round Neck Cotton Top",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 130,
    imageFiles: ["p_img5.png"],
    category: "Women",
    subCategory: "Topwear",
    sizes: JSON.stringify(["M", "L", "XL"]),
    bestseller: "true",
  },
  {
    name: "Girls Round Neck Cotton Top",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 140,
    imageFiles: ["p_img6.png"],
    category: "Kids",
    subCategory: "Topwear",
    sizes: JSON.stringify(["S", "L", "XL"]),
    bestseller: "true",
  },
  {
    name: "Men Tapered Fit Flat-Front Trousers",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 190,
    imageFiles: ["p_img7.png"],
    category: "Men",
    subCategory: "Bottomwear",
    sizes: JSON.stringify(["S", "L", "XL"]),
    bestseller: "false",
  },
  {
    name: "Men Round Neck Pure Cotton T-shirt",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 140,
    imageFiles: ["p_img8.png"],
    category: "Men",
    subCategory: "Topwear",
    sizes: JSON.stringify(["S", "M", "L", "XL"]),
    bestseller: "false",
  },
  {
    name: "Girls Round Neck Cotton Top",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 100,
    imageFiles: ["p_img9.png"],
    category: "Kids",
    subCategory: "Topwear",
    sizes: JSON.stringify(["M", "L", "XL"]),
    bestseller: "false",
  },
  {
    name: "Men Tapered Fit Flat-Front Trousers",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 110,
    imageFiles: ["p_img10.png"],
    category: "Men",
    subCategory: "Bottomwear",
    sizes: JSON.stringify(["S", "L", "XL"]),
    bestseller: "false",
  },
  {
    name: "Men Round Neck Pure Cotton T-shirt",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 120,
    imageFiles: ["p_img11.png"],
    category: "Men",
    subCategory: "Topwear",
    sizes: JSON.stringify(["S", "M", "L"]),
    bestseller: "false",
  },
  {
    name: "Men Round Neck Pure Cotton T-shirt",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 150,
    imageFiles: ["p_img12.png"],
    category: "Men",
    subCategory: "Topwear",
    sizes: JSON.stringify(["S", "M", "L", "XL"]),
    bestseller: "false",
  },
  {
    name: "Women Round Neck Cotton Top",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 130,
    imageFiles: ["p_img13.png"],
    category: "Women",
    subCategory: "Topwear",
    sizes: JSON.stringify(["S", "M", "L", "XL"]),
    bestseller: "false",
  },
  {
    name: "Boy Round Neck Pure Cotton T-shirt",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 160,
    imageFiles: ["p_img14.png"],
    category: "Kids",
    subCategory: "Topwear",
    sizes: JSON.stringify(["S", "M", "L", "XL"]),
    bestseller: "false",
  },
  {
    name: "Men Tapered Fit Flat-Front Trousers",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 140,
    imageFiles: ["p_img15.png"],
    category: "Men",
    subCategory: "Bottomwear",
    sizes: JSON.stringify(["S", "M", "L", "XL"]),
    bestseller: "false",
  },
  {
    name: "Girls Round Neck Cotton Top",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 170,
    imageFiles: ["p_img16.png"],
    category: "Kids",
    subCategory: "Topwear",
    sizes: JSON.stringify(["S", "M", "L", "XL"]),
    bestseller: "false",
  },
  {
    name: "Men Tapered Fit Flat-Front Trousers",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 150,
    imageFiles: ["p_img17.png"],
    category: "Men",
    subCategory: "Bottomwear",
    sizes: JSON.stringify(["S", "M", "L", "XL"]),
    bestseller: "false",
  },
  {
    name: "Boy Round Neck Pure Cotton T-shirt",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 180,
    imageFiles: ["p_img18.png"],
    category: "Kids",
    subCategory: "Topwear",
    sizes: JSON.stringify(["S", "M", "L", "XL"]),
    bestseller: "false",
  },
  {
    name: "Boy Round Neck Pure Cotton T-shirt",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 160,
    imageFiles: ["p_img19.png"],
    category: "Kids",
    subCategory: "Topwear",
    sizes: JSON.stringify(["S", "M", "L", "XL"]),
    bestseller: "false",
  },
  {
    name: "Women Palazzo Pants with Waist Belt",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 190,
    imageFiles: ["p_img20.png"],
    category: "Women",
    subCategory: "Bottomwear",
    sizes: JSON.stringify(["S", "M", "L", "XL"]),
    bestseller: "false",
  },
  {
    name: "Women Zip-Front Relaxed Fit Jacket",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 170,
    imageFiles: ["p_img21.png"],
    category: "Women",
    subCategory: "Winterwear",
    sizes: JSON.stringify(["S", "M", "L", "XL"]),
    bestseller: "false",
  },
  {
    name: "Women Palazzo Pants with Waist Belt",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 200,
    imageFiles: ["p_img22.png"],
    category: "Women",
    subCategory: "Bottomwear",
    sizes: JSON.stringify(["S", "M", "L", "XL"]),
    bestseller: "false",
  },
  {
    name: "Boy Round Neck Pure Cotton T-shirt",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 180,
    imageFiles: ["p_img23.png"],
    category: "Kids",
    subCategory: "Topwear",
    sizes: JSON.stringify(["S", "M", "L", "XL"]),
    bestseller: "false",
  },
  {
    name: "Boy Round Neck Pure Cotton T-shirt",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 210,
    imageFiles: ["p_img24.png"],
    category: "Kids",
    subCategory: "Topwear",
    sizes: JSON.stringify(["S", "M", "L", "XL"]),
    bestseller: "false",
  },
  {
    name: "Girls Round Neck Cotton Top",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 190,
    imageFiles: ["p_img25.png"],
    category: "Kids",
    subCategory: "Topwear",
    sizes: JSON.stringify(["S", "M", "L", "XL"]),
    bestseller: "false",
  },
  {
    name: "Women Zip-Front Relaxed Fit Jacket",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 220,
    imageFiles: ["p_img26.png"],
    category: "Women",
    subCategory: "Winterwear",
    sizes: JSON.stringify(["S", "M", "L", "XL"]),
    bestseller: "false",
  },
  {
    name: "Girls Round Neck Cotton Top",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 200,
    imageFiles: ["p_img27.png"],
    category: "Kids",
    subCategory: "Topwear",
    sizes: JSON.stringify(["S", "M", "L", "XL"]),
    bestseller: "false",
  },
  {
    name: "Men Slim Fit Relaxed Denim Jacket",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 230,
    imageFiles: ["p_img28.png"],
    category: "Men",
    subCategory: "Winterwear",
    sizes: JSON.stringify(["S", "M", "L", "XL"]),
    bestseller: "false",
  },
  {
    name: "Women Round Neck Cotton Top",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 210,
    imageFiles: ["p_img29.png"],
    category: "Women",
    subCategory: "Topwear",
    sizes: JSON.stringify(["S", "M", "L", "XL"]),
    bestseller: "false",
  },
  {
    name: "Girls Round Neck Cotton Top",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 240,
    imageFiles: ["p_img30.png"],
    category: "Kids",
    subCategory: "Topwear",
    sizes: JSON.stringify(["S", "M", "L", "XL"]),
    bestseller: "false",
  },
  {
    name: "Men Round Neck Pure Cotton T-shirt",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 220,
    imageFiles: ["p_img31.png"],
    category: "Men",
    subCategory: "Topwear",
    sizes: JSON.stringify(["S", "M", "L", "XL"]),
    bestseller: "false",
  },
  {
    name: "Men Round Neck Pure Cotton T-shirt",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 250,
    imageFiles: ["p_img32.png"],
    category: "Men",
    subCategory: "Topwear",
    sizes: JSON.stringify(["S", "M", "L", "XL"]),
    bestseller: "false",
  },
  {
    name: "Girls Round Neck Cotton Top",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 230,
    imageFiles: ["p_img33.png"],
    category: "Kids",
    subCategory: "Topwear",
    sizes: JSON.stringify(["S", "M", "L", "XL"]),
    bestseller: "false",
  },
  {
    name: "Women Round Neck Cotton Top",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 260,
    imageFiles: ["p_img34.png"],
    category: "Women",
    subCategory: "Topwear",
    sizes: JSON.stringify(["S", "M", "L", "XL"]),
    bestseller: "false",
  },
  {
    name: "Women Zip-Front Relaxed Fit Jacket",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 240,
    imageFiles: ["p_img35.png"],
    category: "Women",
    subCategory: "Winterwear",
    sizes: JSON.stringify(["S", "M", "L", "XL"]),
    bestseller: "false",
  },
  {
    name: "Women Zip-Front Relaxed Fit Jacket",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 270,
    imageFiles: ["p_img36.png"],
    category: "Women",
    subCategory: "Winterwear",
    sizes: JSON.stringify(["S", "M", "L", "XL"]),
    bestseller: "false",
  },
  {
    name: "Women Round Neck Cotton Top",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 250,
    imageFiles: ["p_img37.png"],
    category: "Women",
    subCategory: "Topwear",
    sizes: JSON.stringify(["S", "M", "L", "XL"]),
    bestseller: "false",
  },
  {
    name: "Men Round Neck Pure Cotton T-shirt",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 280,
    imageFiles: ["p_img38.png"],
    category: "Men",
    subCategory: "Topwear",
    sizes: JSON.stringify(["S", "M", "L", "XL"]),
    bestseller: "false",
  },
  {
    name: "Men Printed Plain Cotton Shirt",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 260,
    imageFiles: ["p_img39.png"],
    category: "Men",
    subCategory: "Topwear",
    sizes: JSON.stringify(["S", "M", "L", "XL"]),
    bestseller: "false",
  },
  {
    name: "Men Slim Fit Relaxed Denim Jacket",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 290,
    imageFiles: ["p_img40.png"],
    category: "Men",
    subCategory: "Winterwear",
    sizes: JSON.stringify(["S", "M", "L", "XL"]),
    bestseller: "false",
  },
  {
    name: "Men Round Neck Pure Cotton T-shirt",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 270,
    imageFiles: ["p_img41.png"],
    category: "Men",
    subCategory: "Topwear",
    sizes: JSON.stringify(["S", "M", "L", "XL"]),
    bestseller: "false",
  },
  {
    name: "Boy Round Neck Pure Cotton T-shirt",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 300,
    imageFiles: ["p_img42.png"],
    category: "Kids",
    subCategory: "Topwear",
    sizes: JSON.stringify(["S", "M", "L", "XL"]),
    bestseller: "false",
  },
  {
    name: "Kid Tapered Slim Fit Trouser",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 280,
    imageFiles: ["p_img43.png"],
    category: "Kids",
    subCategory: "Bottomwear",
    sizes: JSON.stringify(["S", "M", "L", "XL"]),
    bestseller: "false",
  },
  {
    name: "Women Zip-Front Relaxed Fit Jacket",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 310,
    imageFiles: ["p_img44.png"],
    category: "Women",
    subCategory: "Winterwear",
    sizes: JSON.stringify(["S", "M", "L", "XL"]),
    bestseller: "false",
  },
  {
    name: "Men Slim Fit Relaxed Denim Jacket",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 290,
    imageFiles: ["p_img45.png"],
    category: "Men",
    subCategory: "Winterwear",
    sizes: JSON.stringify(["S", "M", "L", "XL"]),
    bestseller: "false",
  },
  {
    name: "Men Slim Fit Relaxed Denim Jacket",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 320,
    imageFiles: ["p_img46.png"],
    category: "Men",
    subCategory: "Winterwear",
    sizes: JSON.stringify(["S", "M", "L", "XL"]),
    bestseller: "false",
  },
  {
    name: "Kid Tapered Slim Fit Trouser",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 300,
    imageFiles: ["p_img47.png"],
    category: "Kids",
    subCategory: "Bottomwear",
    sizes: JSON.stringify(["S", "M", "L", "XL"]),
    bestseller: "false",
  },
  {
    name: "Men Slim Fit Relaxed Denim Jacket",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 330,
    imageFiles: ["p_img48.png"],
    category: "Men",
    subCategory: "Winterwear",
    sizes: JSON.stringify(["S", "M", "L", "XL"]),
    bestseller: "false",
  },
  {
    name: "Kid Tapered Slim Fit Trouser",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 310,
    imageFiles: ["p_img49.png"],
    category: "Kids",
    subCategory: "Bottomwear",
    sizes: JSON.stringify(["S", "M", "L", "XL"]),
    bestseller: "false",
  },
  {
    name: "Kid Tapered Slim Fit Trouser",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 340,
    imageFiles: ["p_img50.png"],
    category: "Kids",
    subCategory: "Bottomwear",
    sizes: JSON.stringify(["S", "M", "L", "XL"]),
    bestseller: "false",
  },
  {
    name: "Women Zip-Front Relaxed Fit Jacket",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 320,
    imageFiles: ["p_img51.png"],
    category: "Women",
    subCategory: "Winterwear",
    sizes: JSON.stringify(["S", "M", "L", "XL"]),
    bestseller: "false",
  },
  {
    name: "Men Slim Fit Relaxed Denim Jacket",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 350,
    imageFiles: ["p_img52.png"],
    category: "Men",
    subCategory: "Winterwear",
    sizes: JSON.stringify(["S", "M", "L", "XL"]),
    bestseller: "false",
  },
];

// Helper to construct simulated Express Response object
const createMockResponse = () => {
  return {
    statusCode: 200,
    jsonResponse: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(data) {
      this.jsonResponse = data;
      return this;
    },
    send(data) {
      this.jsonResponse = data;
      return this;
    },
  };
};

const seedDatabase = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await connectDb();

    console.log(
      "\nStarting automated batch calls through addProductController...\n",
    );

    for (let i = 0; i < rawProducts.length; i++) {
      const prod = rawProducts[i];

      // Build simulated req.files structure expected by addProductController
      const reqFiles = {};
      prod.imageFiles.forEach((file, index) => {
        const key = `image${index + 1}`;
        reqFiles[key] = [
          {
            path: getImagePath(file),
          },
        ];
      });

      // Construct simulated req.body
      const req = {
        body: {
          name: prod.name,
          description: prod.description,
          price: prod.price,
          category: prod.category,
          subCategory: prod.subCategory,
          sizes: prod.sizes,
          bestseller: prod.bestseller,
        },
        files: reqFiles,
      };

      const res = createMockResponse();

      console.log(`[${i + 1}/${rawProducts.length}] Processing: ${prod.name}`);

      // Call your exact controller directly
      await addProductController(req, res);

      if (res.statusCode === 201) {
        console.log(
          `   └─ ✅ Success! Added product to DB with Cloudinary URLs.`,
        );
      } else {
        console.error(`   └─ ❌ Failed:`, res.jsonResponse);
      }
    }

    console.log("\n🎉 All 52 products processed and seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding script error:", error);
    process.exit(1);
  }
};

seedDatabase();
