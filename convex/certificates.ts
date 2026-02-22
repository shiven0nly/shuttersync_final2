import { v } from "convex/values";
import { query } from "./_generated/server";

// Get certificate by ID (public)
export const getCertificateById = query({
  args: {
    certificateId: v.string(),
  },
  handler: async (ctx, args) => {
    const certificate = await ctx.db
      .query("certificates")
      .withIndex("by_certificate_id", (q) => q.eq("certificateId", args.certificateId))
      .first();

    return certificate;
  },
});

// Get user's certificates
export const getUserCertificates = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const certificates = await ctx.db
      .query("certificates")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    return certificates;
  },
});
