import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createUser = mutation({
  args: {
    userId: v.string(),
    email: v.string(),
    fullName: v.optional(v.string()),
    referredByCode: v.optional(v.string()), // The referral code from the URL
  },
  handler: async (ctx, args) => {
    // Check if user already exists
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .first();

    if (existingUser) {
      return existingUser;
    }

    // Generate a unique referral code
    const generatedCode = args.fullName 
      ? args.fullName.replace(/\s+/g, '').slice(0, 5).toUpperCase() + Math.floor(1000 + Math.random() * 9000)
      : 'USER' + Math.floor(10000 + Math.random() * 90000);

    // Initial user data
    const userData = {
      userId: args.userId,
      email: args.email,
      fullName: args.fullName,
      referralCode: generatedCode,
      referredBy: undefined as string | undefined,
      totalTokens: 0,
      createdAt: Date.now(),
    };

    // If there is a referral code, process it
    if (args.referredByCode && args.referredByCode !== generatedCode) {
      const code = args.referredByCode;
      const referrer = await ctx.db
        .query("users")
        .withIndex("by_referral_code", (q) => q.eq("referralCode", code))
        .first();

      if (referrer && referrer.userId !== args.userId) {
        // Award tokens to referrer
        await ctx.db.patch(referrer._id, {
          totalTokens: referrer.totalTokens + 50
        });

        // Record token transaction
        await ctx.db.insert("tokens", {
          userId: referrer.userId,
          amount: 50,
          reason: "referral",
          referredUserEmail: args.email,
          createdAt: Date.now(),
        });

        userData.referredBy = args.referredByCode;
      }
    }

    const newUserId = await ctx.db.insert("users", userData);
    return await ctx.db.get(newUserId);
  },
});

export const getUser = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .first();
  },
});
