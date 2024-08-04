import mongoose, {isValidObjectId} from "mongoose"
import {User} from "../models/user.model.js"
import { Subscription } from "../models/subscription.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import { Channel } from "../models/channel.model.js"


const toggleSubscription = asyncHandler(async (req, res) => {
    const {channelId} = req.params
    const userId =req.user?._id;
    if(!isValidObjectId(channelId)){
        throw new ApiError(401,"invalid objectId");
    }
    const findSubscription=await Subscription.find({"subscribedTo":channelId,"subscribedBy":userId});
    if(!findSubscription){
    const subscription=new Subscription({subscribedTo:channelId});
        await subscription.save();
        throw new ApiResponse(200,"channle get subscribed successfully");
    }
    await Subscription.deleteOne(channelId);
    return res.status(200).json(200,"subscription deleted successfully");

   
})

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    const {channelId} = req.params;
    if(!isValidObjectId(channelId)){
        throw new ApiError(401,"invalid objectId");
    }
    const getSubscriber=await Subscription.find({subscribedBy:{$exist:true}});
    if(!getSubscriber){
        throw new ApiError(503,"no subscriber found in this channel");
    }
    return res.status(200).json(200,getSubscriber,"subscriber fetched successfully");

})

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
    const user=req.user;
    if(!user){
        throw new ApiError(400,"Unauthorized access from user");
    }
    const subscribedChannel=await Subscription.find({"subscribedTo":{$exist:true}});
    if(!subscribedChannel){
        throw new ApiResponse(300,"no subscribed channnel fetched");
    }
    return res.status(200).json(200,subscribedChannel,"all channel fetched successfully");
   

})

export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
}