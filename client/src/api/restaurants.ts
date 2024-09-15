import { IRestaurant } from "@/lib/types";
import axios from "axios";

const instance = axios.create({
  // baseURL: import.meta.env.VITE_API_URL,
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getRestaurants = async (page: string) => {
  try {
    const restaurants = await instance.get(`/restaurants?page=${page}`);
    if (restaurants.data && restaurants.data.totalPages) {
      return restaurants.data as {
        restaurants: IRestaurant[];
        currentPage: number;
        totalPages: number;
        totalItems: number;
      };
    }
    throw new Error("unable to get restaurants");
  } catch (err) {
    console.log(err);
  }
};

export const getRestaurantById = async (id: string) => {
  try {
    const restaurant = await instance.get(`/restaurant/${id}`);
    console.log(restaurant);
    if (restaurant.data) {
      return restaurant.data as IRestaurant;
    }
    throw new Error("unable to get restaurants");
  } catch (err) {
    console.log(err);
  }
};

export const searchRestaurants = async (searchParam: string, page: string) => {
  try {
    const restaurants = await instance.get(
      `/search?city=${searchParam}&page=${page}`
    );
    console.log(restaurants);

    if (restaurants.data && restaurants.data.totalPages) {
      return restaurants.data as {
        restaurants: IRestaurant[];
        currentPage: number;
        totalPages: number;
        totalItems: number;
      };
    }
    throw new Error("unable to get restaurants");
  } catch (err) {
    console.log(err);
  }
};

export const searchNearbyRestaurants = async (
  latitude: string,
  longitude: string
) => {
  try {
    const restaurants = await instance.get(
      `/location?latitude=${latitude}&longitude=${longitude}`
    );
    console.log(restaurants);

    if (restaurants.data && restaurants.data.totalPages) {
      return restaurants.data as {
        restaurants: IRestaurant[];
        currentPage: number;
        totalPages: number;
        totalItems: number;
      };
    }
    throw new Error("unable to get restaurants");
  } catch (err) {
    console.log(err);
  }
};
