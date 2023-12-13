import { Types } from "mongoose";

export type TTags = {
   name: string;
   isDeleted: boolean;
}

export type TDetails = {
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
}

export type TCourse = {
  title: string;
  instructor: string;
  categoryId: Types.ObjectId;
  price: number;
  tags: [TTags];
  startDate: string;
  endDate: string;
  durationInWeeks: number;
  language: string;
  provider: string;
  details: TDetails;
}

export type TCourseReview = {
  course: Types.ObjectId,
  reviews: [Types.ObjectId]
}