import express from "express";
import {
  GetRestaurantById,
  GetRestaurants,
  searchRestaurants,
  searchRestaurantsByLocation,
} from "../controllers";

const router = express.Router();

router.get("/restaurants", GetRestaurants);
router.get("/restaurant/:id", GetRestaurantById);
router.get("/search", searchRestaurants);
router.get("/location", searchRestaurantsByLocation);

export { router as CatalogRouter };
