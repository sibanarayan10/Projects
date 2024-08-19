import { User } from "./user.model.js";
import mongoose,{Schema} from 'mongoose';
const ChannelSchema=new Schema({
  name:{
    type:String,
    required:true,
  },
  owner:{
    type:Schema.Types.ObjectId,
    ref:"User"
  }

},{timestamps:true})

export const Channel=mongoose.model("Channel",ChannelSchema);