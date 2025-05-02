
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { areas, cuisines } from "@/data/restaurants";
import { FilterOptions } from "@/types/restaurant";

interface RestaurantFiltersProps {
  filters: FilterOptions;
  setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
  onReset: () => void;
}

const RestaurantFilters: React.FC<RestaurantFiltersProps> = ({ 
  filters, 
  setFilters,
  onReset
}) => {
  return (
    <div className="bg-card p-4 rounded-md shadow-sm border">
      <div className="mb-6">
        <h3 className="font-medium mb-3">Filters</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="area">Area</Label>
            <Select
              value={filters.area || ""}
              onValueChange={(value) => setFilters({ ...filters, area: value })}
            >
              <SelectTrigger id="area">
                <SelectValue placeholder="All Areas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Areas</SelectItem>
                {areas.map((area) => (
                  <SelectItem key={area} value={area}>
                    {area}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cuisine">Cuisine</Label>
            <Select
              value={filters.cuisine || ""}
              onValueChange={(value) => setFilters({ ...filters, cuisine: value })}
            >
              <SelectTrigger id="cuisine">
                <SelectValue placeholder="All Cuisines" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Cuisines</SelectItem>
                {cuisines.map((cuisine) => (
                  <SelectItem key={cuisine} value={cuisine}>
                    {cuisine}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="priceRange">Price Range</Label>
              <span className="text-sm text-muted-foreground">
                {filters.priceRange ? `₹`.repeat(filters.priceRange) : 'Any'}
              </span>
            </div>
            <Slider
              id="priceRange"
              min={0}
              max={3}
              step={1}
              defaultValue={[filters.priceRange || 0]}
              onValueChange={(value) => setFilters({ ...filters, priceRange: value[0] })}
              className="py-2"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="dateScore">Minimum Date Score</Label>
              <span className="text-sm text-muted-foreground">
                {filters.dateScore ? `${filters.dateScore}★` : 'Any'}
              </span>
            </div>
            <Slider
              id="dateScore"
              min={0}
              max={5}
              step={1}
              defaultValue={[filters.dateScore || 0]}
              onValueChange={(value) => setFilters({ ...filters, dateScore: value[0] })}
              className="py-2"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="crowdLevel">Maximum Crowd Level</Label>
              <span className="text-sm text-muted-foreground">
                {filters.crowdLevel ? `${filters.crowdLevel}` : 'Any'}
              </span>
            </div>
            <Slider
              id="crowdLevel"
              min={0}
              max={5}
              step={1}
              defaultValue={[filters.crowdLevel || 5]}
              onValueChange={(value) => setFilters({ ...filters, crowdLevel: value[0] })}
              className="py-2"
            />
          </div>
        </div>
      </div>

      <Button
        onClick={onReset}
        variant="outline"
        className="w-full"
      >
        Reset Filters
      </Button>
    </div>
  );
};

export default RestaurantFilters;
