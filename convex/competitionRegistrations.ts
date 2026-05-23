import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Register a user for the photography competition
export const register = mutation({
  args: {
    fullName: v.string(),
    email: v.string(),
    phoneNumber: v.string(),
    expectedSubmissions: v.number(),
    agreedToTerms: v.boolean(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized: You must be logged in to register.");
    }

    const userId = identity.subject;

    // Check if user already registered in the 'registrations' table
    const existing = await ctx.db
      .query("registrations")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();

    if (existing) {
      throw new Error("You have already registered for this competition.");
    }

    // Calculate total fees: ₹19 per photo
    const totalFeesPaid = args.expectedSubmissions * 19;

    const registrationId = await ctx.db.insert("registrations", {
      userId,
      fullName: args.fullName,
      email: args.email,
      phoneNumber: args.phoneNumber,
      expectedSubmissions: args.expectedSubmissions,
      totalFeesPaid,
      paymentStatus: "pending",
      agreedToTerms: args.agreedToTerms,
      registeredAt: Date.now(),
    });

    return registrationId;
  },
});

// Get registration of the currently logged-in user
export const getMyRegistration = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    return await ctx.db
      .query("registrations")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .first();
  },
});

// Get all registrations for admin dashboard
export const getAllRegistrations = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity || (identity as any).metadata?.role !== "admin") {
      throw new Error("Unauthorized: Admin access required");
    }

    return await ctx.db
      .query("registrations")
      .order("desc")
      .take(100);
  },
});

export const submitCompetition = mutation({
  args: {
    registrationId: v.id("registrations"),
    fullName: v.string(),
    email: v.string(),
    upiTransactionId: v.string(),
    driveLinks: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized: You must be logged in to submit.");
    }

    const userId = identity.subject;

    // Verify registration belongs to user
    const registration = await ctx.db.get(args.registrationId);
    if (!registration || registration.userId !== userId) {
      throw new Error("Invalid registration.");
    }

    // Check if submission already exists
    const existing = await ctx.db
      .query("competition_submissions")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();

    if (existing) {
      // Append new links and upi ID
      await ctx.db.patch(existing._id, {
        driveLinks: [...existing.driveLinks, ...args.driveLinks],
        upiTransactionId: existing.upiTransactionId + ", " + args.upiTransactionId,
      });
      return existing._id;
    }

    const submissionId = await ctx.db.insert("competition_submissions", {
      userId,
      registrationId: args.registrationId,
      fullName: args.fullName,
      email: args.email,
      upiTransactionId: args.upiTransactionId,
      driveLinks: args.driveLinks,
      status: "pending",
      submittedAt: Date.now(),
    });

    // Mark registration as completed payment status
    await ctx.db.patch(args.registrationId, { paymentStatus: "completed" });

    return submissionId;
  },
});

// Get submission of the currently logged-in user
export const getMySubmission = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    return await ctx.db
      .query("competition_submissions")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .first();
  },
});

// Get all submissions for admin dashboard
export const getAllSubmissions = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity || (identity as any).metadata?.role !== "admin") {
      throw new Error("Unauthorized: Admin access required");
    }

    return await ctx.db
      .query("competition_submissions")
      .order("desc")
      .take(100);
  },
});
