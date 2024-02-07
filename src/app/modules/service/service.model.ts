import { Schema, model } from "mongoose";
import { TService } from "./service.interface";

const serviceSchema = new Schema<TService>({
  title: {
    type: String,
    unique: true,
    required: true
  },
  img:{
    type: String,
  },
  description: {
    type: String,
    required: true
  },
  facilities: {
    type: [String],
    required: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  }

})

serviceSchema.pre('find', function(next){
  this.find({isDeleted: {$ne: true}});
  next()
})

serviceSchema.pre('findOne', function(next){
this.find({isDeleted: {$ne: true}});
next()
})

serviceSchema.pre('aggregate', function(next){
this.pipeline().unshift({$match: {isDeleted: {$ne: true}}});
next()
})


export const Service = model<TService>('Service', serviceSchema)