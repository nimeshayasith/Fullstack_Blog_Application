import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB is connected");
  } catch (err) {
    console.log(`database error:${err}`);
  }
};

export default connectDB;