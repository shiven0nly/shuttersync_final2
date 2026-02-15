import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  workshop_registrations: defineTable({
    userId: v.string(), // Clerk user ID
    fullName: v.string(),
    email: v.string(),
    phoneNumber: v.string(),
    workshopId: v.number(),
    status: v.string(), // "active" or "cancelled"
    cancelledBy: v.optional(v.string()), // admin email who cancelled
    cancelledAt: v.optional(v.number()), // timestamp
  })
    .index("by_user", ["userId"])
    .index("by_email", ["email"])
    .index("by_status", ["status"])
    .index("by_workshop", ["workshopId"]),
});
