"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogRouter = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const router = express_1.default.Router();
exports.CatalogRouter = router;
router.get("/restaurants", controllers_1.GetRestaurants);
router.get("/restaurant/:id", controllers_1.GetRestaurantById);
router.get("/search", controllers_1.searchRestaurants);
router.get("/location", controllers_1.searchRestaurantsByLocation);
//# sourceMappingURL=CatalogRoutes.js.map