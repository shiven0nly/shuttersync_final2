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
    const identity = await ctx.auth.getUserIdentity();
    if (!identity || identity.subject !== args.userId) {
      throw new Error("Unauthorized to create user profile");
    }

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
        // Award 50 tokens to referrer
        await ctx.db.patch(referrer._id, {
          totalTokens: referrer.totalTokens + 50
        });

        // Record token transaction for referrer
        await ctx.db.insert("tokens", {
          userId: referrer.userId,
          amount: 50,
          reason: "referral",
          referredUserEmail: args.email,
          createdAt: Date.now(),
        });

        // Award 20 tokens to new user
        userData.totalTokens = 20;

        // Record token transaction for new user (will happens after insert)
        userData.referredBy = args.referredByCode;
      }
    }

    const newUserId = await ctx.db.insert("users", userData);

    // Record the 20 token bonus for the new user if they were referred
    if (userData.totalTokens === 20) {
      await ctx.db.insert("tokens", {
        userId: args.userId,
        amount: 20,
        reason: "referral_bonus",
        createdAt: Date.now(),
      });
    }

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
