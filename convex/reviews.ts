import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

/**
 * CREATE review
 */
export const createReview = mutation({
  args: {
    userId: v.id("users"),
    restaurantId: v.id("restaurants"),
    rating: v.number(),
    dateScore: v.number(),
    comment: v.string(),
    visitDate: v.optional(v.string()),
    occasionType: v.optional(v.string()),
    crowdLevel: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Verify restaurant exists
    const restaurant = await ctx.db.get(args.restaurantId);
    if (!restaurant) {
      throw new Error("Restaurant not found");
    }

    // Create review
    const reviewId = await ctx.db.insert("reviews", {
      userId: args.userId,
      restaurantId: args.restaurantId,
      rating: args.rating,
      dateScore: args.dateScore,
      comment: args.comment,
      visitDate: args.visitDate,
      occasionType: args.occasionType,
      crowdLevel: args.crowdLevel,
      helpfulCount: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    // Update restaurant's average rating and review count
    const allReviews = await ctx.db
      .query("reviews")
      .withIndex("by_restaurant", (q) => q.eq("restaurantId", args.restaurantId))
      .collect();

    const totalRating = allReviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / allReviews.length;

    await ctx.db.patch(args.restaurantId, {
      averageRating: Math.round(averageRating * 10) / 10, // Round to 1 decimal
      totalReviews: allReviews.length,
      updatedAt: Date.now(),
    });

    return {
      success: true,
      reviewId,
      message: "Review created successfully",
    };
  },
});

/**
 * GET restaurant reviews
 */
export const getRestaurantReviews = query({
  args: {
    restaurantId: v.id("restaurants"),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit || 20;

    const reviews = await ctx.db
      .query("reviews")
      .withIndex("by_restaurant", (q) => q.eq("restaurantId", args.restaurantId))
      .order("desc")
      .take(limit);

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

    return reviewsWithUsers;
  },
});

/**
 * GET user reviews
 */
export const getUserReviews = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const reviews = await ctx.db
      .query("reviews")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();

    // Get restaurant data for each review
    const reviewsWithRestaurants = await Promise.all(
      reviews.map(async (review) => {
        const restaurant = await ctx.db.get(review.restaurantId);
        return {
          ...review,
          restaurant: restaurant
            ? {
                name: restaurant.name,
                area: restaurant.area,
                imageUrl: restaurant.imageUrl,
              }
            : null,
        };
      })
    );

    return reviewsWithRestaurants;
  },
});

/**
 * UPDATE review
 */
export const updateReview = mutation({
  args: {
    reviewId: v.id("reviews"),
    userId: v.id("users"),
    rating: v.optional(v.number()),
    dateScore: v.optional(v.number()),
    comment: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const review = await ctx.db.get(args.reviewId);

    if (!review) {
      throw new Error("Review not found");
    }

    // Verify the review belongs to the user
    if (review.userId !== args.userId) {
      throw new Error("Unauthorized");
    }

    const updates: any = { updatedAt: Date.now() };
    if (args.rating !== undefined) updates.rating = args.rating;
    if (args.dateScore !== undefined) updates.dateScore = args.dateScore;
    if (args.comment !== undefined) updates.comment = args.comment;

    await ctx.db.patch(args.reviewId, updates);

    // Recalculate restaurant average rating if rating was updated
    if (args.rating !== undefined) {
      const allReviews = await ctx.db
        .query("reviews")
        .withIndex("by_restaurant", (q) => q.eq("restaurantId", review.restaurantId))
        .collect();

      const totalRating = allReviews.reduce((sum, r) => sum + r.rating, 0);
      const averageRating = totalRating / allReviews.length;

      await ctx.db.patch(review.restaurantId, {
        averageRating: Math.round(averageRating * 10) / 10,
        updatedAt: Date.now(),
      });
    }

    return {
      success: true,
      message: "Review updated successfully",
    };
  },
});

/**
 * DELETE review
 */
export const deleteReview = mutation({
  args: {
    reviewId: v.id("reviews"),
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const review = await ctx.db.get(args.reviewId);

    if (!review) {
      throw new Error("Review not found");
    }

    // Verify the review belongs to the user
    if (review.userId !== args.userId) {
      throw new Error("Unauthorized");
    }

    const restaurantId = review.restaurantId;
    await ctx.db.delete(args.reviewId);

    // Recalculate restaurant average rating and count
    const allReviews = await ctx.db
      .query("reviews")
      .withIndex("by_restaurant", (q) => q.eq("restaurantId", restaurantId))
      .collect();

    const averageRating =
      allReviews.length > 0
        ? allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length
        : 0;

    await ctx.db.patch(restaurantId, {
      averageRating: Math.round(averageRating * 10) / 10,
      totalReviews: allReviews.length,
      updatedAt: Date.now(),
    });

    return {
      success: true,
      message: "Review deleted successfully",
    };
  },
});

/**
 * INCREMENT helpful count
 */
export const markHelpful = mutation({
  args: {
    reviewId: v.id("reviews"),
  },
  handler: async (ctx, args) => {
    const review = await ctx.db.get(args.reviewId);

    if (!review) {
      throw new Error("Review not found");
    }

    await ctx.db.patch(args.reviewId, {
      helpfulCount: review.helpfulCount + 1,
    });

    return { success: true };
  },
});
