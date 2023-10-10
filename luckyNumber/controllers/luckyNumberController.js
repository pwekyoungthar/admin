const LuckyNumber = require("../models/luckyNumberModel");
const gamesubcats = require("../../gameCategory/models/gameSubCategoryModel");
const LotterySetting = require("../../lotterySetting/models/LotterySettingModel");

// Create Lottery Setting
exports.createThai2DMorningLuckyNumber = async (req, res) => {
  try {
    const gameSubId = "65191e5394d5823f2a6e2031";
    const gameSubObj = await gamesubcats.findById(gameSubId);
    const gameSubName = gameSubObj.subcat_name;

    const newLuckyNumObj = {
      ...req.body,
      gameName: gameSubName,
      subCategoryId: gameSubId,
    };
    const newLuckyNumber = await LuckyNumber.create(newLuckyNumObj);

    const lotterySettingId = "65242bfd81844c97fb089e66";
    const updateStatusLotterySetting = await LotterySetting.findByIdAndUpdate(
      lotterySettingId,
      { status: false }
    );
    res.status(201).json({
      status: "success",
      data: {
        newLuckyNumber,
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

// Read All Lucky Number
exports.getAllLuckyNumber = async (req, res) => {
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
