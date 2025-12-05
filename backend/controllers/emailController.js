import asyncHandler from "express-async-handler";
import Email from "../models/emailModel.js";

export const createEmail = asyncHandler(async (req, res) => {
  const { subject, body, tone } = req.body;

  const email = await Email.create({
    user: req.user._id,
    subject,
    body,
    tone,
  });

  res.status(201).json(email);
});

export const getEmails = asyncHandler(async (req, res) => {
  const emails = await Email.find({ user: req.user._id }); //req.user available due to middle ware 
  res.json(emails);
});
