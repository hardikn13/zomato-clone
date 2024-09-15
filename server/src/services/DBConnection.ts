import mongoose from "mongoose";
import { MONGO_URI } from "../config";

export default async () => {
  try {
    mongoose
      .connect(MONGO_URI)
      .then(() => {
        console.log("DB connected");
      })
      .catch((err) => {
        console.log("Error : " + err);
      });
  } catch (ex) {
    console.log(ex);
  }
};
