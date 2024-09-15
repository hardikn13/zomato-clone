// User rating information
export interface IUserRating {
  ratingText: string; // Changed to ratingText
  ratingColor: string; // Changed to ratingColor
  votes: number; // Added as number
  aggregateRating: number; // Changed to number
}

// Location details
export interface ILocation {
  latitude: number; // Changed to number
  address: string;
  city: string;
  countryCode: number; // Changed to countryCode
  localityVerbose: string; // Changed to localityVerbose
  cityId: number; // Changed to cityId
  zipcode: string;
  longitude: number; // Changed to number
  locality: string;
}

// Restaurant details
export interface IRestaurant {
  id: number; // Changed to number
  name: string; // Changed to restaurantName
  countryCode: number; // Changed to number
  city: string;
  address: string;
  location: ILocation;
  locality: string;
  localityVerbose: string; // Changed to localityVerbose
  longitude: number; // Changed to number
  latitude: number; // Changed to number
  cuisines: string;
  average_cost_for_two: number; // Changed to number
  currency: string;
  hasTableBooking: string; // Changed to string
  hasOnlineDelivery: string; // Changed to string
  isDelivering: string; // Changed to string
  switchToOrderMenu: string; // Changed to string
  priceRange: number; // Changed to number
  aggregateRating: number; // Changed to number
  ratingColor: string; // Changed to ratingColor
  ratingText: string; // Changed to ratingText
  votes: number; // Changed to number
  photosUrl?: string; // Optional
  url?: string; // Optional
  deeplink: string;
  menu_url?: string; // Optional
  bookUrl?: string; // Optional
  featured_image: string; // Changed to featuredImage
  thumb: string;
}
