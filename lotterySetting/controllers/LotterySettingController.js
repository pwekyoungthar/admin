const LotterySetting = require("../models/LotterySettingModel");
const gamesubcats = require("../../gameCategory/models/gameSubCategoryModel");

// Create Lottery Setting
exports.createLotterySetting = async (req, res) => {
  try {
    const gameSubId = req.body.subCategoryId;
    const gameSubObj = await gamesubcats.findById(gameSubId);
    const gameSubName = gameSubObj.subcat_name;

    const newLotteryRule = {
      ...req.body,
      gameName: gameSubName,
    };
    console.log(newLotteryRule, "Lottery Rule Obj");
    const newLotterySetting = await LotterySetting.create(newLotteryRule);
    res.status(201).json({
      status: "success",
      data: {
        newLotterySetting,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
    console.log(err);
  }
};

// Read Lottery All Game Setting
exports.getThai2DMorningSetting = async (req, res) => {
  const id = "651e6ad82cda3d251beccb38";

  const query = LotterySetting.findById(id);
  const showLotterySetting = await query;

  res.status(200).json({
    status: "Success",
    data: {
      showLotterySetting,
    },
  });
};

// Update Single Lottery Game Setting End Time
exports.updateThai2DMorningSettingTime = async (req, res) => {
  try {
    const startDateString = req.body.startDate;
    const dateRegex = /(\w{3} \w{3} \d{2} \d{4}) (\d{2}:\d{2}:\d{2})/;
    const [, dateStr, timeStr] = startDateString.match(dateRegex);
    const startDateTimeStr = `${dateStr} ${timeStr}`;
    const startDateObj = new Date(startDateTimeStr);
    if (isNaN(startDateObj)) {
      throw new Error("Invalid date");
    }
    const startDate = startDateObj.toDateString();
    const startTime = startDateObj.toLocaleTimeString("en-US");

    const endDateString = req.body.endDate;

    const [, endDateStr, endTimeStr] = endDateString.match(dateRegex);
    const endDateTimeStr = `${endDateStr} ${endTimeStr}`;
    const endDateObj = new Date(endDateTimeStr);
    if (isNaN(endDateObj)) {
      throw new Error("Invalid date");
    }
    const endDate = endDateObj.toDateString();
    const endTime = endDateObj.toLocaleTimeString("en-US");

    const updateDateTimeObj = {
      startDate,
      startTime,
      endDate,
      endTime,
      limitAmount: req.body.limitAmount,
    };

    const id = "651e6ad82cda3d251beccb38";
    const updateThai2DMorningSetting = await LotterySetting.findByIdAndUpdate(
      id,
      updateDateTimeObj,
      {
        new: true,
        runValidator: true,
      }
    );

    res.status(200).json({
      status: "Success",
      data: {
        updateThai2DMorningSetting,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

// // Read Other User For Game Category
// exports.getGameCategoryOther = async (req, res) => {
//   const queryObj = { ...req.query };
//   const excludeFields = ["page", "sort", "limit", "fields"];
//   excludeFields.forEach((el) => delete queryObj[el]);

//   const query = await GameCategory.find({ status: true });

//   res.status(200).json({
//     status: "Success",
//     data: {
//       gameCategory: query,
//     },
//   });
// };
