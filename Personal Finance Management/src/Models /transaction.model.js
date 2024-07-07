import { User } from "./user.model";
import mongoose,{Schema} from "mongoose";
const trasactionSchema=new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
      },
    amount: {
        type: Number,
        required: true
      },
    category: {
        type: String,
        required: true
      },
    type: {
        type: String,
        enum: ['income', 'expense'], 
        required: true
      },
      description: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
},{timestamps:true})