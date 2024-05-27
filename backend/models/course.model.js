import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter the title of your course"],
  },

  description: {
    type: String,
    required: [true, "Please write the description of your course"],
  },

  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Please specify the instructor"],
    ref: "User",
  },

  enrolled_users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  avatar: {
    type: String,
  },

  course_content: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Content",
    },
  ],

  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tag",
    },
  ],

  completion: {
    type: Boolean,
  },
});

const courseModel = mongoose.model("Course", courseSchema);

export { courseModel };
