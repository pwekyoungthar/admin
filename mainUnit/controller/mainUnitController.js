const MainUnit = require("../models/mainUnitModel");
const MainUnitHistory = require("../models/mainUnitHistoryModel");
const jwt = require("jsonwebtoken");
const mainUnitHistoryController = require("../controller/mainUnitHistoryController");

// Create Main Unit
exports.createMainUnit = async (req, res) => {
  try {
    const newMainUnit = await MainUnit.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        newMainUnit,
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

  const query = MainUnit.find();
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
    const unitId = "651eefdead90117815bf57fd";
    const originalObj = await MainUnit.findById(unitId);
    const bodyObj = req.body;
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();

    let newUnit;
    if (bodyObj.unit_status === "in") {
      newUnit = originalObj.amount + bodyObj.amount * 1;
    } else if (bodyObj.unit_status === "out") {
      newUnit = originalObj.amount - bodyObj.amount;
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

    const token = req.headers.authorization.split(" ")[1];

    const newMainUnitHistory =
      await mainUnitHistoryController.createMainUnitHistory(
        token,
        currentDate,
        currentTime,
        bodyObj.amount,
        bodyObj.unit_status
      );
    console.log(newMainUnitHistory, "Line 76");
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
