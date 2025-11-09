import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Users table (synced with Better Auth)
  users: defineTable({
    email: v.string(),
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    authId: v.string(), // Better Auth user ID
    preferences: v.optional(
      v.object({
        favoriteAreas: v.array(v.string()),
        cuisinePreferences: v.array(v.string()),
        dietaryRestrictions: v.array(v.string()),
      })
    ),
    createdAt: v.number(),
  })
    .index("by_auth_id", ["authId"])
    .index("by_email", ["email"]),

  // Restaurants table
  restaurants: defineTable({
    name: v.string(),
    area: v.string(),
    cuisine: v.string(),
    priceRange: v.number(), // 1-3 ($, $$, $$$)
    rating: v.number(), // 1-5 overall rating
    imageUrl: v.string(),
    description: v.string(),
    address: v.string(),
    dateScore: v.number(), // 1-5 date-specific rating
    crowdedness: v.object({
      morning: v.number(), // 1-5
      afternoon: v.number(), // 1-5
      evening: v.number(), // 1-5
    }),
    foodQuality: v.number(), // 1-5
    ambience: v.number(), // 1-5
    noiseLevel: v.number(), // 1-5
    bestTimeToVisit: v.string(),
    mustTryDishes: v.array(v.string()),
    isVerified: v.boolean(),
    totalReviews: v.number(),
    averageRating: v.number(),
    tags: v.optional(v.array(v.string())), // ["romantic", "rooftop", "pet-friendly"]
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_area", ["area"])
    .index("by_cuisine", ["cuisine"])
    .index("by_date_score", ["dateScore"])
    .index("by_rating", ["rating"])
    .searchIndex("search_name", {
      searchField: "name",
      filterFields: ["area", "cuisine", "isVerified"],
    }),

  // User favorites
  favorites: defineTable({
    userId: v.id("users"),
    restaurantId: v.id("restaurants"),
    addedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_restaurant", ["restaurantId"])
    .index("by_user_restaurant", ["userId", "restaurantId"]),

  // Reviews
  reviews: defineTable({
    userId: v.id("users"),
    restaurantId: v.id("restaurants"),
    rating: v.number(), // 1-5
    dateScore: v.number(), // 1-5 how good was it for a date
    comment: v.string(),
    visitDate: v.optional(v.string()),
    occasionType: v.optional(v.string()), // "first-date", "anniversary", "casual"
    crowdLevel: v.optional(v.string()), // "quiet", "moderate", "lively"
    helpfulCount: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_restaurant", ["restaurantId"])
    .index("by_user", ["userId"])
    .index("by_rating", ["restaurantId", "rating"])
    .index("by_created", ["createdAt"]),

  // Bookings/Reservations
  bookings: defineTable({
    userId: v.id("users"),
    restaurantId: v.id("restaurants"),
    date: v.string(), // ISO date string
    time: v.string(),
    partySize: v.number(),
    specialRequests: v.optional(v.string()),
    status: v.string(), // "pending", "confirmed", "cancelled", "completed"
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_restaurant", ["restaurantId"])
    .index("by_date", ["restaurantId", "date"])
    .index("by_status", ["userId", "status"])
    .index("by_user_date", ["userId", "date"]),

  // Date Plans (users can save date itineraries)
  datePlans: defineTable({
    userId: v.id("users"),
    title: v.string(),
    description: v.optional(v.string()),
    date: v.string(),
    restaurants: v.array(v.id("restaurants")),
    notes: v.optional(v.string()),
    isPublic: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_date", ["date"])
    .index("by_public", ["isPublic"]),
});
