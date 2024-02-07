import {z} from "zod";

const createServiceValidationSchema = z.object({
  body: z.object({
    title: z.string({required_error: 'Service name required'}),
    img: z.string().optional(),
    description: z.string(),
    facilities: z.array(z.string()).refine((item) => item.length > 0, {message: 'At least one facility is required'}),
    isDeleted: z.boolean().default(false)
  })
})



const updateServiceValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    img: z.string().optional(),
    description: z.string().optional(),
    facilities: z.array(z.string()).refine((item) => item.length > 0, {message: 'At least one facility is required'}).optional(),
    isDeleted: z.boolean().default(false).optional()
  })
})

export const ServiceValidation = {
  createServiceValidationSchema,
  updateServiceValidationSchema
}