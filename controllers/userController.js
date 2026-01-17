import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist, please register",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User Already exist, please Login",
      });
    }

    const hasspassword = await bcrypt.hash(password, 10);

    await User.create({
      email,
      password: hasspassword,
      name,
      role: "user",
    });

    res.json({
      success: true,
      message: "User registered successfully, please login",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const userInformation = async (req, res) => {
  try {
    const { userId } = req.params;

    const infomation = await User.findById(userId).select("likes watchHistory email name createdAt _id")

    if (!infomation) {
      res.json({
        success: false,
        message: "user not found",
      });
    }

    res.json({
      success: true,
      message: "Request successful fulfiled",
      infomation,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
