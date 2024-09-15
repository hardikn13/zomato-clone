import { Card } from "@/components/ui/card";
import { IRestaurant } from "@/lib/types";
import Paginator from "./ui/paginator";
import { State } from "@/routes";
import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getRestaurants } from "@/lib/api";

export default function RestaurantList({ page, setPage }: State) {
  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);
      try {
        const response = await getRestaurants(page, 5);
        const restaurantData = response.content || []; // Fallback to an empty array
        setRestaurants(Array.isArray(restaurantData) ? restaurantData : []); // Ensure it's an array
        setTotalPages(response.totalPages || 0); // Fallback if totalPages is undefined
      } catch (error) {
        console.error("Error fetching restaurants:", error);
        setError("Failed to fetch restaurants");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [page]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8" style={{ color: "#ffff" }}>
        Explore
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((item) => (
          <Link key={item.id} to={"/" + item.id}>
            <Card className="overflow-hidden cursor-pointer hover:shadow-lg">
              <img
                src={item.thumb} // Ensure 'thumb' is available or adjust accordingly
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
                <p className="text-muted-foreground mb-4">{item.cuisines}</p>
                <div className="flex items-center mb-4">
                  <MapPinIcon className="w-4 h-4 mr-1 text-muted-foreground" />
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <StarIcon className="w-4 h-4 mr-1" />
                  <span className="mr-4">{item.aggregateRating}</span>
                  <MessageSquareIcon className="w-4 h-4 mr-1" />
                  <span>{item.votes}</span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
      <div className="p-6">
        <Paginator
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(pageNumber) => setPage(pageNumber)}
          showPreviousNext
        />
      </div>
    </div>
  );
}

function MapPinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function MessageSquareIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
