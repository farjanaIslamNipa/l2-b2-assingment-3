import {TRecentEvent} from "./recentEvent.interface";
import {RecentEvent} from "./recentEvent.model";



const createRecentEventIntoDB = async(payload: TRecentEvent) => {
const result = await RecentEvent.create(payload);  
  return result
}

const getRecentEventsFromDB= async() => {

  const result = await RecentEvent.find();

  return result
}

const updateRecentEventIntoDB = async(id:string, payload: Partial<TRecentEvent>) => {

  const result = await RecentEvent.findByIdAndUpdate(id, payload, {new: true});

  return result
}

const deleteRecentEventFromDB = async(id:string) => {
  const result = await RecentEvent.findByIdAndUpdate(id, {isDeleted: true}, {new: true, runValidators: true})
  return result
}

export const RecentEventServices = {
  createRecentEventIntoDB,
  updateRecentEventIntoDB,
  getRecentEventsFromDB,
  deleteRecentEventFromDB
}