import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CourseServices } from "./course.service";


// CREATE COURSE
const createCourse = catchAsync(async(req, res) => {
  const result = await CourseServices.createCourseIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Course created successfully',
    data: result
  })
})


// GET ALL COURSES
const getAllCourses = catchAsync(async(req, res) => {
  const {meta, courseData} = await CourseServices.getAllCoursesFromDB(req.query);

  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Courses retrieved successfully',
    meta: meta,
    data: courseData
  })
})


// UPDATE COURSE
const updateCourse = catchAsync(async(req, res) => {
  const { courseId } = req.params
  const result = await CourseServices.updateCourseIntoDB(courseId, req.body)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Course updated successfully',
    data: result
  })
})


// GET COURSE WITH REVIEWS
const getCourseWithReviews = catchAsync(async(req, res) => {
  const {courseId} = req.params;

  const result = await CourseServices.getCourseWithReviewsFromDB(courseId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Course and Reviews retrieved successfully',
    data: result
  })
})


// GET BEST COURSE
const getBestCourse = catchAsync(async(req, res) => {
  const result = await CourseServices.getBestCourseFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Best course retrieved successfully',
    data: result
  })
})

export const CourseControllers = {
  createCourse,
  getAllCourses,
  updateCourse,
  getCourseWithReviews,
  getBestCourse
}

