import { z } from 'zod';

/**
 * Zod schema for the Collaboration Inquiry / Contact form.
 */
export const contactSchema = z.object({
  organizationType: z.string().min(1, 'Required'),
  organizationName: z.string().trim().min(2, 'Must be at least 2 characters'),
  contactPersonName: z.string().trim().min(2, 'Must be at least 2 characters'),
  email: z.string().trim().email('Invalid email address'),
  phoneNumber: z.string().trim().min(10, 'Invalid phone number'),
  website: z.string().trim().optional().or(z.literal('')),
  collaborationType: z.string().min(1, 'Required'),
  projectDetails: z.string().trim().min(10, 'Please provide more details (min 10 chars)'),
  budget: z.string().trim().optional(),
  timeline: z.string().trim().optional(),
});

/**
 * Zod schema for Workshop Registration.
 */
export const workshopRegistrationSchema = z.object({
  fullName: z.string().trim().min(2, 'Full name is required (min 2 chars)'),
  email: z.string().trim().email('Invalid email address'),
  phone: z.string().trim().min(10, 'Invalid phone number (min 10 digits)'),
  nextWorkshop: z.string().trim().optional(),
  transactionId: z.string().trim().min(6, 'UPI Transaction ID is required (min 6 chars)'),
});

export type ContactFormData = z.infer<typeof contactSchema>;
export type WorkshopRegistrationData = z.infer<typeof workshopRegistrationSchema>;
