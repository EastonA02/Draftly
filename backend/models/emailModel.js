import mongoose from "mongoose";

const emailSchema = new mongoose.Schema(
  {
   user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
   },
   subject: {
    type: String,
    required: true,
   },
   body: {
    type: String,
    required: true,
   },
   tone: {
    type: String,
   },
  }, {
    timestamps: true, //createdAt + updatedAt
  }
);

const Email = mongoose.model("Email", emailSchema);
export default Email;

//Each email belongs to a user, has a subject, body and optional tone
