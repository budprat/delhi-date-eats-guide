
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HeroSection: React.FC = () => {
  return (
    <div className="relative">
      {/* Hero background image */}
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      <div 
        className="h-[70vh] bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aW5kaWFuJTIwcmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1920&q=80')"
        }}
      ></div>

      {/* Hero content */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="container text-center px-4">
          <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              Find the Perfect Date Spot in Delhi
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
              Discover the best restaurants for your date night with insights on crowd levels, 
              ambience, and the perfect time to visit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" asChild>
                <Link to="/restaurants">Browse All Restaurants</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-background/10 backdrop-blur-sm hover:bg-background/20" asChild>
                <Link to="/recommendations">Get Date Recommendations</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
