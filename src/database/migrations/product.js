import sequelize from "../../config/db.js";
import Product from "../models/product.js";

export const createProductTable = async () => {
  await sequelize.authenticate();

  await Product.sync({ alter: true, logging: false }); // This will create the table if it doesn't exist (and do nothing if it already exists)

  console.log("Product table created or already exists.");
};
