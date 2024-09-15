"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchRestaurants =
  exports.searchRestaurantsByLocation =
  exports.GetRestaurantById =
  exports.GetRestaurants =
    void 0;
const Restaurant_1 = __importDefault(require("../models/Restaurant"));
const GetRestaurants = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      // Get page and limit from query parameters, defaulting to page 1 and limit 20
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 20;
      // Calculate the number of documents to skip
      const skip = (page - 1) * limit;
      // Fetch the restaurants with pagination
      const restaurants = yield Restaurant_1.default
        .find()
        .skip(skip)
        .limit(limit);
      // Get the total number of restaurants for pagination purposes
      const total = yield Restaurant_1.default.countDocuments();
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
  });
exports.GetRestaurants = GetRestaurants;
const GetRestaurantById = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const id = req.params.id;
      const restaurant = yield Restaurant_1.default.findOne({ id });
      return res.status(200).json(restaurant);
    } catch (err) {
      return res.status(400).json(err);
    }
  });
exports.GetRestaurantById = GetRestaurantById;
// Haversine formula to calculate distance between two lat/lon points
function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.pow(Math.sin(dLat / 2), 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.pow(Math.sin(dLon / 2), 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}
//
// type LocationInput = {
//   latitude: string;
//   longitude: str;
//   radius: number;
// };
const searchRestaurantsByLocation = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const lat = parseFloat(req.query.latitude);
    const lon = parseFloat(req.query.longitude);
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    if (!lat || !lon) {
      return res
        .status(400)
        .json({ error: "Latitude and longitude are required" });
    }
    console.log(lat, "latitude");
    yield Restaurant_1.default
      .find()
      .then((restaurants) => {
        const nearbyRestaurants = restaurants.filter((restaurant) => {
          var _a, _b;
          const distance = haversine(
            lat,
            lon,
            parseFloat(
              (_a = restaurant.location) === null || _a === void 0
                ? void 0
                : _a.latitude
            ),
            parseFloat(
              (_b = restaurant.location) === null || _b === void 0
                ? void 0
                : _b.longitude
            )
          );
          return distance <= 300;
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
  });
exports.searchRestaurantsByLocation = searchRestaurantsByLocation;
const searchRestaurants = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const city = req.query.city.toLowerCase();
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    // Calculate the number of documents to skip
    const skip = (page - 1) * limit;
    if (!city) {
      return res.status(400).json({ error: "City is required" });
    }
    try {
      // const restaurants = await Restaurant.find({ "location.city": city });
      const restaurants = yield Restaurant_1.default
        .aggregate([
          {
            $match: {
              $expr: {
                $eq: [{ $toLower: "$location.city" }, city],
              },
            },
          },
        ])
        .limit(limit)
        .skip(skip);
      // Get the total number of restaurants for pagination purposes
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
  });
exports.searchRestaurants = searchRestaurants;
//# sourceMappingURL=CatalogController.js.map
