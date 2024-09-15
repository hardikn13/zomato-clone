import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { Carousel, CarouselItem } from "@/components/ui/carousel";
import { useQuery } from "@tanstack/react-query";
import { getRestaurantById } from "@/api/restaurants";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SquareMenu, UtensilsIcon } from "lucide-react";

const DetailsPage = () => {
  const { restaurantId } = useParams({ from: "/$restaurantId" });

  const { data } = useQuery({
    queryKey: ["restaurants", restaurantId],
    queryFn: () => getRestaurantById(String(restaurantId)),
    // placeholderData: keepPreviousData,
  });
  console.log(data);
  return (
    <div className="flex flex-col w-full min-h-screen">
      <section className="relative w-full h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10" />
        <Carousel className="w-full h-full">
          <CarouselItem>
            <img
              src={data?.thumb}
              alt="Restaurant Exterior"
              width={1920}
              height={1080}
              className="w-full h-full object-cover"
              style={{ aspectRatio: "1920/1080", objectFit: "cover" }}
            />
          </CarouselItem>
        </Carousel>
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 z-20">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold text-white md:text-5xl">
              {data?.name}
            </h1>
            <p className="text-lg text-white/80 mt-2">{data?.cuisines}</p>
          </div>
        </div>
      </section>
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl font-bold mb-4 text-[#e23744]">
              About {data?.name}
            </h2>
            <p className="text-white leading-relaxed">
              {data?.name} is a charming and cozy restaurant that offers a
              delightful dining experience. Nestled in the heart of the city,
              our establishment celebrates the rich flavors of {data?.cuisines}{" "}
              with a focus on using the freshest seasonal ingredients.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-bold mb-2 text-[#e23744]">
                  Address
                </h3>
                <p className="text-white">{data?.location.address}</p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2 text-[#e23744]">Hours</h3>
                <p className="text-white">
                  Monday - Friday: 11am - 10pm
                  <br />
                  Saturday - Sunday: 10am - 11pm
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2 text-[#e23744]">Phone</h3>
                <p className="text-white">(123) 456-7890</p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2 text-[#e23744]">Email</h3>
                <p className="text-white">info@rustictistro.com</p>
              </div>
            </div>
          </div>

          <div className="grid grid-col-1 md:grid-cols-2">
            <Card className="m-6 flex flex-col items-center justify-center">
              <UtensilsIcon height={50} width={50} />
              <p className="text-2xl font-semibold pt-4">
                &#8377;{data?.average_cost_for_two}
              </p>
              <p>for two</p>
            </Card>
            <Card className="m-6 flex flex-col items-center justify-center">
              <SquareMenu height={50} width={50} />
              <Link to={data?.menu_url} className="mt-6">
                <Button variant={"secondary"}>Checkout the Menu</Button>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute("/$restaurantId")({
  component: DetailsPage,
});
