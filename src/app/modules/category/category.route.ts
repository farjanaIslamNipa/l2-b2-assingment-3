import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import categoryValidationSchema from './category.validation'
import { CategoryControllers } from './category.controller'

const router = express.Router()

router.post(
  '/',
  validateRequest(categoryValidationSchema),
  CategoryControllers.createCategory
)

router.get('/', CategoryControllers.getAllCategories)

export const CategoryRoutes = router


