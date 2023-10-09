const mongoose = require("mongoose");
const fs = require("fs");
const Thai2DNum = require("../models/thai2dNumMorningModel");
const LotterySetting = require("../../lotterySetting/models/LotterySettingModel");

const num2dNumAll = JSON.parse(
  fs.readFileSync(`${__dirname}/../../dev-data/2ddata.json`, "utf-8")
);

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// Create 2D Number
exports.create2DNum = async (req, res) => {
  try {
    for (const singleNum of num2dNumAll) {
      const single2DNum = await Thai2DNum.create(singleNum);
    }
    res.status(201).json({
      status: "Complete Insert Data",
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error,
    });
  }
};

// Read All Thain 2D Number
exports.getAll2DNum = async (req, res) => {
  try {
    const lotterySettingId = "65237b2ce91318305d844032";
    const currentDateObj = new Date();
    const dayIndex = currentDateObj.getDay();
    const currentDay = daysOfWeek[dayIndex];

    // Start Date and End Date
    const ruleObj = await LotterySetting.findById(lotterySettingId);
    console.log(ruleObj, "Rule Obj");

    if (ruleObj.status) {
      const startDate = new Date(ruleObj.startDate);
      const endDate = new Date(ruleObj.endDate);

      if (currentDay === "Sunday" || currentDay === "Saturday") {
        res.status(200).json({
          status: "Success",
          message: "Saturday and Sunday are off day",
        });
      }

      if (currentDateObj > startDate && currentDateObj < endDate) {
        res.status(200).json({
          status: "Success",
          data: {
            all2DNumber: all2DNumber,
          },
        });
      } else {
        res.status(200).json({
          status: "Success",
          message: "Over The Time",
        });
      }
    } else {
      res.status(200).json({
        status: "Success",
        message: "Comming Soon , Admin Closed",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

// Read All Thain 2D Number For User
exports.getAll2DNumUser = async (req, res) => {
  try {
    const endTime = "1234560808";
    const reqTime = new Date().toISOString();
    if (endTime > reqTime) {
      const queryObj = { ...req.query };
      const excludeFields = ["page", "sort", "limit", "fields"];
      excludeFields.forEach((el) => delete queryObj[el]);

      const query = Thai2DNum.find();
      const all2DNumber = await query;

      res.status(200).json({
        status: "Success",
        data: {
          all2DNumber: all2DNumber,
        },
      });
    } else {
      res.status(200).json({
        status: "Comming Soon",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

// Update 2D Number
exports.update2DNum = async (req, res) => {
  try {
    const update2DNum = await Thai2DNum.findByIdAndUpdate(
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
        update2DNum,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};
