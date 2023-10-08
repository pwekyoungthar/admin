const GameCategory = require("../models/gameCategoryModel");

// Create Game Category
exports.createGameCategoryAllAdmin = async (req, res) => {
  try {
    const newGameCategory = await GameCategory.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        newGameCategory,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

// Read All Game Category
exports.getGameCategoryAllAdmin = async (req, res) => {
  const queryObj = { ...req.query };
  const excludeFields = ["page", "sort", "limit", "fields"];
  excludeFields.forEach((el) => delete queryObj[el]);

  const query = GameCategory.find(queryObj);
  const gameCategory = await query;

  res.status(200).json({
    status: "Success",
    data: {
      gameCategory,
    },
  });
};

// Read Other User For Game Category
exports.getGameCategoryOther = async (req, res) => {
  const queryObj = { ...req.query };
  const excludeFields = ["page", "sort", "limit", "fields"];
  excludeFields.forEach((el) => delete queryObj[el]);

  const query = await GameCategory.find({ status: true });

  res.status(200).json({
    status: "Success",
    data: {
      gameCategory: query,
    },
  });
};

// Update Game Category
exports.updateGameCategoryAllAdmin = async (req, res) => {
  try {
    const updateGameCat = await GameCategory.findByIdAndUpdate(
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
        updateGameCat,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};
