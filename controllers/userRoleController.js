const UserRole = require("../models/userRoleModel");

// Read All Users Role
exports.getUsersRoleAll = async (req, res) => {
  const queryObj = { ...req.query };
  const excludeFields = ["page", "sort", "limit", "fields"];
  excludeFields.forEach((el) => delete queryObj[el]);

  const query = UserRole.find(queryObj);
  const allUserRole = await query;

  res.status(200).json({
    status: "Success",
    data: {
      userRoles: allUserRole,
    },
  });
};

// Create User Roles
exports.createUserRole = async (req, res) => {
  try {
    const newUserRole = await UserRole.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        newUserRole,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

exports.userRoleUpdate = async (req, res) => {
  try {
    const updateUserRole = await UserRole.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidator: true,
      }
    );
    res.status(200).json({
      status: "Success",
      data: {
        updateUserRole,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};
