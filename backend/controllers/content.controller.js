import { contentModel } from "../models/content.model.js";
import { courseModel } from "../models/course.model.js";

const addContent = async (req, res, next) => {
  try {
    const courseId = req.params.id;

    const course = await courseModel.findById(courseId);

    const newContent = await contentModel.create({
      title: req.body.title,
      url: req.body.url,
    });
    course.course_content.push(newContent._id);
    await course.save();

    await course.populate("course_content");
    await course.populate("enrolled_users");

    res.status(201).json({
      message: "Content added to course successfully",
      course: course,
      content: newContent,
    });
  } catch (error) {
    next(error);
  }
};

const watchedContent = async (req, res, next) => {
  try {
    const contentId = req.params.id;
    const userId = req.user.id;

    const content = await contentModel.findByIdAndUpdate(
      contentId,
      {
        $addToSet: { watchedBy: userId },
      },
      { new: true }
    );

    await content.populate("watchedBy");

    res.status(200).json({
      message: "Content watched by the user",
      user: userId,
      content: content,
    });
  } catch (error) {
    next(error);
  }
};

const deleteContent = async (req, res, next) => {
  try {
    const contentId = req.params.id;
    const content = await contentModel.findByIdAndDelete(contentId);

    const course = await courseModel.findOne({
      course_content: { $in: [contentId] },
    });

    course.course_content.pull(contentId);
    await course.save();

    res.status(200).json({ content: content });
  } catch (error) {
    next(error);
  }
};
export { addContent, watchedContent, deleteContent };
