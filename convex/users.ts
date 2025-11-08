import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

/**
 * CREATE or UPDATE user (called after Better Auth authentication)
 */
export const createOrUpdateUser = mutation({
  args: {
    authId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    image: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if user already exists
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_auth_id", (q) => q.eq("authId", args.authId))
      .first();

    if (existingUser) {
      // Update existing user
      await ctx.db.patch(existingUser._id, {
        name: args.name,
        image: args.image,
      });
      return { userId: existingUser._id, isNew: false };
    }

    // Create new user
    const userId = await ctx.db.insert("users", {
      authId: args.authId,
      email: args.email,
      name: args.name,
      image: args.image,
      preferences: {
        favoriteAreas: [],
        cuisinePreferences: [],
        dietaryRestrictions: [],
      },
      createdAt: Date.now(),
    });

    return { userId, isNew: true };
  },
});

/**
 * GET user by auth ID
 */
export const getUserByAuthId = query({
  args: {
    authId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_auth_id", (q) => q.eq("authId", args.authId))
      .first();

    return user;
  },
});

/**
 * GET user by ID
 */
export const getUser = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.userId);
  },
});

/**
 * UPDATE user preferences
 */
export const updatePreferences = mutation({
  args: {
    userId: v.id("users"),
    preferences: v.object({
      favoriteAreas: v.array(v.string()),
      cuisinePreferences: v.array(v.string()),
      dietaryRestrictions: v.array(v.string()),
    }),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.userId, {
      preferences: args.preferences,
    });

    return { success: true, message: "Preferences updated" };
  },
});

/**
 * UPDATE user profile
 */
export const updateProfile = mutation({
  args: {
    userId: v.id("users"),
    name: v.optional(v.string()),
    image: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const updates: any = {};
    if (args.name !== undefined) updates.name = args.name;
    if (args.image !== undefined) updates.image = args.image;

    await ctx.db.patch(args.userId, updates);

    return { success: true, message: "Profile updated" };
  },
});
