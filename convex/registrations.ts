import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Register for workshop
export const register = mutation({
  args: {
    userId: v.string(),
    fullName: v.string(),
    email: v.string(),
    phoneNumber: v.string(),
    workshopId: v.number(),
    nextWorkshopInterest: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if already registered
    const existing = await ctx.db
      .query("workshop_registrations")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .filter((q) => q.eq(q.field("workshopId"), args.workshopId))
      .first();

    if (existing) {
      throw new Error("Already registered for this workshop");
    }

    const registrationId = await ctx.db.insert("workshop_registrations", {
      userId: args.userId,
      fullName: args.fullName,
      email: args.email,
      phoneNumber: args.phoneNumber,
      workshopId: args.workshopId,
      nextWorkshopInterest: args.nextWorkshopInterest,
      status: "active",
    });

    return registrationId;
  },
});

// Get user's registration
export const getUserRegistration = query({
  args: {
    userId: v.string(),
    workshopId: v.number(),
  },
  handler: async (ctx, args) => {
    const registration = await ctx.db
      .query("workshop_registrations")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .filter((q) => q.eq(q.field("workshopId"), args.workshopId))
      .first();

    return registration;
  },
});

// Get all registrations (admin only)
export const getAllRegistrations = query({
  handler: async (ctx) => {
    const registrations = await ctx.db
      .query("workshop_registrations")
      .order("desc")
      .collect();

    return registrations;
  },
});

// Cancel registration (admin only)
export const cancelRegistration = mutation({
  args: {
    registrationId: v.id("workshop_registrations"),
    adminEmail: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.registrationId, {
      status: "cancelled",
      cancelledBy: args.adminEmail,
      cancelledAt: Date.now(),
    });

    return { success: true };
  },
});

// Reactivate registration (admin only)
export const reactivateRegistration = mutation({
  args: {
    registrationId: v.id("workshop_registrations"),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.registrationId, {
      status: "active",
      cancelledBy: undefined,
      cancelledAt: undefined,
    });

    return { success: true };
  },
});
