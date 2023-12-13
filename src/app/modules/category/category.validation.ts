import { z } from "zod";

 const categoryValidationSchema = z.object({
  body: z.object({
    name: z.string({required_error: 'Category Name is required'})
  })
})

export default categoryValidationSchema
