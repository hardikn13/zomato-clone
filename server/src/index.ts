import express from "express";
import App from "./services/ExpressApp";
import { PORT } from "./config";
import DBConnection from "./services/DBConnection";

const StartServer = async () => {
  const app = express();

  await DBConnection();

  await App(app);

  app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
  });
};

StartServer();
