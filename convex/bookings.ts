import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

/**
 * CREATE booking
 */
export const createBooking = mutation({
  args: {
    userId: v.id("users"),
    restaurantId: v.id("restaurants"),
    date: v.string(),
    time: v.string(),
    partySize: v.number(),
    specialRequests: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if restaurant exists
    const restaurant = await ctx.db.get(args.restaurantId);
    if (!restaurant) {
      throw new Error("Restaurant not found");
    }

    // Create booking
    const bookingId = await ctx.db.insert("bookings", {
      userId: args.userId,
      restaurantId: args.restaurantId,
      date: args.date,
      time: args.time,
      partySize: args.partySize,
      specialRequests: args.specialRequests,
      status: "pending",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return {
      success: true,
      bookingId,
      message: "Booking created successfully",
    };
  },
});

/**
 * GET user bookings
 */
export const getUserBookings = query({
  args: {
    userId: v.id("users"),
    status: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let bookingsQuery = ctx.db
      .query("bookings")
      .withIndex("by_user", (q) => q.eq("userId", args.userId));

    const bookings = await bookingsQuery.collect();

    // Filter by status if provided
    const filteredBookings = args.status
      ? bookings.filter((b) => b.status === args.status)
      : bookings;

    // Get restaurant data for each booking
    const bookingsWithRestaurants = await Promise.all(
      filteredBookings.map(async (booking) => {
        const restaurant = await ctx.db.get(booking.restaurantId);
        return {
          ...booking,
          restaurant: restaurant
            ? {
                name: restaurant.name,
                area: restaurant.area,
                imageUrl: restaurant.imageUrl,
                address: restaurant.address,
              }
            : null,
        };
      })
    );

    // Sort by date (most recent first)
    bookingsWithRestaurants.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return bookingsWithRestaurants;
  },
});

/**
 * GET single booking
 */
export const getBooking = query({
  args: {
    bookingId: v.id("bookings"),
  },
  handler: async (ctx, args) => {
    const booking = await ctx.db.get(args.bookingId);
    if (!booking) return null;

    const restaurant = await ctx.db.get(booking.restaurantId);
    const user = await ctx.db.get(booking.userId);

    return {
      ...booking,
      restaurant,
      user: user
        ? {
            name: user.name,
            email: user.email,
          }
        : null,
    };
  },
});

/**
 * UPDATE booking status
 */
export const updateBookingStatus = mutation({
  args: {
    bookingId: v.id("bookings"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    const booking = await ctx.db.get(args.bookingId);
    if (!booking) {
      throw new Error("Booking not found");
    }

    await ctx.db.patch(args.bookingId, {
      status: args.status,
      updatedAt: Date.now(),
    });

    return {
      success: true,
      message: `Booking ${args.status}`,
    };
  },
});

/**
 * CANCEL booking
 */
export const cancelBooking = mutation({
  args: {
    bookingId: v.id("bookings"),
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const booking = await ctx.db.get(args.bookingId);

    if (!booking) {
      throw new Error("Booking not found");
    }

    // Verify the booking belongs to the user
    if (booking.userId !== args.userId) {
      throw new Error("Unauthorized");
    }

    await ctx.db.patch(args.bookingId, {
      status: "cancelled",
      updatedAt: Date.now(),
    });

    return {
      success: true,
      message: "Booking cancelled",
    };
  },
});

/**
 * GET upcoming bookings for a restaurant (for availability checking)
 */
export const getRestaurantBookings = query({
  args: {
    restaurantId: v.id("restaurants"),
    date: v.string(),
  },
  handler: async (ctx, args) => {
    const bookings = await ctx.db
      .query("bookings")
      .withIndex("by_date", (q) =>
        q.eq("restaurantId", args.restaurantId).eq("date", args.date)
      )
      .filter((q) => q.neq(q.field("status"), "cancelled"))
      .collect();

    return bookings;
  },
});
