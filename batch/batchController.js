const batch = require("./batchModel");
const gamesubcats = require("../../gameCategory/models/gameSubCategoryModel");

// Create Batch
exports.createBatch = async (req, res) => {
  try {
    const gameSubId = req.body.id;
    const gameSubObj = await gamesubcats.findById(gameSubId);
    const gameSubName = gameSubObj.subcat_name;
    const date = Date.now();
    const batchObj = await batch.find();
    const batchNum = batchObj.length;

    const newBatchObj = {
      batchNumber: batchNum,
      gameName: gameSubName,
      subCategoryId: gameSubId,
      date: date,
    };
    const newBatch = await batch.create(newBatchObj);
    res.status(201).json({
      status: "success",
      data: {
        newBatch,
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
// exports.getAllLuckyNumber = async (req, res) => {
//   const id = "65242bfd81844c97fb089e66";

//   const query = LotterySetting.findById(id);
//   const showLotterySetting = await query;

//   res.status(200).json({
//     status: "Success",
//     data: {
//       showLotterySetting,
//     },
//   });
// };
