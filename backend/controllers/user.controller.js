import { userModel } from "../models/user.model.js";

const getUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await userModel.findById(userId).populate('enrolled_courses').populate('completed_courses').populate('owned_courses');
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await userModel.find({});
    if (users.length == 0) res.status(200).json("There are no users");

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export { getUser, getAllUsers };
