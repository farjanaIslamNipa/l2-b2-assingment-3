import { z } from "zod";

const tagsSchema = z.object({
  name: z.string(),
  isDeleted: z.boolean().default(false),
});

const detailsSchema = z.object({
  level: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  description: z.string()
});


const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Required', invalid_type_error: 'Course name must be a string' }),
    instructor: z.string(),
    categoryId: z.string(),
    price: z.number(),
    tags: z.array(tagsSchema).refine((tags) => tags.length > 0, { message: 'At least one tag is required.' }),
    startDate: z.string(),
    endDate: z.string(),
    language: z.string(),
    provider: z.string(),
    details: detailsSchema
  })
})
const updateTagsSchema = z.object({
  name: z.string().optional(),
  isDeleted: z.boolean().default(false).optional(),
});

const updateDetailsSchema = z.object({
  level: z.enum(['Beginner', 'Intermediate', 'Advanced']).optional(),
  description: z.string().optional()
});


const updateCourseValidationSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Required', invalid_type_error: 'Course name must be a string' }).optional(),
    instructor: z.string().optional(),
    categoryId: z.string().optional(),
    price: z.number().optional(),
    tags: z.array(updateTagsSchema).refine((tags) => tags.length > 0, { message: 'At least one tag is required.' }).optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    language: z.string().optional(),
    provider: z.string().optional(),
    details: updateDetailsSchema.optional()
  })
})

export const CourseValidation = {
  createCourseValidationSchema,
  updateCourseValidationSchema
}