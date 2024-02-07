import {TEvent} from "./event.interface";
import {Event} from "./event.model";


const createEventIntoDB = async(payload: TEvent) => {
const result = await Event.create(payload);  
  return result
}

const getEventsFromDB= async() => {

  const result = await Event.find();

  return result
}

const updateEventIntoDB = async(id:string, payload: Partial<TEvent>) => {

  const result = await Event.findByIdAndUpdate(id, payload, {new: true});

  return result
}

const deleteEventFromDB = async(id:string) => {
  const result = await Event.findByIdAndUpdate(id, {isDeleted: true}, {new: true, runValidators: true})
  return result
}

export const EventServices = {
  createEventIntoDB,
  updateEventIntoDB,
  getEventsFromDB,
  deleteEventFromDB
}