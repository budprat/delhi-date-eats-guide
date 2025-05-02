
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Utensils } from "lucide-react";

const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Utensils className="h-6 w-6 text-spice-red" />
          <Link to="/" className="text-xl font-bold tracking-tight">
            Delhi Date Eats
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
            Home
          </Link>
          <Link to="/restaurants" className="text-sm font-medium transition-colors hover:text-primary">
            Restaurants
          </Link>
          <Link to="/about" className="text-sm font-medium transition-colors hover:text-primary">
            About
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/recommendations">Get Recommendations</Link>
          </Button>
          <Button asChild>
            <Link to="/restaurants">Explore All</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
