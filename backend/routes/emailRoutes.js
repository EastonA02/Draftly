import express from "express"
import { createEmail, getEmails } from "../controllers/emailController.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router();

router.route("/")
  .post(protect, createEmail)
  .get(protect, getEmails);

export default router;