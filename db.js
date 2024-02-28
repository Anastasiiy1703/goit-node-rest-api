import mongoose from "mongoose";
const { DB_URI } = process.env.DB_URI;

export const dataBaseRun = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("DB connected successfuly");
  } catch (error) {
    console.log("Database connection error", error);
  }
};