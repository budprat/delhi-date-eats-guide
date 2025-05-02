
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Restaurant } from "@/types/restaurant";
import { restaurants } from "@/data/restaurants";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Star, Users, Clock, ChevronLeft, Utensils, CupSoda, ChefHat } from "lucide-react";

const RestaurantDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);

  useEffect(() => {
    // Find the restaurant with the matching ID
    const foundRestaurant = restaurants.find((r) => r.id === Number(id));
    setRestaurant(foundRestaurant || null);
  }, [id]);

  if (!restaurant) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container py-16 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Restaurant not found</h2>
            <Button asChild>
              <Link to="/restaurants">Browse All Restaurants</Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  // Generate crowd level elements
  const renderCrowdLevel = (level: number, timeOfDay: string) => {
    const crowdColor = 
      level <= 2 ? "bg-green-100 text-green-800" : 
      level <= 4 ? "bg-yellow-100 text-yellow-800" : 
      "bg-red-100 text-red-800";
    
    const crowdText = 
      level <= 2 ? "Low" : 
      level <= 4 ? "Moderate" : 
      "High";
    
    return (
      <div className="flex flex-col items-center">
        <span className="text-sm text-muted-foreground mb-1">{timeOfDay}</span>
        <span className={`px-3 py-1 rounded-full text-sm ${crowdColor}`}>
          {crowdText} ({level}/5)
        </span>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero image */}
        <div className="h-[40vh] lg:h-[50vh] relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 w-full p-6 z-20">
            <div className="container">
              <Button variant="outline" size="sm" className="mb-4 bg-background/20 backdrop-blur-sm hover:bg-background/40 text-white" asChild>
                <Link to="/restaurants" className="flex items-center gap-1">
                  <ChevronLeft className="h-4 w-4" /> Back to Restaurants
                </Link>
              </Button>
              <Badge className="mb-2">{restaurant.cuisine}</Badge>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{restaurant.name}</h1>
              <p className="text-white/80 mb-4">{restaurant.area} • {Array(restaurant.priceRange).fill("₹").join("")}</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 bg-background/20 backdrop-blur-sm px-3 py-1 rounded-full text-white">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{restaurant.rating.toFixed(1)} Rating</span>
                </div>
                <div className="flex items-center gap-1 bg-background/20 backdrop-blur-sm px-3 py-1 rounded-full text-white">
                  <Star className={`h-4 w-4 ${restaurant.dateScore >= 4 ? "fill-primary text-primary" : "fill-muted text-muted"}`} />
                  <span>{restaurant.dateScore}/5 Date Score</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Restaurant details */}
        <div className="container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">About</h2>
                  <p className="text-muted-foreground mb-6">{restaurant.description}</p>

                  <Separator className="my-6" />

                  <h2 className="text-2xl font-semibold mb-4">Location</h2>
                  <p className="text-muted-foreground">{restaurant.address}</p>

                  <Separator className="my-6" />

                  <h2 className="text-2xl font-semibold mb-4">Must Try Dishes</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {restaurant.mustTryDishes.map((dish, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 rounded-md border">
                        <Utensils className="h-5 w-5 text-primary" />
                        <span>{dish}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div>
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Date Experience</h3>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Ambience</span>
                        <div className="flex">
                          {Array(5).fill(0).map((_, i) => (
                            <Star 
                              key={i}
                              className={`h-4 w-4 ${i < restaurant.ambience ? "fill-primary text-primary" : "text-muted"}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Food Quality</span>
                        <div className="flex">
                          {Array(5).fill(0).map((_, i) => (
                            <ChefHat 
                              key={i}
                              className={`h-4 w-4 ${i < restaurant.foodQuality ? "fill-curry-yellow text-curry-yellow" : "text-muted"}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Noise Level</span>
                        <div className="flex">
                          {Array(5).fill(0).map((_, i) => (
                            <CupSoda 
                              key={i}
                              className={`h-4 w-4 ${i < restaurant.noiseLevel ? "fill-muted-foreground text-muted-foreground" : "text-muted"}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <span className="font-medium">Best Time to Visit</span>
                      <p className="text-muted-foreground text-sm mt-1">{restaurant.bestTimeToVisit}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Crowd Levels
                  </h3>
                  
                  <div className="grid grid-cols-3 gap-4 text-center">
                    {renderCrowdLevel(restaurant.crowdedness.morning, "Morning")}
                    {renderCrowdLevel(restaurant.crowdedness.afternoon, "Afternoon")}
                    {renderCrowdLevel(restaurant.crowdedness.evening, "Evening")}
                  </div>
                </CardContent>
              </Card>
            </div>
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

export default RestaurantDetail;
