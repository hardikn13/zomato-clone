"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const userRatingSchema = new mongoose_1.Schema({
    rating_text: { type: String, required: true },
    rating_color: { type: String, required: true },
    votes: { type: String, required: true },
    aggregate_rating: { type: String, required: true },
});
const locationSchema = new mongoose_1.Schema({
    latitude: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    country_id: { type: Number, required: true },
    locality_verbose: { type: String, required: true },
    city_id: { type: Number, required: true },
    zipcode: { type: String, required: true },
    longitude: { type: String, required: true },
    locality: { type: String, required: true },
});
const restaurantSchema = new mongoose_1.Schema({
    has_online_delivery: { type: Number, required: true },
    photos_url: { type: String }, // Optional
    url: { type: String }, // Optional
    price_range: { type: Number, required: true },
    apikey: { type: String, required: true },
    user_rating: { type: userRatingSchema, required: true },
    name: { type: String, required: true },
    cuisines: { type: String, required: true },
    is_delivering_now: { type: Number, required: true },
    deeplink: { type: String, required: true },
    menu_url: { type: String }, // Optional
    average_cost_for_two: { type: Number, required: true },
    book_url: { type: String }, // Optional
    switch_to_order_menu: { type: Number, required: true },
    has_table_booking: { type: Number, required: true },
    location: { type: locationSchema, required: true },
    featured_image: { type: String, required: true },
    currency: { type: String, required: true },
    id: { type: String, required: true },
    thumb: { type: String, required: true },
});
const Restaurant = mongoose_1.default.model("Restaurant", restaurantSchema);
exports.default = Restaurant;
//# sourceMappingURL=Restaurant.js.map