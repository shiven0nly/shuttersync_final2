import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const register = mutation({
  args: {
    userId: v.string(),
    fullName: v.string(),
    email: v.string(),
    phoneNumber: v.string(),
    photowalkId: v.number(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("photowalk_registrations")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .filter((q) => q.eq(q.field("photowalkId"), args.photowalkId))
      .first();

    if (existing) {
      throw new Error("Already registered for this photowalk");
    }

    return await ctx.db.insert("photowalk_registrations", {
      userId: args.userId,
      fullName: args.fullName,
      email: args.email,
      phoneNumber: args.phoneNumber,
      photowalkId: args.photowalkId,
      status: "active",
    });
  },
});

export const getUserRegistration = query({
  args: {
    userId: v.string(), // Kept in args for backwards-compatibility
    photowalkId: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    return await ctx.db
      .query("photowalk_registrations")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .filter((q) => q.eq(q.field("photowalkId"), args.photowalkId))
      .first();
  },
});

export const getAllRegistrations = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity || (identity as any).metadata?.role !== "admin") {
      throw new Error("Unauthorized: Admin access required");
    }

    return await ctx.db
      .query("photowalk_registrations")
      .order("desc")
      .take(100);
  },
});

export const cancelRegistration = mutation({
  args: {
    registrationId: v.id("photowalk_registrations"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity || (identity as any).metadata?.role !== "admin") {
      throw new Error("Unauthorized: Admin access required");
    }

    await ctx.db.patch(args.registrationId, {
      status: "cancelled",
      cancelledBy: identity.email ?? "admin",
      cancelledAt: Date.now(),
    });
    return { success: true };
  },
});

export const reactivateRegistration = mutation({
  args: {
    registrationId: v.id("photowalk_registrations"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity || (identity as any).metadata?.role !== "admin") {
      throw new Error("Unauthorized: Admin access required");
    }

    await ctx.db.patch(args.registrationId, {
      status: "active",
      cancelledBy: undefined,
      cancelledAt: undefined,
    });
    return { success: true };
  },
});
