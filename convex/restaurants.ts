import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

/**
 * LIST RESTAURANTS with optional filters
 */
export const list = query({
  args: {
    area: v.optional(v.string()),
    cuisine: v.optional(v.string()),
    maxPrice: v.optional(v.number()),
    minDateScore: v.optional(v.number()),
    maxCrowdLevel: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let restaurants = await ctx.db.query("restaurants").collect();

    // Apply filters
    if (args.area && args.area !== "all-areas") {
      restaurants = restaurants.filter((r) => r.area === args.area);
    }

    if (args.cuisine && args.cuisine !== "all-cuisines") {
      restaurants = restaurants.filter((r) => r.cuisine === args.cuisine);
    }

    if (args.maxPrice !== undefined) {
      restaurants = restaurants.filter((r) => r.priceRange <= args.maxPrice);
    }

    if (args.minDateScore !== undefined) {
      restaurants = restaurants.filter((r) => r.dateScore >= args.minDateScore);
    }

    if (args.maxCrowdLevel !== undefined) {
      restaurants = restaurants.filter(
        (r) => r.crowdedness.evening <= args.maxCrowdLevel
      );
    }

    return restaurants;
  },
});

/**
 * GET single restaurant by ID
 */
export const get = query({
  args: { id: v.id("restaurants") },
  handler: async (ctx, args) => {
    const restaurant = await ctx.db.get(args.id);
    if (!restaurant) return null;

    // Get recent reviews for this restaurant
    const reviews = await ctx.db
      .query("reviews")
      .withIndex("by_restaurant", (q) => q.eq("restaurantId", args.id))
      .order("desc")
      .take(10);

    // Get user data for each review
    const reviewsWithUsers = await Promise.all(
      reviews.map(async (review) => {
        const user = await ctx.db.get(review.userId);
        return {
          ...review,
          user: user
            ? {
                name: user.name || "Anonymous",
                image: user.image,
              }
            : { name: "Anonymous", image: undefined },
        };
      })
    );

    return { ...restaurant, reviews: reviewsWithUsers };
  },
});

/**
 * GET RECOMMENDATIONS based on preferences
 */
export const getRecommendations = query({
  args: {
    area: v.optional(v.string()),
    occasion: v.string(),
    crowdPreference: v.string(),
    userId: v.optional(v.id("users")),
  },
  handler: async (ctx, args) => {
    let restaurants = await ctx.db.query("restaurants").collect();

    // Filter by user preferences if logged in
    if (args.userId) {
      const user = await ctx.db.get(args.userId);
      if (user?.preferences?.cuisinePreferences?.length) {
        restaurants = restaurants.filter((r) =>
          user.preferences!.cuisinePreferences.includes(r.cuisine)
        );
      }
    }

    // Filter by area
    if (args.area && args.area !== "all-areas") {
      restaurants = restaurants.filter((r) => r.area === args.area);
    }

    // Occasion-based filtering
    switch (args.occasion) {
      case "first-date":
        // For first dates, prioritize low noise and high ambience
        restaurants = restaurants.filter(
          (r) => r.noiseLevel < 4 && r.ambience >= 4
        );
        break;
      case "anniversary":
        // For anniversaries, high date score and ambience
        restaurants = restaurants.filter(
          (r) => r.dateScore >= 4 && r.ambience >= 4
        );
        break;
      case "casual":
        // For casual dates, more budget-friendly
        restaurants = restaurants.filter((r) => r.priceRange <= 2);
        break;
      default:
        break;
    }

    // Crowd preference filtering
    switch (args.crowdPreference) {
      case "quiet":
        restaurants = restaurants.filter((r) => r.crowdedness.evening <= 2);
        break;
      case "moderate":
        restaurants = restaurants.filter(
          (r) => r.crowdedness.evening > 2 && r.crowdedness.evening <= 4
        );
        break;
      case "lively":
        restaurants = restaurants.filter((r) => r.crowdedness.evening > 3);
        break;
      default:
        break;
    }

    // Sort by date score (descending)
    restaurants.sort((a, b) => b.dateScore - a.dateScore);

    // Return top 3
    return restaurants.slice(0, 3);
  },
});

/**
 * GET unique areas for filtering
 */
export const getAreas = query({
  args: {},
  handler: async (ctx) => {
    const restaurants = await ctx.db.query("restaurants").collect();
    const areas = [...new Set(restaurants.map((r) => r.area))];
    return areas.sort();
  },
});

/**
 * GET unique cuisines for filtering
 */
export const getCuisines = query({
  args: {},
  handler: async (ctx) => {
    const restaurants = await ctx.db.query("restaurants").collect();
    const cuisines = [...new Set(restaurants.map((r) => r.cuisine))];
    return cuisines.sort();
  },
});

/**
 * SEARCH restaurants by name
 */
export const search = query({
  args: {
    searchTerm: v.string(),
  },
  handler: async (ctx, args) => {
    const restaurants = await ctx.db
      .query("restaurants")
      .withSearchIndex("search_name", (q) => q.search("name", args.searchTerm))
      .take(10);

    return restaurants;
  },
});

/**
 * ADD to favorites
 */
export const addToFavorites = mutation({
  args: {
    userId: v.id("users"),
    restaurantId: v.id("restaurants"),
  },
  handler: async (ctx, args) => {
    // Check if already favorited
    const existing = await ctx.db
      .query("favorites")
      .withIndex("by_user_restaurant", (q) =>
        q.eq("userId", args.userId).eq("restaurantId", args.restaurantId)
      )
      .first();

    if (existing) {
      return { success: false, message: "Already in favorites", id: existing._id };
    }

    const favoriteId = await ctx.db.insert("favorites", {
      userId: args.userId,
      restaurantId: args.restaurantId,
      addedAt: Date.now(),
    });

    return { success: true, message: "Added to favorites", id: favoriteId };
  },
});

/**
 * REMOVE from favorites
 */
export const removeFromFavorites = mutation({
  args: {
    userId: v.id("users"),
    restaurantId: v.id("restaurants"),
  },
  handler: async (ctx, args) => {
    const favorite = await ctx.db
      .query("favorites")
      .withIndex("by_user_restaurant", (q) =>
        q.eq("userId", args.userId).eq("restaurantId", args.restaurantId)
      )
      .first();

    if (!favorite) {
      return { success: false, message: "Not in favorites" };
    }

    await ctx.db.delete(favorite._id);
    return { success: true, message: "Removed from favorites" };
  },
});

/**
 * GET user favorites
 */
export const getUserFavorites = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const favorites = await ctx.db
      .query("favorites")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    // Get full restaurant data for each favorite
    const restaurants = await Promise.all(
      favorites.map(async (fav) => {
        const restaurant = await ctx.db.get(fav.restaurantId);
        return restaurant;
      })
    );

    return restaurants.filter((r) => r !== null);
  },
});

/**
 * CHECK if restaurant is favorited
 */
export const isFavorited = query({
  args: {
    userId: v.id("users"),
    restaurantId: v.id("restaurants"),
  },
  handler: async (ctx, args) => {
    const favorite = await ctx.db
      .query("favorites")
      .withIndex("by_user_restaurant", (q) =>
        q.eq("userId", args.userId).eq("restaurantId", args.restaurantId)
      )
      .first();

    return !!favorite;
  },
});
