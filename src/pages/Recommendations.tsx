
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { restaurants } from "@/data/restaurants";
import { Restaurant } from "@/types/restaurant";
import RestaurantCard from "@/components/RestaurantCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { areas } from "@/data/restaurants";

const Recommendations: React.FC = () => {
  const [area, setArea] = useState<string>("");
  const [occasion, setOccasion] = useState<string>("");
  const [crowdPreference, setCrowdPreference] = useState<string>("");
  const [recommendations, setRecommendations] = useState<Restaurant[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const getRecommendations = () => {
    let filtered = [...restaurants];

    // Filter by area if selected
    if (area) {
      filtered = filtered.filter((restaurant) => restaurant.area === area);
    }

    // Filter by occasion/type
    if (occasion) {
      switch (occasion) {
        case "first-date":
          // For first dates, prioritize moderate noise level and high ambience
          filtered = filtered.filter((restaurant) => 
            restaurant.noiseLevel < 4 && restaurant.ambience >= 4
          );
          break;
        case "anniversary":
          // For anniversaries, high date score and ambience
          filtered = filtered.filter((restaurant) => 
            restaurant.dateScore >= 4 && restaurant.ambience >= 4
          );
          break;
        case "casual":
          // For casual dates, more relaxed environment
          filtered = filtered.filter((restaurant) => 
            restaurant.priceRange <= 2
          );
          break;
        default:
          break;
      }
    }

    // Filter by crowd preference
    if (crowdPreference) {
      switch (crowdPreference) {
        case "quiet":
          filtered = filtered.filter((restaurant) => 
            restaurant.crowdedness.evening <= 2
          );
          break;
        case "moderate":
          filtered = filtered.filter((restaurant) => 
            restaurant.crowdedness.evening > 2 && restaurant.crowdedness.evening <= 4
          );
          break;
        case "lively":
          filtered = filtered.filter((restaurant) => 
            restaurant.crowdedness.evening > 3
          );
          break;
        default:
          break;
      }
    }

    // Sort by date score
    filtered.sort((a, b) => b.dateScore - a.dateScore);
    
    setRecommendations(filtered.slice(0, 3));
    setHasSearched(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8">
        <div className="container">
          <h1 className="text-3xl font-semibold mb-8 text-center">Get Date Recommendations</h1>
          
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Tell us what you're looking for</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="area">Area of Delhi</Label>
                    <Select value={area} onValueChange={setArea}>
                      <SelectTrigger id="area">
                        <SelectValue placeholder="Select area" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any Area</SelectItem>
                        {areas.map((areaOption) => (
                          <SelectItem key={areaOption} value={areaOption}>
                            {areaOption}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="occasion">Type of Date</Label>
                    <Select value={occasion} onValueChange={setOccasion}>
                      <SelectTrigger id="occasion">
                        <SelectValue placeholder="Select occasion" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any Type</SelectItem>
                        <SelectItem value="first-date">First Date</SelectItem>
                        <SelectItem value="anniversary">Anniversary/Special Occasion</SelectItem>
                        <SelectItem value="casual">Casual Date</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Preferred Crowd Level</Label>
                  <RadioGroup 
                    value={crowdPreference}
                    onValueChange={setCrowdPreference}
                    className="grid grid-cols-3 gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="quiet" id="quiet" />
                      <Label htmlFor="quiet" className="cursor-pointer">Quiet</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="moderate" id="moderate" />
                      <Label htmlFor="moderate" className="cursor-pointer">Moderate</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="lively" id="lively" />
                      <Label htmlFor="lively" className="cursor-pointer">Lively</Label>
                    </div>
                  </RadioGroup>
                </div>

                <Button className="w-full" onClick={getRecommendations}>
                  Get Recommendations
                </Button>
              </CardContent>
            </Card>

            {hasSearched && (
              <div className="mt-12">
                <h2 className="text-2xl font-semibold mb-6">
                  {recommendations.length > 0 
                    ? "Our Top Recommendations for You" 
                    : "No perfect matches found"}
                </h2>
                
                {recommendations.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recommendations.map((restaurant) => (
                      <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">
                      We couldn't find restaurants matching all your criteria. 
                      Try adjusting your preferences or browse all restaurants.
                    </p>
                    <Button asChild>
                      <Link to="/restaurants">Browse All Restaurants</Link>
                    </Button>
                  </div>
                )}
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

export default Recommendations;
