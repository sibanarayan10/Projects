import mongoose, { isValidObjectId } from "mongoose"
import { Video } from "../models/video.model.js"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"


const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query
    const user = req.user;
    if (!user) {
        throw new ApiError(500, "set up the middleware");
    }
    const pageNumber = parseInt(page, 10);
    const limitOfPage = parseInt(limit, 10);
    const sort = sortBy === "ascending" ? 1 : -1;
    const skip = (pageNumber - 1) * limitOfPage;
    const videos = await Video.find({ "owner": user._id }).
        sort({ isPublished: sort }).
        skip(skip).
        limit(limit);
return res.status(200).json(new ApiResponse(200,videos,"successfull"));

})

const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description } = req.body
    // TODO: get video, upload to cloudinary, create video
})

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    if (!videoId) {
        throw new ApiError(500, "can not get video");
    }
    const video = await Video.findById(videoId);
    return res.
        status(200).
        json(new ApiResponse(200, video, "video fetched successfully"))
    //TODO: get video by id
})

const updateVideo = asyncHandler(async (req, res) => {
    const { title, desc, thumbnail } = req.body;
    if (!title || !desc || !thumbnail) {
        throw new ApiError(401, "All fields are required");
    }
    const { videoId } = req.params
    if (!videoId) {
        throw new ApiError(405, "No video exist of that type");
    }
    const Video = await Video.find({ _id: videoId });
    Video.title = title;
    Video.description = desc;
    Video.thumbnail = thumbnail;

    //TODO: update video details like title, description, thumbnail
    return res
        .status(200)
        .json(new ApiResponse(200, user, "Account details updated successfully"))

})

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    if (!videoId) {
        throw new ApiError(405, "No video exist of that type");
    }
    const count = await Video.deleteMany({ _id: videoId });

    //TODO: delete video
})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params
})

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}
