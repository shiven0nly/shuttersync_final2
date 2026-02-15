import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const register = mutation({
  args: {
    userId: v.string(),
    fullName: v.string(),
    email: v.string(),
    phoneNumber: v.string(),
    competitionId: v.number(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("competition_registrations")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .filter((q) => q.eq(q.field("competitionId"), args.competitionId))
      .first();

    if (existing) {
      throw new Error("Already registered for this competition");
    }

    return await ctx.db.insert("competition_registrations", {
      userId: args.userId,
      fullName: args.fullName,
      email: args.email,
      phoneNumber: args.phoneNumber,
      competitionId: args.competitionId,
      status: "active",
    });
  },
});

export const getUserRegistration = query({
  args: {
    userId: v.string(),
    competitionId: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("competition_registrations")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .filter((q) => q.eq(q.field("competitionId"), args.competitionId))
      .first();
  },
});

export const getAllRegistrations = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("competition_registrations")
      .order("desc")
      .collect();
  },
});

export const cancelRegistration = mutation({
  args: {
    registrationId: v.id("competition_registrations"),
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

export const reactivateRegistration = mutation({
  args: {
    registrationId: v.id("competition_registrations"),
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
