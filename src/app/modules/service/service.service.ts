import {TService} from "./service.interface";
import {Service} from "./service.model";

const createServiceIntoDB = async(payload: TService) => {
const result = await Service.create(payload);  
  return result
}

const getServicesFromDB= async() => {

  const result = await Service.find();

  return result
}

const updateServiceIntoDB = async(id:string, payload: Partial<TService>) => {

  const result = await Service.findByIdAndUpdate(id, payload, {new: true});

  return result
}

const deleteServiceFromDB = async(id:string) => {
  const result = await Service.findByIdAndUpdate(id, {isDeleted: true}, {new: true, runValidators: true})
  return result
}

export const ServiceServices = {
  createServiceIntoDB,
  updateServiceIntoDB,
  getServicesFromDB,
  deleteServiceFromDB

}