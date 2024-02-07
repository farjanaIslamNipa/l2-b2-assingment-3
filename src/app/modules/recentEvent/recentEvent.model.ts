import { Schema, model } from "mongoose";
import {TRecentEvent} from "./recentEvent.interface";

const recentEventSchema = new Schema<TRecentEvent>({
  title: {
    type: String,
    unique: true,
    required: true
  },
  img:{
    type: String,
  },
  owner: {
    type: String,
    required: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  }

})

recentEventSchema.pre('find', function(next){
  this.find({isDeleted: {$ne: true}});
  next()
})

recentEventSchema.pre('findOne', function(next){
this.find({isDeleted: {$ne: true}});
next()
})

recentEventSchema.pre('aggregate', function(next){
this.pipeline().unshift({$match: {isDeleted: {$ne: true}}});
next()
})

export const RecentEvent = model<TRecentEvent>('RecentEvent', recentEventSchema)