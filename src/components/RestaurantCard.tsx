
import React from "react";
import { Link } from "react-router-dom";
import { Restaurant } from "@/types/restaurant";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Star, Users, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  const { id, name, area, cuisine, priceRange, rating, image, dateScore, foodQuality, crowdedness } = restaurant;

  // Generate price range string
  const priceRangeText = Array(priceRange).fill("₹").join("");

  // Function to determine crowd level text and color
  const getCrowdLevel = () => {
    const eveningCrowd = crowdedness.evening;
    if (eveningCrowd <= 2) return { text: "Low", color: "bg-green-100 text-green-800" };
    if (eveningCrowd <= 4) return { text: "Moderate", color: "bg-yellow-100 text-yellow-800" };
    return { text: "High", color: "bg-red-100 text-red-800" };
  };

  const crowdInfo = getCrowdLevel();

  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg card-hover">
      <Link to={`/restaurant/${id}`} className="block">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute top-2 right-2">
            <Badge variant="outline" className="bg-white/80 backdrop-blur-sm">
              {cuisine}
            </Badge>
          </div>
        </div>
        <CardContent className="pt-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold line-clamp-1">{name}</h3>
            <span className="text-sm font-medium text-muted-foreground">{priceRangeText}</span>
          </div>
          <p className="text-sm text-muted-foreground mb-3">{area}</p>
          
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span>{rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className={`px-2 py-0.5 rounded-full text-xs ${crowdInfo.color}`}>
                {crowdInfo.text}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{foodQuality >= 4 ? "Worth the wait" : "Quick bite"}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4">
          <div className="w-full flex justify-between items-center">
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium">Date Score:</span>
              <div className="flex">
                {Array(5).fill(0).map((_, i) => (
                  <Star 
                    key={i}
                    className={`h-4 w-4 ${i < dateScore ? "fill-primary text-primary" : "text-muted"}`}
                  />
                ))}
              </div>
            </div>
            <Badge variant="outline" className="ml-auto">View Details</Badge>
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default RestaurantCard;
