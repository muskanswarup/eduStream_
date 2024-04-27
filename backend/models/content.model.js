import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter the title of your content"],
  },

  url: {
    type: String,
    required: [true, "Please specify the url of your course"],
  },

  watchedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const contentModel = mongoose.model("Content", contentSchema);

export { contentModel };
