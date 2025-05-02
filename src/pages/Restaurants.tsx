
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import RestaurantCard from "@/components/RestaurantCard";
import RestaurantFilters from "@/components/RestaurantFilters";
import { Restaurant, FilterOptions } from "@/types/restaurant";
import { restaurants } from "@/data/restaurants";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Restaurants: React.FC = () => {
  const [filters, setFilters] = useState<FilterOptions>({});
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(restaurants);

  const resetFilters = () => {
    setFilters({});
  };

  // Apply filters whenever they change
  useEffect(() => {
    const filtered = restaurants.filter((restaurant) => {
      // Filter by area if specified
      if (filters.area && restaurant.area !== filters.area) {
        return false;
      }

      // Filter by cuisine if specified
      if (filters.cuisine && restaurant.cuisine !== filters.cuisine) {
        return false;
      }

      // Filter by price range if specified
      if (filters.priceRange && restaurant.priceRange > filters.priceRange) {
        return false;
      }

      // Filter by date score if specified
      if (filters.dateScore && restaurant.dateScore < filters.dateScore) {
        return false;
      }

      // Filter by crowd level if specified
      if (filters.crowdLevel && restaurant.crowdedness.evening > filters.crowdLevel) {
        return false;
      }

      return true;
    });

    setFilteredRestaurants(filtered);
  }, [filters]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold">Delhi Restaurants</h1>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="md:hidden flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="py-6">
                <RestaurantFilters
                  filters={filters}
                  setFilters={setFilters}
                  onReset={resetFilters}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar with filters - desktop only */}
          <div className="hidden md:block">
            <RestaurantFilters
              filters={filters}
              setFilters={setFilters}
              onReset={resetFilters}
            />
          </div>

          {/* Restaurant listings */}
          <div className="lg:col-span-3">
            {filteredRestaurants.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRestaurants.map((restaurant) => (
                  <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-xl font-medium mb-2">No restaurants found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your filters</p>
                <Button onClick={resetFilters}>Reset Filters</Button>
              </div>
            )}
          </div>
        </div>
      </main>
      <footer className="bg-muted py-8">
        <div className="container text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Delhi Date Eats • All rights reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default Restaurants;
