const mongoose = require("mongoose");

const connectDb = async () => {
  await mongoose.connect(process.env.MONGODB_URI);

  console.log("DB Connected");
  console.log("Database:", mongoose.connection.db.databaseName);
};

module.exports = connectDb;
