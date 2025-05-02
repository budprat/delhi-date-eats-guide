
import { Restaurant } from "../types/restaurant";

export const restaurants: Restaurant[] = [
  {
    id: 1,
    name: "Cafe Lota",
    area: "South Delhi",
    cuisine: "Modern Indian",
    priceRange: 2,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    description: "Contemporary Indian cuisine in an artistic setting at the National Crafts Museum.",
    address: "National Crafts Museum, Pragati Maidan, New Delhi",
    dateScore: 5,
    crowdedness: {
      morning: 2,
      afternoon: 3,
      evening: 4
    },
    foodQuality: 5,
    ambience: 4,
    noiseLevel: 2,
    bestTimeToVisit: "Weekday afternoon",
    mustTryDishes: ["Sabudana Popcorn", "Palak Patta Chaat", "Apple Wood Smoked Lamb Chops"]
  },
  {
    id: 2,
    name: "Indian Accent",
    area: "Central Delhi",
    cuisine: "Fine Dining Indian",
    priceRange: 3,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmluZSUyMGRpbmluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    description: "Inventive Indian cuisine by acclaimed chef Manish Mehrotra.",
    address: "The Lodhi, Lodhi Road, New Delhi",
    dateScore: 5,
    crowdedness: {
      morning: 1,
      afternoon: 2,
      evening: 4
    },
    foodQuality: 5,
    ambience: 5,
    noiseLevel: 1,
    bestTimeToVisit: "Dinner reservation",
    mustTryDishes: ["Blue Cheese Naan", "Duck Chettinad", "Daulat ki Chaat"]
  },
  {
    id: 3,
    name: "Bukhara",
    area: "Central Delhi",
    cuisine: "North Indian",
    priceRange: 3,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aW5kaWFuJTIwcmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    description: "Legendary restaurant known for its tandoori cuisine and dal bukhara.",
    address: "ITC Maurya, Diplomatic Enclave, New Delhi",
    dateScore: 4,
    crowdedness: {
      morning: 1,
      afternoon: 3,
      evening: 5
    },
    foodQuality: 5,
    ambience: 4,
    noiseLevel: 3,
    bestTimeToVisit: "Early dinner",
    mustTryDishes: ["Dal Bukhara", "Sikandari Raan", "Tandoori Jhinga"]
  },
  {
    id: 4,
    name: "Diggin",
    area: "Connaught Place",
    cuisine: "Continental, Italian",
    priceRange: 2,
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1592861956120-e524fc739696?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FmZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    description: "Charming cafe with a garden setting, perfect for casual dates.",
    address: "N-Block, Connaught Place, New Delhi",
    dateScore: 4,
    crowdedness: {
      morning: 2,
      afternoon: 4,
      evening: 4
    },
    foodQuality: 4,
    ambience: 5,
    noiseLevel: 3,
    bestTimeToVisit: "Weekend brunch",
    mustTryDishes: ["Spaghetti Aglio e Olio", "Blueberry Cheesecake", "Quattro Formaggi Pizza"]
  },
  {
    id: 5,
    name: "Hauz Khas Social",
    area: "South Delhi",
    cuisine: "Fusion",
    priceRange: 2,
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHB1YnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    description: "Quirky workspace by day, buzzing bar by night with lake views.",
    address: "Hauz Khas Village, New Delhi",
    dateScore: 3,
    crowdedness: {
      morning: 2,
      afternoon: 3,
      evening: 5
    },
    foodQuality: 3,
    ambience: 4,
    noiseLevel: 4,
    bestTimeToVisit: "Sunset for drinks",
    mustTryDishes: ["Butter Chicken Biryani", "Death Wings", "Long Island Iced Tea"]
  },
  {
    id: 6,
    name: "The Grammar Room",
    area: "South Delhi",
    cuisine: "European",
    priceRange: 2,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNhZmV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    description: "Chic forest cafe with excellent brunch options.",
    address: "One Style Mile, Mehrauli, New Delhi",
    dateScore: 5,
    crowdedness: {
      morning: 2,
      afternoon: 3,
      evening: 4
    },
    foodQuality: 4,
    ambience: 5,
    noiseLevel: 2,
    bestTimeToVisit: "Weekend breakfast",
    mustTryDishes: ["Avocado Toast", "French Toast", "Grammar Room Breakfast"]
  }
];

export const areas = [...new Set(restaurants.map(restaurant => restaurant.area))];
export const cuisines = [...new Set(restaurants.map(restaurant => restaurant.cuisine))];
