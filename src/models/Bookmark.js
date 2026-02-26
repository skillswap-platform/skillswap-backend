import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    resourceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resource",
      required: true
    },
    savedAt: {
      type: Date,
      default: Date.now
    }
  }
);

const Bookmark = mongoose.model("Bookmark", bookmarkSchema);

export default Bookmark;