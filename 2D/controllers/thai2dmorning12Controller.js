const fs = require("fs");
const Thai2DNum = require("../models/thai2dNumMorningModel");

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
    const currentDateObj = new Date();
    const currentDate = currentDateObj.toDateString();
    const dayIndex = currentDateObj.getDay();
    const currentDay = daysOfWeek[dayIndex];
    const currentTime = currentDateObj.toLocaleTimeString();

    const dateString = "Sun Oct 08 2023 00:00:00 GMT+0630 (Myanmar Time)";

    // Create a Date object from the date string
    const dateObj = new Date(dateString);
    const endDate = dateObj.toDateString();
    const endTime = dateObj.toLocaleTimeString("en-US");

    console.log(endDate);
    console.log(endDate);

    // if (currentDay === "Sunday" || currentDay === "Saturday") {
    //   res.status(200).json({
    //     status: "Success",
    //     message: "Saturday and Sunday are off day",
    //   });
    // }

    if (endDate === currentDate) {
      if (endTime > currentTime) {
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
          status: "Success",
          message: "Over The Time",
        });
      }
    }

    // if(date >  )

    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);
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
