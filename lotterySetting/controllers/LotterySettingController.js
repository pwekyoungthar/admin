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
  const id = "65241489f48e66dac2432590";

  const query = LotterySetting.findById(id);
  const showLotterySetting = await query;

  res.status(200).json({
    status: "Success",
    data: {
      showLotterySetting,
    },
  });
};

// Update Single Lottery Game Setting Start Time , End Time and limitAmount
exports.updateThai2DMorningSettingTime = async (req, res) => {
  try {
    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);

    if (isNaN(startDate)) {
      throw new Error("Invalid Start date");
    }

    if (isNaN(endDate)) {
      throw new Error("Invalid End date");
    }

    const updateDateTimeObj = {
      startDate,
      endDate,
      limitAmount: req.body.limitAmount,
    };

    const id = "65241489f48e66dac2432590";
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
