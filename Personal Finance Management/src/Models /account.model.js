import mongoose,{Schema} from 'mongoose'
import { User } from './user.model'
const accountSchema=new Schema({
    name:{
        type:String,
        required:true,
   
    },
    owner:{
    type:Schema.Types.ObjectId,
    ref:User,
    
    },
    balance:{
    type:Number,
    required :true,

    }

},{timestamps:true})
accountSchema.index({name: 1, owner: 1 }, { unique: true });

export const Account=mongoose.model(Account,accountSchema)