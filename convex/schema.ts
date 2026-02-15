import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  workshop_registrations: defineTable({
    userId: v.string(), // Clerk user ID
    fullName: v.string(),
    email: v.string(),
    phoneNumber: v.string(),
    workshopId: v.number(),
    nextWorkshopInterest: v.optional(v.string()), // What workshop they want next
    status: v.string(), // "active" or "cancelled"
    cancelledBy: v.optional(v.string()), // admin email who cancelled
    cancelledAt: v.optional(v.number()), // timestamp
  })
    .index("by_user", ["userId"])
    .index("by_email", ["email"])
    .index("by_status", ["status"])
    .index("by_workshop", ["workshopId"]),

  photowalk_registrations: defineTable({
    userId: v.string(),
    fullName: v.string(),
    email: v.string(),
    phoneNumber: v.string(),
    photowalkId: v.number(),
    status: v.string(), // "active" or "cancelled"
    cancelledBy: v.optional(v.string()),
    cancelledAt: v.optional(v.number()),
  })
    .index("by_user", ["userId"])
    .index("by_email", ["email"])
    .index("by_status", ["status"])
    .index("by_photowalk", ["photowalkId"]),

  course_registrations: defineTable({
    userId: v.string(),
    fullName: v.string(),
    email: v.string(),
    phoneNumber: v.string(),
    courseId: v.number(),
    status: v.string(), // "active" or "cancelled"
    cancelledBy: v.optional(v.string()),
    cancelledAt: v.optional(v.number()),
  })
    .index("by_user", ["userId"])
    .index("by_email", ["email"])
    .index("by_status", ["status"])
    .index("by_course", ["courseId"]),

  competition_registrations: defineTable({
    userId: v.string(),
    fullName: v.string(),
    email: v.string(),
    phoneNumber: v.string(),
    competitionId: v.number(),
    status: v.string(), // "active" or "cancelled"
    cancelledBy: v.optional(v.string()),
    cancelledAt: v.optional(v.number()),
  })
    .index("by_user", ["userId"])
    .index("by_email", ["email"])
    .index("by_status", ["status"])
    .index("by_competition", ["competitionId"]),
});
