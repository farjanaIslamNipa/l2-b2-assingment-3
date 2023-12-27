/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import { AppError } from "../../error/appError";
import { Review } from "../review/review.model";
import { TCourse } from "./course.interface";
import { Course } from "./course.model";
import mongoose from "mongoose";


// CREATE COURSE
const createCourseIntoDB = async(payload:TCourse) => {

  const courseData : Partial<TCourse> = payload;

  const oneWeek = 7 * 24 * 60 * 60 * 1000;
  const startDate = Date.parse(payload?.startDate);
  const endDate = Date.parse(payload?.endDate);

 const durationInWeeks = (Math.ceil((endDate - startDate) / oneWeek));

 courseData.durationInWeeks = durationInWeeks

  const result = await Course.create(courseData);

  return result;

}


// GET ALL COURSE
const getAllCoursesFromDB = async(query: Record<string, unknown>) => {

  const queryObj = {...query}

  const excludeFields = ['page', 'sortBy', 'sortOrder', 'limit', 'page', 'fields']

  excludeFields.forEach(el => delete queryObj[el])


  const queryNames = Object.keys(queryObj);

  // filtering by level
  if(queryNames.includes('level')){
    queryObj['details.level'] = queryObj['level'];
    delete queryObj['level'];
  }


  // SORTING
  let sortBy = '-createdAt'
  if(query.sortBy){
    sortBy = query.sortBy as string
  }

  if(query.sortBy && query.sortOrder && query.sortOrder === 'asc'){
    sortBy = query.sortBy as string
  }
  if(query.sortBy && query.sortOrder && query.sortOrder === 'desc'){
    sortBy = `-${(query.sortBy as string)}`
  }

  // LIMIT AND PAGINATE
  const limit = Number(query?.limit) || 10
  const page = Number(query?.page) || 1
  const skip = ((page - 1) * limit) || 0

  //  FIELD FILTERING
  let fields= '-__v';
  if(query.fields){
    fields = (query.fields as string).replace(',', ' ')
  }

  const result = await Course.find(queryObj)
  .populate('createdBy')
  .sort(sortBy)
  .skip(skip)
  .limit(limit)
  .select(fields)

  const meta = {
    page: page,
    limit: limit,
    total: result.length
  }
  return {meta, courseData: result};

}


// UPDATE COURSE
const updateCourseIntoDB = async(id: string, payload: Partial<TCourse>) => {
  const {tags, details, ...remainingCourseData} = payload;

  const updatedBasicCourseInfo : Record<string, unknown> = {...remainingCourseData}

  if(tags && Object.keys(tags).length){
    for(const [key, value] of Object.entries(tags)){
      updatedBasicCourseInfo[`tags.${key}`] = value
    }
  }

  if(details && Object.keys(details).length){
    for(const [key, value] of Object.entries(details)){
      updatedBasicCourseInfo[`details.${key}`] = value
    }
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
  const updatedCourseData = await Course.findByIdAndUpdate(
    id,
    updatedBasicCourseInfo,
    {new: true, runValidators: true}
  )

  if (!updatedCourseData) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course!');
  }

// Check if any tags to update
  if(tags && tags.length > 0){
    const deletedTags = tags
    .filter(tag => tag.name && tag.isDeleted)
    .map(tag => tag.name)

    const removeDeletedTags = await Course.findByIdAndUpdate(
      id,
      {
        $pull: {tags: { name: { $in: deletedTags}}}
      },
      {new: true, runValidators: true}
    )

    if (!removeDeletedTags) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course!');
    }

    // add new tags
    const newTags = tags?.filter(tag => tag.name && !tag.isDeleted)

    const courseWithAddedTags = await Course.findByIdAndUpdate(
      id,
      {
        $addToSet: { tags: { $each: newTags}}
      },
      {new: true, runValidators: true}
    )

    if (!courseWithAddedTags) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course!');
    }

    await session.commitTransaction();
    await session.endSession();

    const result = await Course.findById(id);

    return result;
  }
  
  }catch(err){
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
  }
}


// GET COURSE WITH REVIEWS
const getCourseWithReviewsFromDB = async(id: string) => {
  
  const courseReviews = await Review.find()

  const reviews = courseReviews.filter(review => String(review.courseId) === id)

  const course = await Course.findById(id)

  return {course, reviews};
}


// GET BEST COURSE
const getBestCourseFromDB = async() => {
  const reviews = await Review.find()

  const reviewIdArr: string[] = [];

  reviews.map(review => {
    reviewIdArr.push(String(review.courseId))
  })

  // getting course id of highest review
  let maxCount = 0; 
  let courseId : string = ''; 
  for (let i = 0; i < reviewIdArr.length; i++) { 
      let count = 0; 
      for (let j = 0; j < reviewIdArr.length; j++) { 
          if (reviewIdArr[i] == reviewIdArr[j]) 
              count++; 
      } 

      if (count > maxCount) { 
        maxCount = count; 
        courseId = reviewIdArr[i]; 
      } 
  } 

  const courseWithHighestReview = reviews.filter(review => String(review.courseId) === courseId)
  const totalRating = courseWithHighestReview.reduce((accumulator, object) => accumulator + object.rating, 0 )

  const reviewCount = courseWithHighestReview.length
  const averageRating = (totalRating / reviewCount).toFixed(2)

  const course = await Course.findById(courseId)


  return { course, averageRating, reviewCount };

}


export const CourseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  updateCourseIntoDB,
  getCourseWithReviewsFromDB,
  getBestCourseFromDB
}