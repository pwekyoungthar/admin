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
  const id = "65242bfd81844c97fb089e66";

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
    const updateDateTimeObj = {
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      limitAmount: req.body.limitAmount,
    };

    const id = "65242bfd81844c97fb089e66";
    const updateThai2DMorningSetting = await LotterySetting.findByIdAndUpdate(
      id,
      updateDateTimeObj,
      {
        new: true,
        runValidators: true,
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
