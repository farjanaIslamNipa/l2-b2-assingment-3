import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { CourseValidation } from './course.validation'
import { CourseControllers } from './course.controller'

const router = express.Router()

router.post(
  '/course', 
  validateRequest(CourseValidation.createCourseValidationSchema), 
  CourseControllers.createCourse)

router.get('/courses', CourseControllers.getAllCourses)
router.get('/courses/:courseId', CourseControllers.getSingleCourse)

router.put(
  '/courses/:courseId',
  validateRequest(CourseValidation.updateCourseValidationSchema),
  CourseControllers.updateCourse)

router.get('/courses/:courseId/reviews', CourseControllers.getCourseWithReviews)

router.get('/course/best', CourseControllers.getBestCourse)
 
export const CourseRoutes = router