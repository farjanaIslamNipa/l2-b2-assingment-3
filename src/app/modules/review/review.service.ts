import { TReview } from "./review.interface";
import { Review } from "./review.model";

const createReviewIntoDB = async(payload: TReview) => {
  const result = await Review.create(payload);

  return result;
}

const getAllReviewsFromDB = async() => {
  const result = await Review.find().populate('courseId')

  return result;
}

export const ReviewServices = {
  createReviewIntoDB,
  getAllReviewsFromDB
}