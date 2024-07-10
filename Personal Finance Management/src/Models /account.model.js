import mongoose,{Schema} from 'mongoose'
import { User } from './user.model'
const accountSchema=new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    owner:{
    type:Schema.Types.ObjectId,
    ref:User,
    required :true,
    },
    balance:{
    type:Number,

    }

},{timestamps:true})

export const Account=mongoose.model(Account,accountSchema)