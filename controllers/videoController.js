import Video from "../models/Video.js";
import mongoose from "mongoose";

export const getAllVideos = async (req, res) => {
  try {
    const allVideo = await Video.find({ isPublished: false });
    res.json({
      success: true,
      message: "Request successful fulfiled",
      allVideo,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};




export const getVideoById = async (req, res) => {
  try {
    const { videoId } = req.params;

    const video = await Video.findById(videoId);

    if (!video) {
      return res.json({
        success: false,
        message: "Video not found",
      });
    }
    res.json({
      success: true,
      message: "Request successful fulfiled",
      video,
    });
  } catch (error){
    res.json({
      success: false,
      message: error.message,
    });
  }
};


