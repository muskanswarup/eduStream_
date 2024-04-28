import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter the title of your tag"],
    unique: true
  },
});

const tagModel = mongoose.model("Tag", tagSchema);

export { tagModel };
