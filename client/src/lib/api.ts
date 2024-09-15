// src/api.ts

import axios from "axios";

// Base URL for API endpoints
const API_BASE_URL = "http://localhost:3000/api/restaurants";

// Generic API error handler
const handleError = (error: any) => {
  if (axios.isAxiosError(error)) {
    // Handle Axios error
    console.error("API Error:", error.message);
    return error.response?.data || "An error occurred.";
  }
  // Handle non-Axios error
  console.error("Unexpected Error:", error);
  return "An unexpected error occurred.";
};

// Fetch paginated list of restaurants
export const getRestaurants = async (page: number = 0, size: number = 5) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/?page=${page}&size=${size}`
    );
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// Fetch a single restaurant by ID
export const getRestaurantById = async (id: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// Add other API methods as needed
