import { z } from 'zod'

const contactTagsSchema = z.array(z.string())
export type ContactTags = z.infer<typeof contactTagsSchema>

const contactTypeSchema = z.enum(['individual', 'business'])
export type ContactType = z.infer<typeof contactTypeSchema>

// We're keeping a simple schema with basic contact information.
export const contactSchema = z.object({
  id: z.string(),
  name: z.string(),
  address: z.string(),
  mobile: z.string(),
  email: z.string().email(),
  type: contactTypeSchema,
  tags: contactTagsSchema,
})

export type Contact = z.infer<typeof contactSchema>
