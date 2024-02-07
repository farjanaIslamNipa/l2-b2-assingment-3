import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import {EventServices} from "./event.service";

const createEvent = catchAsync(async(req, res) => {

  const result = await EventServices.createEventIntoDB(req.body)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Event created successfully',
    data: result
  })
})

const getEvents = catchAsync(async(req, res) => {
  const result = await EventServices.getEventsFromDB()

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Events retrieved successfully',
    data: result
  })
})

const updateEvent = catchAsync(async(req, res) => {
  const result = await EventServices.updateEventIntoDB(req.params.id, req.body)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Event updated successfully',
    data: result
  })
})

const deleteEvent = catchAsync(async(req, res) => {
  const result = await EventServices.deleteEventFromDB(req.params.id)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Event deleted successfully',
    data: result
  })
})

export const EventControllers = {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent
}