import mongoose, { Schema, Document } from "mongoose";

interface IUserRating {
  rating_text: string;
  rating_color: string;
  votes: string;
  aggregate_rating: string;
}

interface ILocation {
  latitude: string;
  address: string;
  city: string;
  country_id: number;
  locality_verbose: string;
  city_id: number;
  zipcode: string;
  longitude: string;
  locality: string;
}

interface IRestaurant extends Document {
  has_online_delivery: number;
  photos_url?: string; // Optional
  url?: string; // Optional
  price_range: number;
  apikey: string;
  user_rating: IUserRating;
  name: string;
  cuisines: string;
  is_delivering_now: number;
  deeplink: string;
  menu_url?: string; // Optional
  average_cost_for_two: number;
  book_url?: string; // Optional
  switch_to_order_menu: number;
  has_table_booking: number;
  location: ILocation;
  featured_image: string;
  currency: string;
  id: string;
  thumb: string;
}

const userRatingSchema = new Schema<IUserRating>({
  rating_text: { type: String, required: true },
  rating_color: { type: String, required: true },
  votes: { type: String, required: true },
  aggregate_rating: { type: String, required: true },
});

const locationSchema = new Schema<ILocation>({
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

const restaurantSchema = new Schema<IRestaurant>({
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

const Restaurant = mongoose.model<IRestaurant>("Restaurant", restaurantSchema);

export default Restaurant;
