import {z} from "zod";

const createEventValidationSchema = z.object({
  body: z.object({
    title: z.string({required_error: 'Event name required'}),
    img: z.string().optional(),
    bgColor: z.string().optional(),
    isDeleted: z.boolean().default(false)
  })
})



const updateEventValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    img: z.string().optional(),
    bgColor: z.string().optional(),
    isDeleted: z.boolean().default(false).optional()
  })
})

export const EventValidation = {
  createEventValidationSchema,
  updateEventValidationSchema
}