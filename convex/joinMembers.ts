import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Submit a join member application
export const submitApplication = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    portfolio: v.optional(v.string()),
    experience: v.string(),
    message: v.optional(v.string()),
    photoUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if email already exists with pending or approved status
    const allApplications = await ctx.db
      .query("join_members")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .take(100);

    const existing = allApplications.find(
      (app) => app.status === "pending" || app.status === "approved"
    );

    if (existing) {
      throw new Error("An application with this email already exists.");
    }

    const applicationId = await ctx.db.insert("join_members", {
      name: args.name,
      email: args.email,
      portfolio: args.portfolio,
      experience: args.experience,
      message: args.message,
      photoUrl: args.photoUrl,
      status: "pending",
      submittedAt: Date.now(),
    });

    return applicationId;
  },
});

// Get all join member applications (for admin)
export const getAllApplications = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity || (identity as any).metadata?.role !== "admin") {
      throw new Error("Unauthorized: Admin access required");
    }

    const applications = await ctx.db
      .query("join_members")
      .withIndex("by_submitted_at")
      .order("desc")
      .take(100);
    return applications;
  },
});

// Get applications by status
export const getApplicationsByStatus = query({
  args: { status: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity || (identity as any).metadata?.role !== "admin") {
      throw new Error("Unauthorized: Admin access required");
    }

    const applications = await ctx.db
      .query("join_members")
      .withIndex("by_status", (q) => q.eq("status", args.status))
      .take(100);
    return applications;
  },
});

// Approve an application
export const approveApplication = mutation({
  args: {
    applicationId: v.id("join_members"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity || (identity as any).metadata?.role !== "admin") {
      throw new Error("Unauthorized: Admin access required");
    }

    await ctx.db.patch(args.applicationId, {
      status: "approved",
      reviewedBy: identity.email ?? "admin",
      reviewedAt: Date.now(),
    });
  },
});

// Reject an application
export const rejectApplication = mutation({
  args: {
    applicationId: v.id("join_members"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity || (identity as any).metadata?.role !== "admin") {
      throw new Error("Unauthorized: Admin access required");
    }

    await ctx.db.patch(args.applicationId, {
      status: "rejected",
      reviewedBy: identity.email ?? "admin",
      reviewedAt: Date.now(),
    });
  },
});

// Delete an application
export const deleteApplication = mutation({
  args: {
    applicationId: v.id("join_members"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity || (identity as any).metadata?.role !== "admin") {
      throw new Error("Unauthorized: Admin access required");
    }

    await ctx.db.delete(args.applicationId);
  },
});
