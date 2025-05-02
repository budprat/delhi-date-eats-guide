
import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedRestaurants from "@/components/FeaturedRestaurants";
import { restaurants } from "@/data/restaurants";
import { Users, Star, Clock } from "lucide-react";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedRestaurants restaurants={restaurants} />
        
        <section className="py-16 container">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h2 className="text-3xl font-semibold">Plan the Perfect Date in Delhi</h2>
            <p className="text-muted-foreground">
              Delhi Date Eats helps you discover restaurants that are perfect for dates, 
              with detailed information on ambience, crowd levels at different times, 
              food quality, and more to ensure your date night is a success.
            </p>
          </div>
        </section>
        
        <section className="py-16 bg-card">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Crowd Insights</h3>
                <p className="text-muted-foreground">
                  Know exactly how crowded a restaurant gets during different times of the day.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Star className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Date Ratings</h3>
                <p className="text-muted-foreground">
                  Restaurants specially rated for their date-night ambience and experience.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Best Time to Visit</h3>
                <p className="text-muted-foreground">
                  Recommendations for the ideal time to visit each restaurant for the best experience.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-muted py-8">
        <div className="container text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Delhi Date Eats • All rights reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
