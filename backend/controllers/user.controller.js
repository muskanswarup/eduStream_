import { contentModel } from "../models/content.model.js";
import { courseModel } from "../models/course.model.js";
import { tagModel } from "../models/tag.model.js";
import { userModel } from "../models/user.model.js";

const getUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await userModel
      .findById(userId)
      .populate("enrolled_courses")
      .populate("completed_courses")
      .populate("owned_courses");
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await userModel.find({});
    if (users.length == 0) res.status(200).send();

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const editUser = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const user = await userModel.findByIdAndUpdate(
      userId,
      {
        $set: {
          aboutme: req.body.aboutme,
        },
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await userModel.findById(userId);

    if (user.role === "instructor") {
      let allTags = [];
      for (const courseId of user.owned_courses) {
        const course = await courseModel.findById(courseId);
        allTags = allTags.concat(course.tags);
      }

      const uniqueTags = [...new Set(allTags)];

      for (const tagId of uniqueTags) {
        const otherCourses = await courseModel.find({
          tags: tagId,
          _id: { $nin: user.owned_courses },
        });
        if (otherCourses.length === 0) {
          await tagModel.findByIdAndDelete(tagId);
        }
      }

      for (const courseId of user.owned_courses) {
        const enrolledUsers = await userModel.find({
          enrolled_courses: courseId,
        });
        const completedUsers = await userModel.find({
          completed_courses: courseId,
        });

        for (const enrolledUser of enrolledUsers) {
          await userModel.findByIdAndUpdate(enrolledUser._id, {
            $pull: { enrolled_courses: courseId },
          });
        }
        for (const completedUser of completedUsers) {
          await userModel.findByIdAndUpdate(completedUser._id, {
            $pull: { completed_courses: courseId },
          });
        }

        const course = await courseModel.findById(courseId);
        const contentIds = course.course_content;

        for (const contentId of contentIds) {
          await contentModel.findByIdAndDelete(contentId);
        }

        await courseModel.findByIdAndDelete(courseId);
      }
    } else if (user.role === "enduser") {
      for (const courseId of user.enrolled_courses) {
        await courseModel.updateOne(
          { _id: courseId },
          { $pull: { enrolled_users: userId } }
        );

        const course = await courseModel.findById(courseId);
        for (const contentId of course.course_content) {
          await contentModel.updateOne(
            { _id: contentId },
            { $pull: { watchedBy: user._id } }
          );
        }
      }
    }

    await userModel.findByIdAndDelete(userId);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export { getUser, getAllUsers, deleteUser, editUser };
