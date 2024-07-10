import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { Account } from "../Models /account.model";

/**
 * get all account
 * get perticular account
 * get account detail
 */
const createAccount=asyncHandler(async(req,res)=>{
const {accountName,balance}=req.body;
if([accountName,balance].some(item=>item.trim==="")){
    throw new ApiError(500,"all fields are required to create an account")
}
try{
    const account=new Account({accountName,balance});
    await account.save();
}catch(error){
    throw error;
}
})
const getAllAccount=asyncHandler(async(req,res)=>{
    const user=req.user;
    if(!user){
        throw new ApiError(501,"Invalid User");
    }
    return 
})
