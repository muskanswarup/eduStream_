import { courseModel } from "../models/course.model.js";
import { tagModel } from "../models/tag.model.js";

const createTag = async (req, res, next) => {
  try {
    const newTag = await tagModel.create({ title: req.body.title });
    const course = await courseModel.findById(req.params.id);
    course.tags.push(newTag._id);
    res.status(201).json({
      message: "Tag created",
      course: course,
      tag: newTag,
    });
  } catch (error) {
    next(error);
  }
};

const getTags = async (req, res, next) => {
  try {
    const tags = await tagModel.find({});
    if (tags.length === 0) {
      return res.status(200).send();
    }
    res.status(200).json(tags);
  } catch (error) {
    next(error);
  }
};

export { createTag, getTags };
