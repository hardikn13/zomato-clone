import { NextFunction, Request, Response } from "express";
import Restaurant from "../models/Restaurant";

export const GetRestaurants = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get page and limit from query parameters, defaulting to page 1 and limit 20
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;

    // Calculate the number of documents to skip
    const skip = (page - 1) * limit;

    // Fetch the restaurants with pagination
    const restaurants = await Restaurant.find().skip(skip).limit(limit);

    // Get the total number of restaurants for pagination purposes
    const total = await Restaurant.countDocuments();

    // Return the restaurants and pagination info
    return res.json({
      content: restaurants,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export const GetRestaurantById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const restaurant = await Restaurant.findOne({ id });

    return res.status(200).json(restaurant);
  } catch (err) {
    return res.status(400).json(err);
  }
};

// Haversine formula to calculate distance between two lat/lon points
function haversine(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Radius of Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}
//
// type LocationInput = {
//   latitude: string;
//   longitude: str;
//   radius: number;
// };

export const searchRestaurantsByLocation = async (
  req: Request,
  res: Response
) => {
  const lat = parseFloat(req.query.latitude as string);
  const lon = parseFloat(req.query.longitude as string);
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;

  if (!lat || !lon) {
    return res
      .status(400)
      .json({ error: "Latitude and longitude are required" });
  }
  console.log(lat, "latitude");

  await Restaurant.find()
    .then((restaurants) => {
      const nearbyRestaurants = restaurants.filter((restaurant) => {
        const distance = haversine(
          lat,
          lon,
          parseFloat(restaurant.location?.latitude),
          parseFloat(restaurant.location?.longitude)
        );
        return distance <= 100;
      });
      const total = nearbyRestaurants.length;
      return res.status(200).json({
        restaurants: nearbyRestaurants,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
      });
    })
    .catch((error) => {
      console.error("Error querying restaurants:", error);
      res.status(500).json({ error: "Internal server error" });
    });
};

export const searchRestaurants = async (req: Request, res: Response) => {
  const city = req.query.city as string;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;

  // Calculate the number of documents to skip
  const skip = (page - 1) * limit;
  if (!city) {
    return res.status(400).json({ error: "City is required" });
  }
  try {
    // const restaurants = await Restaurant.find({ "location.city": city });
    const trimmedCity = city.trim();
    const restaurants = await Restaurant.find({
      "location.city": {
        $regex: `^${trimmedCity}$`, // Use template literals for string interpolation
        $options: "i", // 'i' for case-insensitive matching
      },
    })
      .limit(limit)
      .skip(skip);

    // Get the total number of restaurants for pagination purposes
    console.log(restaurants);
    console.log(city);
    const total = restaurants.length;

    // Return the restaurants and pagination info
    return res.json({
      content: restaurants,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (err) {
    return res.status(400).json(err);
  }
};
