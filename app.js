const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

const userRoleRouter = require("./routes/userRoleRoute");
const mainUnitRouter = require("./mainUnit/route/mainUnitRoute");
const adminRouter = require("./routes/adminRoute");
const userRouter = require("./routes/userRoute");
const userProfile = require("./profile/routes/userProfileRoute");

const gamesCategoryAdmin = require("./gameCategory/routes/gameCategoryRoute");
const gameSubCategoryAdmin = require("./gameCategory/routes/gameSubCategoryRoute");

const adminUnitTransfer = require("./mainUnit/route/unitTransferRoute");
const mainUnitHistory = require("./mainUnit/route/mainUnitHistoryRoute");

const thai2dMorning12 = require("./2D/routes/thai2dmorning12Route");
const lotterySetting = require("./lotterySetting/routes/lotterySettingRoute");

// Middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(`${__dirname}/public`));
app.use(cors());
app.use((req, res, next) => {
  console.log("Hello This is Testing Middleware");
  next();
});

app.use("/api/v1/userRole", userRoleRouter);
app.use("/api/v1/mainUnit", mainUnitRouter);
app.use("/api/v1/adminAcc", adminRouter);

// Users Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/userprofile", userProfile);

// Games Category
app.use("/api/v1/gamesCategoryAdmin", gamesCategoryAdmin);
app.use("/api/v1/gamesCategoryOther", gamesCategoryAdmin);

// Games Sub Category
app.use("/api/v1/gamesSubCat", gameSubCategoryAdmin);
app.use("/api/v1/gamesSubCatOther", gameSubCategoryAdmin);

// Thai 2D Moringin 12AM
app.use("/api/v1/thai2dmorning12am", thai2dMorning12);

// Unit
app.use("/api/v1/adminUnitTransfer", adminUnitTransfer);
app.use("/api/v1/mainUnitHistory", mainUnitHistory);

// Lottery Setting
app.use("/api/v1/lotterysetting", lotterySetting);

module.exports = app;
