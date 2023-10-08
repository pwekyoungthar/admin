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
  const id = "6522f0c8160532b945f9972d";

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
    const startDateObj = new Date(startDateString);

    if (isNaN(startDateObj)) {
      throw new Error("Invalid date");
    }

    const startDate = startDateObj.toDateString();
    const startTime = startDateObj.toLocaleTimeString("en-US");

    const endDateString = req.body.endDate;
    const endDateObj = new Date(endDateString);

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

    console.log(updateDateTimeObj);

    const id = "6522f42426e25c80ef5be138";
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
