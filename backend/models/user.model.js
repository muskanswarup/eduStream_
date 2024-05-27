import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },

  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
  },

  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: [6, "Password must be atleast 6 characters"],
  },

  avatar: {
    type: String,
  },

  role: {
    type: String,
    required: [true, "Please enter your role"],
  },

  aboutme: {
    type: String
  },

  owned_courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],

  enrolled_courses: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
    },
  ],

  completed_courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

const userModel = mongoose.model("User", userSchema);

export { userModel };
