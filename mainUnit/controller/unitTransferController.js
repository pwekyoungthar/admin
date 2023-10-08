const MainUnit = require("../models/mainUnitModel");
const User = require("../../models/userModel");

// Create Main Unit
exports.mainUnitTransfer = async (req, res) => {
  try {
    const bodyObj = req.body;
    const mainUnitId = "651d8b3f47f942df9635b963";
    const mainUnitObj = await MainUnit.findById(mainUnitId);
    const initialMainUnit = mainUnitObj.amount;
    const userObj = await User.findById(bodyObj.userId);
    const userUnit = userObj.unit;

    console.log(initialMainUnit, userUnit, bodyObj);

    let adminUpdateUnit, userUpdateUnit, updateAdmin, updateUser;

    if (bodyObj.status === "in") {
      if (bodyObj.amount > userUnit) {
        alert("You can not recieve amount");
        return;
      }
      adminUpdateUnit = bodyObj.amount + initialMainUnit;
      userUpdateUnit = userUnit - bodyObj.amount;
      updateAdmin = await MainUnit.findByIdAndUpdate(mainUnitId, {
        amount: adminUpdateUnit,
      });
      updateUser = await User.findByIdAndUpdate(bodyObj.userId, {
        unit: userUpdateUnit,
      });
    }

    if (bodyObj.status === "out") {
      adminUpdateUnit = initialMainUnit - bodyObj.amount;
      userUpdateUnit = userUnit + bodyObj.amount;
      console.log(adminUpdateUnit, userUpdateUnit);
      updateAdmin = await MainUnit.findByIdAndUpdate(mainUnitId, {
        amount: adminUpdateUnit,
      });
      updateUser = await User.findByIdAndUpdate(bodyObj.userId, {
        unit: userUpdateUnit,
      });
    }
    res.status(201).json({
      status: "success",
      data: {
        updateAdmin,
        updateUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

// Read Main Unit Data
exports.getMainUnitValue = async (req, res) => {
  const queryObj = { ...req.query };
  const excludeFields = ["page", "sort", "limit", "fields"];
  excludeFields.forEach((el) => delete queryObj[el]);

  const query = MainUnit.find(queryObj);
  const mainUnit = await query;

  res.status(200).json({
    status: "Success",
    data: {
      mainUnit,
    },
  });
};

exports.mainUnitUpdate = async (req, res) => {
  try {
    const unitId = "651d8b3f47f942df9635b963";
    const mainUnitObj = await MainUnit.findById(unitId);
    console.log(intialMainValue);
    const bodyObj = req.body;
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();

    let newUnit;
    if (bodyObj.unit_status === "in") {
      newUnit = mainUnitObj.amount + bodyObj.amount * 1;
    } else {
      return;
    }

    const updateMainUnit = await MainUnit.findByIdAndUpdate(
      unitId,
      { amount: newUnit },
      {
        new: true,
        runValidator: true,
      }
    );

    // else if (bodyObj.unit_status === "out") {
    //     newUnit = originalObj.amount - bodyObj.amount;
    //   }

    res.status(200).json({
      status: "Success",
      data: {
        updateMainUnit,
        newMainUnitHistory,
      },
    });
  } catch (err) {
    // Error handling
    console.error("Error creating MainUnitHistory:", err);
    // Respond with an error message
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
