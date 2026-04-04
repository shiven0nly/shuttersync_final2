import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

// Submit workshop assignment
export const submitAssignment = mutation({
  args: {
    userId: v.string(),
    registrationId: v.id("workshop_registrations"),
    workshopId: v.number(),
    fullName: v.string(),
    email: v.string(),
    driveLink: v.string(),
    videoCompleted: v.boolean(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity || identity.subject !== args.userId) {
      throw new Error("Unauthorized");
    }

    // Check if already submitted
    const existing = await ctx.db
      .query("workshop_submissions")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .filter((q) => q.eq(q.field("workshopId"), args.workshopId))
      .first();

    if (existing) {
      // Update existing submission
      await ctx.db.patch(existing._id, {
        driveLink: args.driveLink,
        videoCompleted: args.videoCompleted,
        submittedAt: Date.now(),
      });
      return existing._id;
    }

    // Create new submission
    const submissionId = await ctx.db.insert("workshop_submissions", {
      userId: args.userId,
      registrationId: args.registrationId,
      workshopId: args.workshopId,
      fullName: args.fullName,
      email: args.email,
      driveLink: args.driveLink,
      videoCompleted: args.videoCompleted,
      status: "pending",
      submittedAt: Date.now(),
      certificateIssued: false,
    });

    return submissionId;
  },
});

// Get user's submission
export const getUserSubmission = query({
  args: {
    userId: v.string(),
    workshopId: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity || identity.subject !== args.userId) {
      throw new Error("Unauthorized");
    }

    const submission = await ctx.db
      .query("workshop_submissions")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .filter((q) => q.eq(q.field("workshopId"), args.workshopId))
      .first();

    return submission;
  },
});

// Get all submissions (admin only)
export const getAllSubmissions = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity || (identity as any).metadata?.role !== "admin") {
      throw new Error("Unauthorized: Admin access required");
    }

    const submissions = await ctx.db
      .query("workshop_submissions")
      .order("desc")
      .take(100);

    return submissions;
  },
});

// Approve submission and generate certificate
export const approveSubmission = mutation({
  args: {
    submissionId: v.id("workshop_submissions"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity || (identity as any).metadata?.role !== "admin") {
      throw new Error("Unauthorized: Admin access required");
    }

    const submission = await ctx.db.get(args.submissionId);
    if (!submission) throw new Error("Submission not found");

    // Generate unique certificate ID
    const certificateId = `SS-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Create certificate record
    await ctx.db.insert("certificates", {
      certificateId,
      userId: submission.userId,
      fullName: submission.fullName,
      workshopTitle: "Color Grading Workshop",
      workshopId: submission.workshopId,
      issueDate: Date.now(),
      submissionId: args.submissionId,
    });

    // Update submission
    await ctx.db.patch(args.submissionId, {
      status: "approved",
      reviewedBy: identity.email ?? "admin",
      reviewedAt: Date.now(),
      certificateIssued: true,
      certificateId,
    });

    return { success: true, certificateId };
  },
});

// Reject submission
export const rejectSubmission = mutation({
  args: {
    submissionId: v.id("workshop_submissions"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity || (identity as any).metadata?.role !== "admin") {
      throw new Error("Unauthorized: Admin access required");
    }

    await ctx.db.patch(args.submissionId, {
      status: "rejected",
      reviewedBy: identity.email ?? "admin",
      reviewedAt: Date.now(),
    });

    return { success: true };
  },
});
