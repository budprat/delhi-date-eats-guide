
export interface Restaurant {
  id: number;
  name: string;
  area: string;
  cuisine: string;
  priceRange: number; // 1-3 ($ to $$$)
  rating: number; // 1-5
  image: string;
  description: string;
  address: string;
  dateScore: number; // 1-5 how good it is for a date
  crowdedness: {
    morning: number; // 1-5
    afternoon: number; // 1-5
    evening: number; // 1-5
  };
  foodQuality: number; // 1-5
  ambience: number; // 1-5
  noiseLevel: number; // 1-5
  bestTimeToVisit: string;
  mustTryDishes: string[];
}

export type FilterOptions = {
  area?: string;
  cuisine?: string;
  priceRange?: number;
  dateScore?: number;
  crowdLevel?: number;
};
