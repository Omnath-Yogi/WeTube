import Video from "../models/Video.js";
import cloudinary from "../configs/cloudinary.js";
import imageKit from "../configs/imageKit.js";
import fs from "fs";

export const addVideo = async (req, res) => {
  try {
    const {
      title,
      description,
      isPublished = false,
      category,
    } = JSON.parse(req.body.details);

    const videoFile = req.files.video[0];
    const imageFile = req.files.thumbnail[0];

    if (!title || !description || !category || !imageFile || !videoFile) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const fileBuffer = await fs.promises.readFile(imageFile.path);

    // Upload image to ImageKit
    const imageResponse = await imageKit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/thumbnail",
    });
    // console.log(imageResponse);

    await fs.promises.unlink(imageFile.path);

    const optimizedImageUrl = imageKit.url({
      path: imageResponse.filePath, // ← Fixed: Use filePath
      transformation: [
        { quality: "auto" }, // Auto compression
        { format: "webp" }, // Convert to modern format
        { width: 1280 }, // Width resizing (note: string "1280" → number 1280 for consistency)
      ],
    });

    const thumbnail = optimizedImageUrl;

    const videoResponse = await cloudinary.uploader.upload(videoFile.path, {
      resource_type: "video",
      folder: "videos",
      chunk_size: 6000000,
    });

    await fs.promises.unlink(videoFile.path);

    // const video = cloudinary.url(videoResponse.public_id, {
    //   resource_type: "video",
    //   fetch_format: "auto",
    //   quality: "auto",
    // });

    const video = videoResponse.secure_url;

    const duration = videoResponse.duration;

    await Video.create({
      title,
      description,
      thumbnail,
      video,
      duration,
      isPublished:false,
      category,
    });

    res
      .status(201)
      .json({ success: true, message: "Video added successfully" });
  } catch (error) {
    console.log(error);
  }


 
};
