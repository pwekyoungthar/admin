const MainUnitHistory = require("../models/mainUnitHistoryModel");
const Admin = require("../../models/adminModel");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");

// Create Main Unit History
exports.createMainUnitHistory = async (token, date, time, amount, status) => {
  try {
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    console.log(decoded.id, "decoded");
    console.log(userId, "id");

    const createMainUnitHistory = {
      amount: amount * 1,
      unit_status: status,
      userId,
      date: date,
      time: time,
    };

    const newMainUnitHistory = MainUnitHistory.create(createMainUnitHistory);
    return newMainUnitHistory;
  } catch (err) {
    return err;
  }
};

// Read Main Unit History Data All
exports.getMainUnitHistory = async (req, res) => {
  const queryObj = { ...req.query };
  const excludeFields = ["page", "sort", "limit", "fields"];
  excludeFields.forEach((el) => delete queryObj[el]);

  const query = MainUnitHistory.find();
  const mainUnitHistoryArr = await query;
  console.log(mainUnitHistoryArr);
  const returnArr = await Promise.all(
    mainUnitHistoryArr.map(async (el) => {
      const adminObj = await Admin.findById(el.userId);
      console.log({ ...el }, adminObj, " for each");
      const newObj = el.toObject();
      newObj.userName = adminObj ? adminObj.name : null; // Check if adminObj exists
      console.log(newObj);
      return newObj;
    })
  );

  res.status(200).json({
    status: "Success",
    data: {
      length: returnArr.length,
      mainUnitHistory: returnArr,
    },
  });
};
