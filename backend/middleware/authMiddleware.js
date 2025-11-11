import jwt from "jsonwebtoken";
import User from "../models/userModel.js"
import asyncHandler from "express-astnc-handler";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  //check if authorization header starts with word Bearer
  if (req.headers.authorization?.startsWith("Bearer")) {
    try {
      //extract token string after "Bearer"
      token = req.headers.authorization.split(" ")[1];

      //Verify and decode token using secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //Load user from DB (id came from token payload)
      req.user = await User.findById(decoded.id).select("-password");

      //Move onto next middleware/route 
      next();
    } catch (error) {
      // if verify fails, (expired, wrong secret)
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export { protect };