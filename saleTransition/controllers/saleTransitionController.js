const Sale = require("../models/saleTransitionModel");

const saleData = {
  userName: "Mg Mg",
  userId: 1234,
  subCategoryID: 123456789,
  subCategoryName: "2d morning",
  date: new Date(),
  sale: [
    {
      productName: "00",
      productID: "000000",
      price: 50000,
    },
    // Add more sale items here
  ],
};

Sale.create(saleData, (err, result) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Sale document created:", result);
  }
});
