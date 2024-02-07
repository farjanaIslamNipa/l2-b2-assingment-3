import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import {RecentEventServices} from "./recentEvent.service";

const createRecentEvent = catchAsync(async(req, res) => {

  const result = await RecentEventServices.createRecentEventIntoDB(req.body)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Event created successfully',
    data: result
  })
})

const getRecentEvents = catchAsync(async(req, res) => {
  const result = await RecentEventServices.getRecentEventsFromDB()

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Events retrieved successfully',
    data: result
  })
})

const updateRecentEvent = catchAsync(async(req, res) => {
  const result = await RecentEventServices.updateRecentEventIntoDB(req.params.id, req.body)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Event updated successfully',
    data: result
  })
})

const deleteRecentEvent = catchAsync(async(req, res) => {
  const result = await RecentEventServices.deleteRecentEventFromDB(req.params.id)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Event deleted successfully',
    data: result
  })
})

export const RecentEventControllers = {
  createRecentEvent,
  getRecentEvents,
  updateRecentEvent,
  deleteRecentEvent
}