
import React from "react";
import Navbar from "@/components/Navbar";
import { Separator } from "@/components/ui/separator";
import { Utensils, Users, Star } from "lucide-react";

const About: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">About Delhi Date Eats</h1>
          <p className="text-muted-foreground mb-8 text-lg">
            Delhi Date Eats is your go-to guide for planning the perfect dining experience
            in Delhi. We provide detailed information about restaurants, with a special focus
            on what makes them ideal for dates.
          </p>

          <Separator className="my-8" />

          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-muted-foreground mb-8">
            We believe that the right restaurant can make a date truly special. Our mission
            is to help you find that perfect spot by providing insights that regular
            restaurant guides don't offer - like crowd levels at different times, the best
            time slots for a romantic atmosphere, and specific ratings for date-worthiness.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Utensils className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Curated Selection</h3>
              <p className="text-muted-foreground">
                We personally visit and evaluate each restaurant for its date potential.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Crowd Insights</h3>
              <p className="text-muted-foreground">
                Know exactly how crowded a restaurant gets so you can plan accordingly.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Date Ratings</h3>
              <p className="text-muted-foreground">
                Our unique rating system helps you find places perfect for your date.
              </p>
            </div>
          </div>

          <Separator className="my-8" />

          <h2 className="text-2xl font-semibold mb-4">Connect With Us</h2>
          <p className="text-muted-foreground">
            Have a restaurant recommendation or feedback? We'd love to hear from you! 
            Contact us at <span className="font-medium">hello@delhidateeats.com</span>
          </p>
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

export default About;
