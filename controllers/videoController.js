import Video from "../models/Video.js";

export const getAllVideos = async (req, res) => {
  try {
    const allVideo = await Video.find({ isPublished: true });
    res.json({
      success: true,
      message: "Request successful fulfiled",
      allVideo,
    });
  } catch (error){
    res.json({
      success: false,
      message: error.message,
    });
  }
};
