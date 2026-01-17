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


//delete video 
export const deleteBlogById = async (req, res) => {
  try {
    const { id } = req.body;
    const blog = await Blog.findOneAndDelete(id);

    //Delete all Comments associated with the blog

    await Comment.deleteMany({blog:id});

    res.json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};


// publish
export const togglePublish = async (req, res) => {
  try {
    const { id } = req.body;
    const blog = await Blog.findById(id);
    blog.isPublished = !blog.isPublished;
    await blog.save();
    res.json({
      success: true,
      message: "Blog status updated",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};



/// add comment 
export const addComment = async (req, res) => {
  try {
    const { blogId, name, content } = req.body;  // Changed 'blog' to 'blogId'
    await Comment.create({ blog: blogId, name, content });
    res.json({
      success: true,
      message: "Comment added successfully",  // Fixed error message
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};