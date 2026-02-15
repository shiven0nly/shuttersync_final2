import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const register = mutation({
  args: {
    userId: v.string(),
    fullName: v.string(),
    email: v.string(),
    phoneNumber: v.string(),
    courseId: v.number(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("course_registrations")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .filter((q) => q.eq(q.field("courseId"), args.courseId))
      .first();

    if (existing) {
      throw new Error("Already registered for this course");
    }

    return await ctx.db.insert("course_registrations", {
      userId: args.userId,
      fullName: args.fullName,
      email: args.email,
      phoneNumber: args.phoneNumber,
      courseId: args.courseId,
      status: "active",
    });
  },
});

export const getUserRegistration = query({
  args: {
    userId: v.string(),
    courseId: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("course_registrations")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .filter((q) => q.eq(q.field("courseId"), args.courseId))
      .first();
  },
});

export const getAllRegistrations = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("course_registrations")
      .order("desc")
      .collect();
  },
});

export const cancelRegistration = mutation({
  args: {
    registrationId: v.id("course_registrations"),
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
    registrationId: v.id("course_registrations"),
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
