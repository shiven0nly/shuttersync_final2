import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Submit a new collaboration inquiry
export const submitInquiry = mutation({
  args: {
    organizationType: v.string(),
    organizationName: v.string(),
    contactPersonName: v.string(),
    email: v.string(),
    phoneNumber: v.string(),
    website: v.optional(v.string()),
    collaborationType: v.string(),
    projectDetails: v.string(),
    budget: v.optional(v.string()),
    timeline: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const inquiryId = await ctx.db.insert("collaboration_inquiries", {
      ...args,
      status: "pending",
      submittedAt: Date.now(),
    });
    return inquiryId;
  },
});

// Get all collaboration inquiries (admin only)
export const getAllInquiries = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity || (identity as any).metadata?.role !== "admin") {
      throw new Error("Unauthorized: Admin access required");
    }

    const inquiries = await ctx.db
      .query("collaboration_inquiries")
      .order("desc")
      .take(100);
    return inquiries;
  },
});

// Update inquiry status
export const updateInquiryStatus = mutation({
  args: {
    inquiryId: v.id("collaboration_inquiries"),
    status: v.string(),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity || (identity as any).metadata?.role !== "admin") {
      throw new Error("Unauthorized: Admin access required");
    }

    await ctx.db.patch(args.inquiryId, {
      status: args.status,
      reviewedBy: identity.email ?? "admin",
      reviewedAt: Date.now(),
      notes: args.notes,
    });
  },
});

// Delete inquiry
export const deleteInquiry = mutation({
  args: {
    inquiryId: v.id("collaboration_inquiries"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity || (identity as any).metadata?.role !== "admin") {
      throw new Error("Unauthorized: Admin access required");
    }
    await ctx.db.delete(args.inquiryId);
  },
});
