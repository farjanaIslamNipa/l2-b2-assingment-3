import {z} from "zod";

const createRecentEventValidationSchema = z.object({
  body: z.object({
    title: z.string({required_error: 'Event name required'}),
    img: z.string().optional(),
    owner: z.string(),
    isDeleted: z.boolean().default(false)
  })
})



const updateRecentEventValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    img: z.string().optional(),
    owner: z.string().optional(),
    isDeleted: z.boolean().default(false).optional()
  })
})

export const RecentEventValidation = {
  createRecentEventValidationSchema,
  updateRecentEventValidationSchema
}