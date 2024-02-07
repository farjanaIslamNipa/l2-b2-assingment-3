import { Schema, model } from "mongoose";
import {TEvent} from "./event.interface";

const eventSchema = new Schema<TEvent>({
  title: {
    type: String,
    unique: true,
    required: true
  },
  img:{
    type: String,
  },
  bgColor:{
    type: String,
  },
  isDeleted: {
    type: Boolean,
    default: false
  }

})

eventSchema.pre('find', function(next){
  this.find({isDeleted: {$ne: true}});
  next()
})

eventSchema.pre('findOne', function(next){
this.find({isDeleted: {$ne: true}});
next()
})

eventSchema.pre('aggregate', function(next){
this.pipeline().unshift({$match: {isDeleted: {$ne: true}}});
next()
})

export const Event = model<TEvent>('Event', eventSchema)