import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
/**
 * create transaction
 * total transaction history
 * transaction with in a month
 * transaction with single person
 */

const createTransaction=asyncHandler(async(req,res)=>{
    const{fromAccountname,to,toAccountname,amount}=req.body;
    if([fromAccountname,to,toAccountname,amount].some((item)=>item.trim()==="")){
        throw new ApiError(401,"All fields are required");
    }
    const person1=req.user;
    const person2=User.find({name:to});
    if(!person1||!person2){
        throw new ApiError("person doesn't exist");
    }
    

})