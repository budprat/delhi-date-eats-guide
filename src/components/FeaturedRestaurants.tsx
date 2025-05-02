
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import RestaurantCard from "./RestaurantCard";
import { Restaurant } from "@/types/restaurant";
import { ChevronRight } from "lucide-react";

interface FeaturedRestaurantsProps {
  restaurants: Restaurant[];
}

const FeaturedRestaurants: React.FC<FeaturedRestaurantsProps> = ({ restaurants }) => {
  // Filter to show only top rated restaurants for dating
  const featuredRestaurants = restaurants
    .filter((restaurant) => restaurant.dateScore >= 4)
    .slice(0, 3);

  return (
    <section className="py-16 bg-muted/40">
      <div className="container">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-semibold tracking-tight">Best for Date Night</h2>
          <Button variant="ghost" asChild>
            <Link to="/restaurants" className="flex items-center gap-1">
              View all <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedRestaurants;
