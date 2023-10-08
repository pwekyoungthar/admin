const User = require("../models/userModel");

// Read All Users
exports.getUsersAll = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);

    const query = User.find(queryObj);
    const allUsers = await query;

    res.status(200).json({
      status: "Success",
      data: {
        allUsers,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};
