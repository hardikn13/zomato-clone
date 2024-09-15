import express, { Application } from "express";
import { CatalogRouter } from "../routes/CatalogRoutes";
import cors from "cors";

export default async (app: Application) => {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(__dirname));

  app.use("/api", CatalogRouter);
  return app;
};
