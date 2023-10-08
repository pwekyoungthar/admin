const GameSubCat = require("../models/gameSubCategoryModel");

// Create Game Category
exports.createGameSubCat = async (req, res) => {
  try {
    const newGameSubCat = await GameSubCat.create(req.body);
    console.log("Hello World");
    res.status(201).json({
      status: "success",
      data: {
        newGameSubCat,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

// Read All Game SubCategory
exports.getGameSubCatForAdmin = async (req, res) => {
  const queryObj = { ...req.query };
  const excludeFields = ["page", "sort", "limit", "fields"];
  excludeFields.forEach((el) => delete queryObj[el]);

  const query = GameSubCat.find(queryObj);
  const gameSubCategory = await query;

  res.status(200).json({
    status: "Success",
    data: {
      gameSubCategory,
    },
  });
};

// Read Other User For Game SubCategory
exports.getGameSubCatOther = async (req, res) => {
  const queryObj = { ...req.query };
  const excludeFields = ["page", "sort", "limit", "fields"];
  excludeFields.forEach((el) => delete queryObj[el]);

  const query = await GameSubCat.find({ status: true });

  res.status(200).json({
    status: "Success",
    data: {
      gameSubCat: query,
    },
  });
};

// Update Game SubCategory
exports.updateGameSubCat = async (req, res) => {
  try {
    const updateGameSubCat = await GameSubCat.findByIdAndUpdate(
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
        updateGameSubCat,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};
