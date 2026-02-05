import Video from "../models/Video.js";
import mongoose from "mongoose";
import User from "../models/User.js"
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
    const { videoId } =  req.params;
    

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

 
export const videosByArray = async (req, res) => {
  try {

    const {userId} = req.body;

    const data = await User.findById(userId)
    // console.log("data is",data)
    const videoIds = data.likes
    // console.log("the video is ",videoIds)

       const videos = await Video.find({
      _id: { $in: videoIds },
    });

    res.status(200).json({
      success: true,
      videos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};





export const historyVideosByArray = async (req, res) => {
  try {

    const {userId} = req.body;

    const data = await User.findById(userId)
    // console.log("data is",data)
    const videoIds = data.watchHistory
    // console.log("the video is ",videoIds)

       const videos = await Video.find({
      _id: { $in: videoIds },
    });

    res.status(200).json({
      success: true,
      videos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
