const mongoose = require("mongoose");
const config = require("./config");
const logger = require("./logger");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.MONGODB_URI);
    logger.info(`Mongo started on ${conn.connection.host}`);
  } catch (err) {
    logger.error("error:", err);
  }
};

module.exports = connectDB;
