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

  join_members: defineTable({
    name: v.string(),
    email: v.string(),
    portfolio: v.optional(v.string()),
    experience: v.string(), // "beginner", "intermediate", "advanced", "professional"
    message: v.optional(v.string()),
    photoUrl: v.optional(v.string()),
    status: v.string(), // "pending", "approved", "rejected"
    reviewedBy: v.optional(v.string()), // admin email who reviewed
    reviewedAt: v.optional(v.number()), // timestamp
    submittedAt: v.number(), // timestamp
  })
    .index("by_email", ["email"])
    .index("by_status", ["status"])
    .index("by_submitted_at", ["submittedAt"]),

  workshop_submissions: defineTable({
    userId: v.string(),
    registrationId: v.id("workshop_registrations"),
    workshopId: v.number(),
    fullName: v.string(),
    email: v.string(),
    driveLink: v.string(),
    videoCompleted: v.boolean(),
    status: v.string(), // "pending", "approved", "rejected"
    reviewedBy: v.optional(v.string()),
    reviewedAt: v.optional(v.number()),
    submittedAt: v.number(),
    certificateIssued: v.boolean(),
    certificateId: v.optional(v.string()),
  })
    .index("by_user", ["userId"])
    .index("by_registration", ["registrationId"])
    .index("by_status", ["status"])
    .index("by_workshop", ["workshopId"]),

  certificates: defineTable({
    certificateId: v.string(),
    userId: v.string(),
    fullName: v.string(),
    workshopTitle: v.string(),
    workshopId: v.number(),
    issueDate: v.number(),
    submissionId: v.id("workshop_submissions"),
  })
    .index("by_certificate_id", ["certificateId"])
    .index("by_user", ["userId"]),

  collaboration_inquiries: defineTable({
    organizationType: v.string(), // "company", "organization", "professional"
    organizationName: v.string(),
    contactPersonName: v.string(),
    email: v.string(),
    phoneNumber: v.string(),
    website: v.optional(v.string()),
    collaborationType: v.string(), // "workshop", "event", "partnership", "sponsorship", "other"
    projectDetails: v.string(),
    budget: v.optional(v.string()),
    timeline: v.optional(v.string()),
    status: v.string(), // "pending", "reviewed", "contacted", "closed"
    reviewedBy: v.optional(v.string()), // admin email who reviewed
    reviewedAt: v.optional(v.number()), // timestamp
    notes: v.optional(v.string()), // admin notes
    submittedAt: v.number(), // timestamp
  })
    .index("by_email", ["email"])
    .index("by_status", ["status"])
    .index("by_submitted_at", ["submittedAt"])
    .index("by_organization_type", ["organizationType"]),
});
