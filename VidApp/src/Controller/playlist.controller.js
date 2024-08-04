import mongoose,{isValidObjectId} from "mongoose";
import { Playlist } from "../models/playlist.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createPlaylist = asyncHandler(async (req, res) => {
    const { name, description } = req.body;
    if ([name, description].some((item) => item.trim() === "")) {
        return res.status(400).json(new ApiError(400, "All fields are required"));
    }
    const playlist = new Playlist({ name, description, owner: req.user?.id });
    await playlist.save();
    return res.status(200).json(new ApiResponse(200, playlist, "New playlist created successfully"));
});

const getUserPlaylists = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const userPlaylists = await Playlist.find({ owner: userId });
    if (userPlaylists.length === 0) {
        return res.status(404).json(new ApiError(404, "No playlists found for this user"));
    }
    return res.status(200).json(new ApiResponse(200, userPlaylists, "User playlists retrieved successfully"));
});

const getPlaylistById = asyncHandler(async (req, res) => {
    const { playlistId } = req.params;
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
        return res.status(404).json(new ApiError(404, "Playlist not found"));
    }
    return res.status(200).json(new ApiResponse(200, playlist, "Playlist retrieved successfully"));
});

const addVideoToPlaylist = asyncHandler(async (req, res) => {
    const { playlistId, videoId } = req.params;
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
        return res.status(404).json(new ApiError(404, "Playlist not found"));
    }
    if (!isValidObjectId(videoId)) {
        return res.status(400).json(new ApiError(400, "Invalid video ID"));
    }
    playlist.videos.push(videoId);
    await playlist.save();
    return res.status(200).json(new ApiResponse(200, playlist, "Video added to playlist successfully"));
});

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    const { playlistId, videoId } = req.params;
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
        return res.status(404).json(new ApiError(404, "Playlist not found"));
    }
    if (!isValidObjectId(videoId)) {
        return res.status(400).json(new ApiError(400, "Invalid video ID"));
    }
    playlist.videos = playlist.videos.filter((video) => video.toString() !== videoId);
    await playlist.save();
    return res.status(200).json(new ApiResponse(200, playlist, "Video removed from playlist successfully"));
});

const deletePlaylist = asyncHandler(async (req, res) => {
    const { playlistId } = req.params;
    const result = await Playlist.deleteOne({ _id: playlistId });
    if (result.deletedCount === 0) {
        return res.status(404).json(new ApiError(404, "Playlist not found"));
    }
    return res.status(200).json(new ApiResponse(200, null, "Playlist deleted successfully"));
});

const updatePlaylist = asyncHandler(async (req, res) => {
    const { playlistId } = req.params;
    const { name, description } = req.body;
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
        return res.status(404).json(new ApiError(404, "Playlist not found"));
    }
    playlist.name = name ?? playlist.name;
    playlist.description = description ?? playlist.description;
    await playlist.save();
    return res.status(200).json(new ApiResponse(200, playlist, "Playlist updated successfully"));
});

export {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist
};