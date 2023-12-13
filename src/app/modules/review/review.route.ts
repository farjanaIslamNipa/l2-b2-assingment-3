import express from 'express'
import validateRequest from '../../middleware/validateRequest';
import { reviewValidationSchema } from './review.validation';
import { ReviewControllers } from './review.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(reviewValidationSchema),
  ReviewControllers.createReview
)

export const ReviewRoutes = router