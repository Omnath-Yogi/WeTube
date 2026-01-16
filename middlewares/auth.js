import jwt from "jsonwebtoken";
import User from '../models/User.js'

// 1️⃣ AUTH: checks token & login
export const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token){
      return res.status(401).json({
        success: false,
        message: "Not authorized, token missing",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // { id, role, iat, exp }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

 


export const adminOnly = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user || user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access only",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Authorization failed",
    });
  }
};
