import mongoose from "mongoose"
import {Comment} from "../models/comment.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const getVideoComments = asyncHandler(async (req, res) => {
    //TODO: get all comments for a video
    const {videoId} = req.params
    const {page = 1, limit = 10} = req.query
    const pageNumber=parseInt(page,10);
    const limitNumber=parseInt(limit,10);
    const skip=(pageNumber-1)*limitNumber;
    const comments=await Comment.
            find({"video":videoId}).
            skip(skip).limit(limit);
    if(comments.length==0){
        throw new ApiResponse("no comments found in this video")
    }
    res.status(200).json(new ApiResponse(200,comments,"comments of the video fetched successfully"));

})

const addComment = asyncHandler(async (req, res) => {
    const{content}=req.body;
       
    if (!content) {
        throw new ApiError(400, "Content is required to add a comment");
    }
    const{videoId}=req.params;
    const comment=new Comment({content:content,owner:req.user?._id,video:videoId});
    await comment.save();
    
    res.status(201).json(new ApiResponse(201, comment, "Comment added successfully"));
    // TODO: add a comment to a video
})

const updateComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    const { newComment } = req.body;
    
    if (!newComment) {
        throw new ApiError(400, "New comment content is required");
    }
    
    const comment = await Comment.findById(commentId);
    
    if (!comment) {
        throw new ApiError(404, "Comment not found");
    }
    
    comment.content = newComment;
    await comment.save();
    
    res.status(200).json(new ApiResponse(200, comment, "Comment updated successfully"));
});

const deleteComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    
    const comment = await Comment.findById(commentId);
    
    if (!comment) {
        throw new ApiError(404, "Comment not found");
    }
    
    await comment.deleteOne();
    
    res.status(200).json(new ApiResponse(200, null, "Comment deleted successfully"));
});

export {
    getVideoComments, 
    addComment, 
    updateComment,
     deleteComment
    }
