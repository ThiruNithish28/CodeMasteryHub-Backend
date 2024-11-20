import mongoose, { Schema } from "mongoose";

export const initialize = async () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => console.log("connected to DB"))
    .catch(() => {
      console.log("Failed to connect DB");
    });
};
