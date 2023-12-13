/* eslint-disable @typescript-eslint/no-explicit-any */
import { TReview } from "../review/review.interface";
import { Review } from "../review/review.model";
import { TCourse } from "./course.interface";
import { Course } from "./course.model";


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
const getAllCoursesFromDB = async() => {

  const result = await Course.find();
  return result;

}


// GET SINGLE COURSE
const getSingleCourseFromDB = async(id: string) => {
  const result = await Course.findById(id);

  return result;
}


// UPDATE COURSE
const updateCourseIntoDB = async(id: string, payload: Partial<TCourse>) => {
  const {tags, details, ...remainingCourseData} = payload;

  const updatedCourseData : Record<string, unknown> = {...remainingCourseData}

  if(tags && Object.keys(tags).length){
    for(const [key, value] of Object.entries(tags)){
      updatedCourseData[`tags.${key}`] = value
    }
  }
  if(details && Object.keys(details).length){
    for(const [key, value] of Object.entries(details)){
      updatedCourseData[`tags.${key}`] = value
    }
  }
  const result = await Course.findByIdAndUpdate(
    id,
    updatedCourseData,
    {new: true, runValidators: true}
  )

  return result;
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
  getSingleCourseFromDB,
  updateCourseIntoDB,
  getCourseWithReviewsFromDB,
  getBestCourseFromDB
}