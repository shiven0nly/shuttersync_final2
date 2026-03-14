import { query } from "./_generated/server";

// Debug: inspect what Convex sees in the authenticated identity
export const getIdentity = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;
    return {
      subject: identity.subject,
      email: identity.email,
      name: identity.name,
      metadata: (identity as any).metadata ?? "NOT_PRESENT",
    };
  },
});
