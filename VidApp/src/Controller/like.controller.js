import mongoose, { isValidObjectId } from "mongoose";
import { Like } from "../models/like.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleVideoLike = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    
    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid object id!");
    }
    
    const user = req.user;
    if (!user) {
        throw new ApiError(402, "User not verified!");
    }
    
    const existingLike = await Like.findOne({ video: videoId, likedBy: user._id });
    
    if (existingLike) {
        await existingLike.remove();
        return res.status(200).json(new ApiResponse(200, "Like removed successfully"));
    } else {
        const newLike = new Like({ video: videoId, likedBy: user._id });
        await newLike.save();
        return res.status(200).json(new ApiResponse(200, "Video liked"));
    }
});

const toggleCommentLike = asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    
    if (!isValidObjectId(commentId)) {
        throw new ApiError(400, "Invalid object id!");
    }
    
    const user = req.user;
    if (!user) {
        throw new ApiError(402, "User not verified!");
    }
    
    const existingLike = await Like.findOne({ comment: commentId, likedBy: user._id });
    
    if (existingLike) {
        await existingLike.remove();
        return res.status(200).json(new ApiResponse(200, "Like removed successfully"));
    } else {
        const newLike = new Like({ comment: commentId, likedBy: user._id });
        await newLike.save();
        return res.status(200).json(new ApiResponse(200, "Comment liked"));
    }
});

const toggleTweetLike = asyncHandler(async (req, res) => {
    const { tweetId } = req.params;
    
    if (!isValidObjectId(tweetId)) {
        throw new ApiError(400, "Invalid object id!");
    }
    
    const user = req.user;
    if (!user) {
        throw new ApiError(402, "User not verified!");
    }
    
    const existingLike = await Like.findOne({ tweet: tweetId, likedBy: user._id });
    
    if (existingLike) {
        await existingLike.remove();
        return res.status(200).json(new ApiResponse(200, "Like removed successfully"));
    } else {
        const newLike = new Like({ tweet: tweetId, likedBy: user._id });
        await newLike.save();
        return res.status(200).json(new ApiResponse(200, "Tweet liked"));
    }
});

const getLikedVideos = asyncHandler(async (req, res) => {
    const user = req.user;
    if (!user) {
        throw new ApiError(402, "User not verified!");
    }
    
    const likedVideos = await Like.find({ likedBy: user._id, video: { $exists: true } }).populate("video");
    
    if (likedVideos.length === 0) {
        return res.status(200).json(new ApiResponse(200, [], "No videos liked by you"));
    }
    
    return res.status(200).json(new ApiResponse(200, likedVideos, "Liked videos retrieved successfully"));
});

export {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos
};