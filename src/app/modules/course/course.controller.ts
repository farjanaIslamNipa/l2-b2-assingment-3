import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CourseServices } from "./course.service";

const createCourse = catchAsync(async(req, res) => {
  const result = await CourseServices.createCourseIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Course created successfully',
    data: result
  })
})

const getAllCourses = catchAsync(async(req, res) => {
  const result = await CourseServices.getAllCoursesFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Courses retrieved successfully',
    data: result
  })
})
const getSingleCourse = catchAsync(async(req, res) => {
  const {courseId} = req.params
  const result = await CourseServices.getSingleCourseFromDB(courseId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Course retrieved successfully',
    data: result
  })
})

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
  getSingleCourse,
  updateCourse,
  getCourseWithReviews,
  getBestCourse
}

