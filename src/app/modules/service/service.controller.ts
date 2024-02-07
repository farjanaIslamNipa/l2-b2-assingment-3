import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import {ServiceServices} from "./service.service";

const createService = catchAsync(async(req, res) => {

  const result = await ServiceServices.createServiceIntoDB(req.body)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Service created successfully',
    data: result
  })
})

const getServices = catchAsync(async(req, res) => {
  const result = await ServiceServices.getServicesFromDB()

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Services retrieved successfully',
    data: result
  })
})

const updateService = catchAsync(async(req, res) => {
  const result = await ServiceServices.updateServiceIntoDB(req.params.id, req.body)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Service updated successfully',
    data: result
  })
})

const deleteService = catchAsync(async(req, res) => {
  const result = await ServiceServices.deleteServiceFromDB(req.params.id)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Service deleted successfully',
    data: result
  })
})

export const ServiceControllers = {
  createService,
  getServices,
  updateService,
  deleteService
}